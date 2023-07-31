import { DecodedTags, GroupId, ModelId, TagId, TagMap } from "@/types"
import * as React from "react"
import { Updater, useImmer } from "use-immer"
import {
  getEmptyTagMap,
  getDefaultGenerateTagMap,
  getRequiredTagMap,
} from "./tags"
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string"
import { useRouter } from "next/router"
import { toast } from "react-hot-toast"

const TagContext = React.createContext<TagContextType>(undefined)

type TagContextType = {
  generateTags: TagMap
  updateGenerateTags: Updater<TagMap>
  searchTags: TagMap
  updateSearchTags: Updater<TagMap>
  getEncodedTags: (tagMap: TagMap) => string
  getDecodedTags: (encodedTags: string) => DecodedTags
  selectedModel: ModelId
  setSelectedModel: React.Dispatch<React.SetStateAction<ModelId>>
}

function TagProvider({ children }) {
  const [generateTags, updateGenerateTags] = useImmer<TagMap>(
    getDefaultGenerateTagMap()
  )
  const [searchTags, updateSearchTags] = useImmer<TagMap>(getEmptyTagMap())
  const [selectedModel, setSelectedModel] = React.useState<ModelId>(
    ModelId.BASE
  )
  const router = useRouter()

  const loadTags = () => {
    const encodedTags = router.query["tags"]
    if (typeof encodedTags == "string") {
      try {
        const decodedTags = getDecodedTags(encodedTags)

        const defaultTagMap = getRequiredTagMap()
        Object.keys(decodedTags.groups).map((groupId: GroupId) => {
          const newTags = decodedTags.groups[groupId]
          if (newTags.length > 0) {
            // unselect all tags in group
            Object.keys(defaultTagMap[ModelId.BASE].groups[groupId].tags).map(
              (tagKey: TagId) => {
                defaultTagMap[ModelId.BASE].groups[groupId].tags[
                  tagKey
                ].selected = false
              }
            )
            // select new tags
            newTags.map((newTag: TagId) => {
              defaultTagMap[ModelId.BASE].groups[groupId].tags[
                newTag
              ].selected = true
            })
          }
        })

        if (router.pathname == "/generate") {
          updateGenerateTags(defaultTagMap)
        }
        if (router.pathname == "/search") {
          updateSearchTags(defaultTagMap)
        }

        toast.success("Tags loaded from URL")
      } catch (error) {
        toast.error("Could not load tags")
      }
    }
  }

  const getEncodedTags = (tagMap: TagMap): string => {
    // setup return value
    const decodedTags: DecodedTags = { model: selectedModel, groups: {} }
    const groups = tagMap[selectedModel].groups
    const groupIds = Object.keys(groups)
    // iterate through groups and create an array for each
    groupIds.map((groupId: GroupId) => {
      const group = groups[groupId]
      const tagIds = Object.keys(group.tags)
      const tags = group.tags

      const selectedTagIds = []
      // iterate through tags and add selected ones to group array
      tagIds.map((tagId: TagId) => {
        const tag = tags[tagId]
        if (tag.selected) {
          selectedTagIds.push(tagId)
        }
      })
      decodedTags.groups[groupId] = selectedTagIds
    })
    const encodedTags = compressToEncodedURIComponent(
      JSON.stringify(decodedTags)
    )

    return encodedTags
  }

  const getDecodedTags = (encodedTags: string): DecodedTags => {
    return JSON.parse(decompressFromEncodedURIComponent(encodedTags))
  }

  React.useEffect(() => {
    loadTags()
  }, [router.query["tags"]])

  const value = {
    generateTags,
    updateGenerateTags,
    searchTags,
    updateSearchTags,
    getEncodedTags,
    getDecodedTags,
    selectedModel,
    setSelectedModel,
  }

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>
}

function useTags() {
  const context = React.useContext(TagContext)
  if (context === undefined) {
    throw new Error("useTag must be used within a TagProvider")
  }
  return context
}

export { TagProvider, useTags }
