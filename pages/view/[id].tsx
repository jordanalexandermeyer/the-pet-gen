import Layout from "@/components/Layout"
import Modal from "@/components/Modal"
import { Image, ImageWithId, TagId, TagMap } from "@/types"
import { convertImageToTagMap } from "@/utils/imageToTagMap"
import { getEmptyTagMap, tags as allTags } from "@/utils/tags"
import { useTags } from "@/utils/useTags"
import classNames from "classnames"
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

export default function ViewPage() {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState<ImageWithId>()
  const [tags, setTags] = useState<TagMap>(getEmptyTagMap())
  const [showReportModal, setShowReportModal] = useState(false)
  const { getEncodedTags } = useTags()
  const db = getFirestore()

  // load image from db
  useEffect(() => {
    const getImageFromDb = async () => {
      setIsLoading(true)
      const docRef = doc(db, "images", id || "")
      const docSnapshot = await getDoc(docRef)
      const data = docSnapshot.data() as Image
      if (data && data.uri) {
        setImage({ id: docRef.id, ...data })
        setTags(convertImageToTagMap({ id: docRef.id, ...data }))
      }
      setIsLoading(false)
    }
    if (id) {
      getImageFromDb()
    }
  }, [id])

  const handleSubmitReport = () => {
    const submitReport = async () => {
      await addDoc(collection(db, "reports"), {
        image: image,
      })
      setShowReportModal(false)
    }

    toast.promise(submitReport(), {
      loading: "Submitting report",
      success: "Report submitted! Thank you for keeping ThePetGen.com safe!",
      error: "Something went wrong. Please try again!",
    })
  }

  return (
    <Layout>
      <div className="flex flex-col items-center w-full">
        <div className="max-w-3xl w-full px-4 pt-4 flex flex-col items-center">
          <div
            className={classNames(
              "flex justify-center items-center rounded-lg aspect-square w-full bg-gray-500",
              {
                "animate-pulse": isLoading,
              }
            )}
          >
            <img className="rounded-lg w-full" src={image ? image.uri : ""} />
          </div>
          <div className="flex flex-col items-center gap-4 mt-4 w-full">
            <div className="flex w-full justify-center gap-4">
              <button
                onClick={() => {
                  const encodedTags = getEncodedTags(tags)
                  router.push(
                    `${window.location.origin}/generate?tags=${encodedTags}`
                  )
                }}
                disabled={isLoading}
                className="bg-blue-700 px-4 py-2 h-12 flex items-center justify-center rounded-md text-lg"
              >
                Use tags
              </button>
              <button
                onClick={() => {
                  setShowReportModal(true)
                }}
                disabled={isLoading}
                className="bg-gray-600 px-4 py-2 h-12 flex items-center justify-center rounded-md text-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 96 960 960"
                  className="h-7 text-white"
                >
                  <path
                    fill="currentColor"
                    d="M200 936V256h343l19 86h238v370H544l-19-85H260v309h-60Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 my-8 w-full">
            <h2 className="text-xl">Tags</h2>
            <div className="flex flex-wrap gap-4">
              {image &&
                Object.keys(image.tags).map((tagId: TagId, index) => {
                  const tag = allTags[tagId]
                  const tagName = tag.name
                  return (
                    <div
                      key={index}
                      className="py-2 px-4 rounded-md whitespace-nowrap bg-green-500 select-none"
                    >
                      {tagName}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
      {showReportModal && (
        <Modal setShowModal={setShowReportModal}>
          <div className="max-w-xl flex flex-col gap-4 px-6 pb-6">
            <div className="space-y-3 text-left">
              <h3 className="text-2xl text-center font-bold leading-6 pb-2">
                Report content
              </h3>
              <p className="font-semibold">
                Help keep ThePetGen.com safe by reporting unsafe images!
              </p>
              <p>
                Although we don't anticipate pet images to be dangerous, you
                never know with generative AI. Please report any unsafe content.
                We take all reports seriously and will review the content and
                take action if necessary.
              </p>
              <p>Thank you for keeping ThePetGen.com safe!</p>
            </div>
            <div className="w-full aspect-square">
              <img className="rounded-lg w-full" src={image ? image.uri : ""} />
            </div>
            <button
              className="inline-flex items-center overflow-hidden ease-in-out outline-none focus:outline-none focus:ring-2 justify-center transition-all duration-150 relative font-medium rounded-lg text-white bg-red-700 shadow-sm active:bg-red-800 px-6 py-4 text-base w-full"
              type="button"
              onClick={() => handleSubmitReport()}
            >
              Report
            </button>
          </div>
        </Modal>
      )}
    </Layout>
  )
}
