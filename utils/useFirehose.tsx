import { ImageWithId } from "@/types"
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore"
import * as React from "react"

const FirehoseContext = React.createContext(undefined)

function FirehoseProvider({ children }) {
  const [isFirehoseOn, setIsFirehoseOn] = React.useState(true)
  const [images, setImages] = React.useState<ImageWithId[]>([])
  const [latestDoc, setLatestDoc] =
    React.useState<QueryDocumentSnapshot<DocumentData>>()
  const [noMoreImages, setNoMoreImages] = React.useState(false)

  const value = {
    isFirehoseOn,
    setIsFirehoseOn,
    images,
    setImages,
    latestDoc,
    setLatestDoc,
    noMoreImages,
    setNoMoreImages,
  }
  return (
    <FirehoseContext.Provider value={value}>
      {children}
    </FirehoseContext.Provider>
  )
}

function useFirehose() {
  const context = React.useContext(FirehoseContext)
  if (context === undefined) {
    throw new Error("useFirehose must be used within a FirehoseProvider")
  }
  return context
}

export { FirehoseProvider, useFirehose }
