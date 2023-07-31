import Layout from "@/components/Layout"
import classNames from "classnames"
import { useGenerate } from "@/utils/useGenerate"
import { useTags } from "@/utils/useTags"
import { GroupId, ModelId, Select, TagId } from "@/types"
import { getRequiredTagMap } from "@/utils/tags"
import { toast } from "react-hot-toast"
import Link from "next/link"

export default function GeneratePage() {
  const { isLoading, image, handleGenerateClick } = useGenerate()
  const { generateTags, updateGenerateTags, getEncodedTags } = useTags()

  return (
    <Layout title="Pet Image Generator">
      <div className="flex flex-col items-center w-full">
        <div className="max-w-4xl w-full px-4 pt-4 flex flex-col items-center">
          <div
            className={classNames(
              "flex justify-center items-center rounded-lg aspect-square w-full max-w-[512px] max-h-[512px] bg-gray-500",
              {
                "animate-pulse": isLoading,
              }
            )}
          >
            {image ? (
              <Link
                className="overflow-hidden rounded-lg flex flex-col"
                href={`/view/${image.id}`}
              >
                <img src={image.uri} />
              </Link>
            ) : isLoading ? (
              <div className="text-center px-4">
                This could take up to 5 minutes. Feel free to check out other
                pages while you wait, but don't refresh the tab!
              </div>
            ) : (
              <div className="text-center px-4">
                Choose some tags and click "Generate"
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-4 mt-4 w-full max-w-lg">
            <button
              onClick={() => handleGenerateClick()}
              disabled={isLoading}
              className="bg-blue-700 disabled:bg-blue-900 px-4 py-2 h-12 flex items-center justify-center rounded-md text-lg w-full max-w-lg"
            >
              {isLoading ? (
                <svg
                  aria-hidden="true"
                  className="inline w-6 h-6 text-gray-200 animate-spin fill-gray-600"
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
              ) : (
                "Generate"
              )}
            </button>
            <div className="flex w-full justify-center gap-4">
              <button
                onClick={() => {
                  updateGenerateTags(getRequiredTagMap())
                  toast.success("Tags cleared!")
                }}
                className="border px-4 py-2 h-12 flex items-center justify-center rounded-md text-lg w-1/2"
              >
                Clear tags
              </button>
              <button
                onClick={() => {
                  const encodedTags = getEncodedTags(generateTags)
                  navigator.clipboard.writeText(
                    `${window.location.origin}/generate?tags=${encodedTags}`
                  )
                  toast.success("Copied link to tags!")
                }}
                className="bg-green-500 px-4 py-2 h-12 flex items-center justify-center rounded-md text-lg w-1/2"
              >
                Copy tags
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 my-8 w-full">
            {Object.keys(generateTags[ModelId.BASE].groups).map(
              (groupId: GroupId, index) => {
                const group = generateTags[ModelId.BASE].groups[groupId]
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
                              updateGenerateTags((tags) => {
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
                                if (
                                  group.select == Select.SINGLE &&
                                  group.required == true &&
                                  oldValue == true
                                ) {
                                  tags[ModelId.BASE].groups[groupId].tags[
                                    tagId
                                  ].selected = oldValue
                                } else {
                                  tags[ModelId.BASE].groups[groupId].tags[
                                    tagId
                                  ].selected = newValue
                                }
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
    </Layout>
  )
}

const Group = () => {}
