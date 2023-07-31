import { GroupId, ImageWithId, ModelId, TagId } from '@/types'
import { getEmptyTagMap } from './tags'

export const convertImageToTagMap = (image: ImageWithId) => {
  const imageTags = image.tags
  const imageModel = image.model || ModelId.BASE

  // iterate through empty tag map
  // if key in tags, set selected to true
  const newTagMap = getEmptyTagMap()
  const groups = newTagMap[imageModel].groups
  Object.keys(groups).map((groupId: GroupId) => {
    const tags = groups[groupId].tags
    Object.keys(tags).map((tagId: TagId) => {
      if (imageTags[tagId]) {
        newTagMap[imageModel].groups[groupId].tags[tagId].selected = true
      }
    })
  })

  return newTagMap
}
