import Layout from "@/components/Layout"
import { useEffect, useState } from "react"
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  limit,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from "firebase/firestore"
import { GroupId, ImageStatus, ModelId, Select, Tag, TagId } from "@/types"
import { Image, ImageWithId } from "@/types"
import { useInView } from "react-intersection-observer"
import { useTags } from "@/utils/useTags"
import classNames from "classnames"
import { getEmptyTagMap } from "@/utils/tags"
import { toast } from "react-hot-toast"
import { useRouter } from "next/router"
import Link from "next/link"

export default function SearchPage() {
  const [images, setImages] = useState<ImageWithId[]>([])
  const [latestDoc, setLatestDoc] =
    useState<QueryDocumentSnapshot<DocumentData>>()
  const [loadingImages, setLoadingImages] = useState(false)
  const [noMoreImages, setNoMoreImages] = useState(false)
  const { searchTags, updateSearchTags, getEncodedTags, getDecodedTags } =
    useTags()
  const { ref: myRef, inView: myElementIsVisible } = useInView()
  const db = getFirestore()
  const router = useRouter()

  useEffect(() => {
    setNoMoreImages(false)
  }, [searchTags])

  useEffect(() => {
    const loadInitialImages = async () => {
      setImages([])
      setLoadingImages(true)

      const whereClauses = []
      // get active tags and create where clauses
      const encodedTags = getEncodedTags(searchTags)
      const decodedTags = getDecodedTags(encodedTags)
      // iterate through tag groups
      Object.keys(decodedTags.groups).map((groupId: GroupId) => {
        const newTags = decodedTags.groups[groupId]
        // add tags
        newTags.map((newTag: TagId) => {
          whereClauses.push(where("tags." + newTag, "==", true))
        })
      })

      const q = query(
        collection(db, "images"),
        where("status", "==", ImageStatus.SUCCEEDED),
        ...whereClauses,
        limit(20)
      )

      const snapshot = await getDocs(q)
      snapshot.forEach((doc) => {
        const data = doc.data() as Image
        const newImage: ImageWithId = { id: doc.id, ...data }
        if (data.uri) {
          setImages((images) => {
            return [...images, newImage]
          })
        }
      })
      if (snapshot.docs.length < 20) {
        setNoMoreImages(true)
      }
      const lastDoc = snapshot.docs[snapshot.docs.length - 1]
      setLatestDoc(lastDoc)
      setLoadingImages(false)
    }

    loadInitialImages()
  }, [searchTags])

  useEffect(() => {
    const loadNextBatch = async () => {
      if (latestDoc) {
        setLoadingImages(true)

        const whereClauses = []
        // get active tags and create where clauses
        const encodedTags = getEncodedTags(searchTags)
        const decodedTags = getDecodedTags(encodedTags)
        // iterate through tag groups
        Object.keys(decodedTags.groups).map((groupId: GroupId) => {
          const newTags = decodedTags.groups[groupId]
          // add tags
          newTags.map((newTag: TagId) => {
            whereClauses.push(where("tags." + newTag, "==", true))
          })
        })

        const q = query(
          collection(db, "images"),
          startAfter(latestDoc),
          ...whereClauses,
          limit(20)
        )

        const snapshot = await getDocs(q)
        snapshot.forEach((doc) => {
          const data = doc.data() as Image
          const newImage: ImageWithId = { id: doc.id, ...data }
          if (data.uri) {
            setImages((images) => {
              return [...images, newImage]
            })
          }
        })
        if (snapshot.docs.length < 20) {
          setNoMoreImages(true)
        }
        if (snapshot.docs.length > 0) {
          const lastDoc = snapshot.docs[snapshot.docs.length - 1]
          setLatestDoc(lastDoc)
        } else {
          setNoMoreImages(true)
        }
        setLoadingImages(false)
      }
    }

    if (!noMoreImages && !loadingImages && myElementIsVisible) {
      loadNextBatch()
    }
  }, [myElementIsVisible, searchTags, loadingImages, noMoreImages])

  return (
    <Layout
      title="Search Pet Images"
      description="Search our massive library of generated pets."
    >
      <div className="relative flex flex-col w-full min-h-[calc(100vh-112px)] sm:min-h-[calc(100vh-56px)]">
        <div className="overflow-y-scroll w-full h-1/2 top-0 absolute xl:h-full xl:w-1/2 xl:inset-y-0 xl:left-0 border-b xl:border-r xl:border-b-0 border-gray-200/50">
          <div className="w-full flex flex-col items-center">
            <div className="max-w-4xl w-full px-4 py-4 flex flex-col items-center">
              <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <div className="flex w-full justify-center gap-4">
                  <button
                    onClick={() => {
                      updateSearchTags(getEmptyTagMap())
                      toast.success("Filters cleared!")
                    }}
                    className="border px-4 py-2 h-12 flex items-center justify-center rounded-md text-lg w-1/2"
                  >
                    Clear filters
                  </button>
                  <button
                    onClick={() => {
                      const encodedTags = getEncodedTags(searchTags)
                      router.push("/generate?tags=" + encodedTags)
                    }}
                    className="bg-blue-700 px-4 py-2 h-12 flex items-center justify-center rounded-md text-lg w-1/2"
                  >
                    Use tags
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-4 my-8 w-full">
                {Object.keys(searchTags[ModelId.BASE].groups).map(
                  (groupId: GroupId, index) => {
                    const group = searchTags[ModelId.BASE].groups[groupId]
                    const groupName = group.name
                    const groupTags = group.tags
                    return (
                      <div key={index} className="flex flex-col gap-2">
                        <h2 className="text-xl font-semibold">{groupName}</h2>
                        <div className="flex flex-wrap gap-2">
                          {Object.keys(groupTags).map((tagId: TagId, index) => {
                            const tag = groupTags[tagId]
                            const tagName = tag.name
                            const tagSelected = tag.selected
                            return (
                              <button
                                key={index}
                                onClick={() => {
                                  updateSearchTags((tags) => {
                                    // Save new value
                                    const oldValue = tagSelected
                                    const newValue = !tagSelected
                                    // If single select, unselect all
                                    if (group.select == Select.SINGLE) {
                                      Object.keys(
                                        tags[ModelId.BASE].groups[groupId].tags
                                      ).map((tagKey: TagId) => {
                                        tags[ModelId.BASE].groups[groupId].tags[
                                          tagKey
                                        ].selected = false
                                      })
                                    }
                                    // Update tag to new value
                                    tags[ModelId.BASE].groups[groupId].tags[
                                      tagId
                                    ].selected = newValue
                                  })
                                }}
                                className={classNames(
                                  "py-2 px-4 border rounded-md whitespace-nowrap",
                                  {
                                    "bg-green-500": tagSelected,
                                  }
                                )}
                              >
                                {tagName}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  }
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-y-scroll w-full h-1/2 bottom-0 absolute xl:h-full xl:w-1/2 xl:inset-y-0 xl:right-0">
          <div className="grid px-1 py-1 gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3">
            {images.map((image, index) => {
              return (
                <div key={index} className="w-full">
                  <Link
                    className="overflow-hidden rounded-lg flex flex-col"
                    href={`/view/${image.id}`}
                  >
                    <img src={image.uri} />
                  </Link>
                </div>
              )
            })}
          </div>
          <div ref={myRef} className="h-1"></div>
          <div className="px-4 w-full">
            {loadingImages && (
              <div role="status" className="w-full flex justify-center py-4">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
            {noMoreImages && (
              <div className="flex flex-col gap-2 my-8 h-full w-full items-center justify-center">
                <div className="text-center">
                  There are no more images with this tag combination.
                </div>
                <button
                  onClick={() => {
                    const encodedTags = getEncodedTags(searchTags)
                    router.push("/generate?tags=" + encodedTags)
                  }}
                  className="bg-green-500 px-4 py-2 h-12 flex items-center justify-center rounded-md text-lg w-1/2"
                >
                  Make one!
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
