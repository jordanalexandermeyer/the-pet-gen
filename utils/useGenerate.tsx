import { Image, ImageWithId } from '@/types'
import { doc, getFirestore, onSnapshot } from 'firebase/firestore'
import * as React from 'react'
import { useTags } from './useTags'

const GenerateContext = React.createContext<GenerateContextType>(undefined)

type GenerateContextType = {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  image: ImageWithId
  setImage: React.Dispatch<React.SetStateAction<ImageWithId>>
  handleGenerateClick: () => Promise<void>
}

function GenerateProvider({ children }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [image, setImage] = React.useState<ImageWithId>()
  const { generateTags, getEncodedTags, selectedModel } = useTags()
  const db = getFirestore()

  const generateImage = async () => {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        ContentType: 'application/json',
      },
      body: JSON.stringify({
        tags: getEncodedTags(generateTags),
      }),
    })

    const data = await response.json()
    const imageId = data.id
    return imageId
  }

  const handleGenerateClick = async () => {
    setIsLoading(true)
    const imageId = await generateImage()
    const unsub = onSnapshot(doc(db, 'images', imageId), (doc) => {
      const data = doc.data() as Image
      if (data) {
        const uri = data.uri
        if (uri) {
          setImage({ id: doc.id, ...data })
          setIsLoading(false)
          unsub()
        }
      }
    })
  }

  const value = {
    isLoading,
    setIsLoading,
    image,
    setImage,
    handleGenerateClick,
  }
  return (
    <GenerateContext.Provider value={value}>
      {children}
    </GenerateContext.Provider>
  )
}

function useGenerate() {
  const context = React.useContext(GenerateContext)
  if (context === undefined) {
    throw new Error('useGenerate must be used within a GenerateProvider')
  }
  return context
}

export { GenerateProvider, useGenerate }
