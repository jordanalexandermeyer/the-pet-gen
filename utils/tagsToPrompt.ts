import { DecodedTags, GroupId, TagId } from "@/types"
import { getEmptyTagMap } from "./tags"

const orderOfGroups = [
  GroupId.SUBJECTS,
  GroupId.ANIMAL,
  GroupId.AGE,
  GroupId.FACIAL_EXPRESSION,
  GroupId.CLOTHING,
  GroupId.STYLE,
  GroupId.SETTING,
]

export const convertTagsToInputs = (decodedTags: DecodedTags) => {
  let basePrompt = ""
  let baseNegativePrompt = ""
  const selectedTags = {}
  const model = decodedTags.model
  const tagMap = getEmptyTagMap()
  orderOfGroups.map((groupId: GroupId) => {
    const tags = decodedTags.groups[groupId]
    tags.map((tagId: TagId) => {
      const promptAddition = tagMap[model].groups[groupId].tags[tagId].prompt
      const negativePromptAddition =
        tagMap[model].groups[groupId].tags[tagId].negativePrompt

      if (promptAddition) {
        if (basePrompt) {
          basePrompt += `, ${promptAddition}`
        } else {
          basePrompt += promptAddition
        }
      }
      if (negativePromptAddition) {
        baseNegativePrompt += `, ${negativePromptAddition}`
      }
      selectedTags[tagId] = true
    })
  })
  return {
    prompt: basePrompt,
    negativePrompt: baseNegativePrompt,
    tags: selectedTags,
    model,
  }
}
