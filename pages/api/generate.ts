// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DecodedTags, ImageStatus } from "@/types"
import initializeFirebaseApp from "@/utils/initializeFirebase"
import { convertTagsToInputs } from "@/utils/tagsToPrompt"
import { addDoc, collection, getFirestore } from "firebase/firestore"
import { decompressFromEncodedURIComponent } from "lz-string"
import type { NextApiRequest, NextApiResponse } from "next"
import fetch from "node-fetch"

type Data = {
  id: string
}

initializeFirebaseApp()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // parse request
  const body = JSON.parse(req.body)
  const encodedTags: string = body.tags
  const decodedTags: DecodedTags = JSON.parse(
    decompressFromEncodedURIComponent(encodedTags)
  )

  const { prompt, negativePrompt, tags, model } =
    convertTagsToInputs(decodedTags)

  // add document to collections
  const db = getFirestore()
  const docRef = await addDoc(collection(db, "images"), {
    tags,
    model,
    prompt,
    negativePrompt,
    status: ImageStatus.PENDING,
    createdAt: Date.now(),
  })
  const documentId = docRef.id
  // compile prompt
  // send prompt and document ID to replicate
  await fetch(process.env.REPLICATE_PREDICTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${process.env.REPLICATE_TOKEN}`,
    },
    body: JSON.stringify({
      version: process.env.REPLICATE_BASE_MODEL_VERSION,
      input: {
        prompt,
        negative_prompt: negativePrompt,
        guidance_scale: 9.5,
        num_inference_steps: 35,
        prompt_strength: 0.8,
        scheduler: "K_EULER_ANCESTRAL",
      },
      webhook: `${process.env.PROCESS_REPLICATE_WEBHOOK_LAMBDA_URL}?id=${documentId}`,
    }),
  })
  // return document ID to UI
  res.status(200).json({ id: documentId })
}
