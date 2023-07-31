import { GroupId, ModelId, Select, Tag, TagId, TagMap } from "@/types"

export const tags: { [key in TagId]: Tag } = {
  // Animal
  [TagId.ANIMAL_DOG]: {
    name: "dog",
    prompt: "dog",
    negativePrompt: "",
    selected: false,
  },
  [TagId.ANIMAL_CAT]: {
    name: "cat",
    prompt: "cat",
    negativePrompt: "",
    selected: false,
  },
  [TagId.ANIMAL_BIRD]: {
    name: "bird",
    prompt: "bird",
    negativePrompt: "",
    selected: false,
  },
  [TagId.ANIMAL_FISH]: {
    name: "fish",
    prompt: "fish",
    negativePrompt: "",
    selected: false,
  },
  [TagId.ANIMAL_HAMSTER]: {
    name: "hamster",
    prompt: "hamster",
    negativePrompt: "",
    selected: false,
  },
  [TagId.ANIMAL_RABBIT]: {
    name: "rabbit",
    prompt: "rabbit",
    negativePrompt: "",
    selected: false,
  },
  [TagId.ANIMAL_GUINEA_PIG]: {
    name: "guinea pig",
    prompt: "guinea pig",
    negativePrompt: "",
    selected: false,
  },
  [TagId.ANIMAL_SNAKE]: {
    name: "snake",
    prompt: "snake",
    negativePrompt: "",
    selected: false,
  },
  [TagId.ANIMAL_TURTLE]: {
    name: "turtle",
    prompt: "turtle",
    negativePrompt: "",
    selected: false,
  },
  [TagId.ANIMAL_HEDGEHOG]: {
    name: "hedgehog",
    prompt: "hedgehog",
    negativePrompt: "",
    selected: false,
  },
  [TagId.ANIMAL_FERRET]: {
    name: "ferret",
    prompt: "ferret",
    negativePrompt: "",
    selected: false,
  },
  [TagId.ANIMAL_LIZARD]: {
    name: "lizard",
    prompt: "lizard",
    negativePrompt: "",
    selected: false,
  },
  [TagId.ANIMAL_GOLDFISH]: {
    name: "goldfish",
    prompt: "goldfish",
    negativePrompt: "",
    selected: false,
  },
  [TagId.ANIMAL_MOUSE]: {
    name: "mouse",
    prompt: "mouse",
    negativePrompt: "",
    selected: false,
  },
  [TagId.ANIMAL_CHINCHILLA]: {
    name: "chinchilla",
    prompt: "chinchilla",
    negativePrompt: "",
    selected: false,
  },
  [TagId.ANIMAL_CHICKEN]: {
    name: "chicken",
    prompt: "chicken",
    negativePrompt: "",
    selected: false,
  },
  [TagId.ANIMAL_GERBIL]: {
    name: "gerbil",
    prompt: "gerbil",
    negativePrompt: "",
    selected: false,
  },
  [TagId.ANIMAL_RAT]: {
    name: "rat",
    prompt: "rat",
    negativePrompt: "",
    selected: false,
  },
  [TagId.ANIMAL_PARROT]: {
    name: "parrot",
    prompt: "parrot",
    negativePrompt: "",
    selected: false,
  },
  [TagId.ANIMAL_SUGAR_GLIDER]: {
    name: "sugar glider",
    prompt: "sugar glider",
    negativePrompt: "",
    selected: false,
  },
  [TagId.ANIMAL_TARANTULA]: {
    name: "tarantula",
    prompt: "tarantula",
    negativePrompt: "",
    selected: false,
  },
  [TagId.ANIMAL_HERMIT_CRAB]: {
    name: "hermit crab",
    prompt: "hermit crab",
    negativePrompt: "",
    selected: false,
  },

  // Age
  [TagId.AGE_YOUNG]: {
    name: "young",
    prompt: "young",
    negativePrompt: "",
    selected: false,
  },
  [TagId.AGE_MIDDLE_AGE]: {
    name: "middle age",
    prompt: "middle age",
    negativePrompt: "",
    selected: false,
  },
  [TagId.AGE_OLD]: {
    name: "old",
    prompt: "old",
    negativePrompt: "",
    selected: false,
  },

  // Subjects
  [TagId.SUBJECTS_ONE_PET]: {
    name: "one pet",
    prompt: "one pet",
    negativePrompt: "",
    selected: false,
  },
  [TagId.SUBJECTS_TWO_PETS]: {
    name: "two pets",
    prompt: "two pets",
    negativePrompt: "",
    selected: false,
  },
  [TagId.SUBJECTS_MULTIPLE_PETS]: {
    name: "multiple pets",
    prompt: "multiple pets",
    negativePrompt: "",
    selected: false,
  },

  // Setting
  [TagId.SETTING_BEACH]: {
    name: "beach",
    prompt: "beach setting",
    negativePrompt: "",
    selected: false,
  },
  [TagId.SETTING_PARK]: {
    name: "park",
    prompt: "park setting",
    negativePrompt: "",
    selected: false,
  },
  [TagId.SETTING_FOREST]: {
    name: "forest",
    prompt: "forest setting",
    negativePrompt: "",
    selected: false,
  },
  [TagId.SETTING_JUNGLE]: {
    name: "jungle",
    prompt: "jungle setting",
    negativePrompt: "",
    selected: false,
  },
  [TagId.SETTING_POOL]: {
    name: "pool",
    prompt: "pool setting",
    negativePrompt: "",
    selected: false,
  },

  // Style
  [TagId.STYLE_PHOTOGRAPH]: {
    name: "photograph",
    prompt: "detailed photo, shot on Nikon",
    negativePrompt: "",
    selected: false,
  },
  [TagId.STYLE_OCTANE]: {
    name: "3d",
    prompt: "octane render",
    negativePrompt: "",
    selected: false,
  },
  [TagId.STYLE_ANIMATED]: {
    name: "anime",
    prompt: "(cartoon), (anime)",
    negativePrompt: "",
    selected: false,
  },
  [TagId.STYLE_DIGITAL_ART]: {
    name: "digital art",
    prompt: "digital art",
    negativePrompt: "",
    selected: false,
  },

  // Facial expression
  [TagId.FACIAL_EXPRESSION_HAPPY]: {
    name: "happy",
    prompt: "happy, ((detailed face))",
    negativePrompt: "(deformed face)",
    selected: false,
  },
  [TagId.FACIAL_EXPRESSION_SAD]: {
    name: "sad",
    prompt: "sad face, (sad eyes), ((detailed face))",
    negativePrompt: "(happy), (smile), smiling, (deformed face)",
    selected: false,
  },
  [TagId.FACIAL_EXPRESSION_ANGRY]: {
    name: "angry",
    prompt: "angry face, mad, ((detailed face))",
    negativePrompt: "playful, (happy), (deformed face), (weird eyes)",
    selected: false,
  },
  [TagId.FACIAL_EXPRESSION_NERVOUS]: {
    name: "nervous",
    prompt: "nervous face ((detailed face))",
    negativePrompt: "(deformed face)",
    selected: false,
  },
  [TagId.FACIAL_EXPRESSION_LAUGHING]: {
    name: "laughing",
    prompt: "laughing, (laughing face), ((detailed face))",
    negativePrompt: "(sad), (deformed face)",
    selected: false,
  },

  // Clothing
  [TagId.CLOTHING_SHIRT]: {
    name: "shirt",
    prompt: "wearing a shirt",
    negativePrompt: "",
    selected: false,
  },
  [TagId.CLOTHING_PANTS]: {
    name: "pants",
    prompt: "wearing pants",
    negativePrompt: "",
    selected: false,
  },
  [TagId.CLOTHING_SHOES]: {
    name: "shoes",
    prompt: "wearing shoes",
    negativePrompt: "",
    selected: false,
  },
  [TagId.CLOTHING_HAT]: {
    name: "hat",
    prompt: "wearing hat",
    negativePrompt: "",
    selected: false,
  },
}

const animalGroup = {
  [GroupId.ANIMAL]: {
    select: Select.SINGLE,
    required: false,
    name: "Animal",
    tags: {
      [TagId.ANIMAL_DOG]: tags[TagId.ANIMAL_DOG],
      [TagId.ANIMAL_CAT]: tags[TagId.ANIMAL_CAT],
      [TagId.ANIMAL_BIRD]: tags[TagId.ANIMAL_BIRD],
      [TagId.ANIMAL_FISH]: tags[TagId.ANIMAL_FISH],
      [TagId.ANIMAL_HAMSTER]: tags[TagId.ANIMAL_HAMSTER],
      [TagId.ANIMAL_RABBIT]: tags[TagId.ANIMAL_RABBIT],
      [TagId.ANIMAL_GUINEA_PIG]: tags[TagId.ANIMAL_GUINEA_PIG],
      [TagId.ANIMAL_SNAKE]: tags[TagId.ANIMAL_SNAKE],
      [TagId.ANIMAL_TURTLE]: tags[TagId.ANIMAL_TURTLE],
      [TagId.ANIMAL_HEDGEHOG]: tags[TagId.ANIMAL_HEDGEHOG],
      [TagId.ANIMAL_FERRET]: tags[TagId.ANIMAL_FERRET],
      [TagId.ANIMAL_LIZARD]: tags[TagId.ANIMAL_LIZARD],
      [TagId.ANIMAL_GOLDFISH]: tags[TagId.ANIMAL_GOLDFISH],
      [TagId.ANIMAL_MOUSE]: tags[TagId.ANIMAL_MOUSE],
      [TagId.ANIMAL_CHINCHILLA]: tags[TagId.ANIMAL_CHINCHILLA],
      [TagId.ANIMAL_CHICKEN]: tags[TagId.ANIMAL_CHICKEN],
      [TagId.ANIMAL_GERBIL]: tags[TagId.ANIMAL_GERBIL],
      [TagId.ANIMAL_RAT]: tags[TagId.ANIMAL_RAT],
      [TagId.ANIMAL_PARROT]: tags[TagId.ANIMAL_PARROT],
      [TagId.ANIMAL_SUGAR_GLIDER]: tags[TagId.ANIMAL_SUGAR_GLIDER],
      [TagId.ANIMAL_TARANTULA]: tags[TagId.ANIMAL_TARANTULA],
      [TagId.ANIMAL_HERMIT_CRAB]: tags[TagId.ANIMAL_HERMIT_CRAB],
    },
  },
}

const ageGroup = {
  [GroupId.AGE]: {
    select: Select.SINGLE,
    required: false,
    name: "Age",
    tags: {
      [TagId.AGE_YOUNG]: tags[TagId.AGE_YOUNG],
      [TagId.AGE_MIDDLE_AGE]: tags[TagId.AGE_MIDDLE_AGE],
      [TagId.AGE_OLD]: tags[TagId.AGE_OLD],
    },
  },
}

const subjectsGroup = {
  [GroupId.SUBJECTS]: {
    select: Select.SINGLE,
    required: true,
    name: "Number of pets",
    tags: {
      [TagId.SUBJECTS_ONE_PET]: tags[TagId.SUBJECTS_ONE_PET],
      [TagId.SUBJECTS_TWO_PETS]: tags[TagId.SUBJECTS_TWO_PETS],
      [TagId.SUBJECTS_MULTIPLE_PETS]: tags[TagId.SUBJECTS_MULTIPLE_PETS],
    },
  },
}

const settingGroup = {
  [GroupId.SETTING]: {
    select: Select.SINGLE,
    required: false,
    name: "Setting",
    tags: {
      [TagId.SETTING_BEACH]: tags[TagId.SETTING_BEACH],
      [TagId.SETTING_PARK]: tags[TagId.SETTING_PARK],
      [TagId.SETTING_FOREST]: tags[TagId.SETTING_FOREST],
      [TagId.SETTING_JUNGLE]: tags[TagId.SETTING_JUNGLE],
      [TagId.SETTING_POOL]: tags[TagId.SETTING_POOL],
    },
  },
}

const styleGroup = {
  [GroupId.STYLE]: {
    select: Select.SINGLE,
    required: false,
    name: "Style",
    tags: {
      [TagId.STYLE_PHOTOGRAPH]: tags[TagId.STYLE_PHOTOGRAPH],
      [TagId.STYLE_OCTANE]: tags[TagId.STYLE_OCTANE],
      [TagId.STYLE_ANIMATED]: tags[TagId.STYLE_ANIMATED],
      [TagId.STYLE_DIGITAL_ART]: tags[TagId.STYLE_DIGITAL_ART],
    },
  },
}

const facialExpressionGroup = {
  [GroupId.FACIAL_EXPRESSION]: {
    select: Select.SINGLE,
    required: false,
    name: "Facial expression",
    tags: {
      [TagId.FACIAL_EXPRESSION_HAPPY]: tags[TagId.FACIAL_EXPRESSION_HAPPY],
      [TagId.FACIAL_EXPRESSION_SAD]: tags[TagId.FACIAL_EXPRESSION_SAD],
      [TagId.FACIAL_EXPRESSION_ANGRY]: tags[TagId.FACIAL_EXPRESSION_ANGRY],
      [TagId.FACIAL_EXPRESSION_NERVOUS]: tags[TagId.FACIAL_EXPRESSION_NERVOUS],
      [TagId.FACIAL_EXPRESSION_LAUGHING]:
        tags[TagId.FACIAL_EXPRESSION_LAUGHING],
    },
  },
}

const clothingGroup = {
  [GroupId.CLOTHING]: {
    select: Select.SINGLE,
    required: true,
    name: "Clothing",
    tags: {
      [TagId.CLOTHING_SHIRT]: tags[TagId.CLOTHING_SHIRT],
      [TagId.CLOTHING_PANTS]: tags[TagId.CLOTHING_PANTS],
      [TagId.CLOTHING_SHOES]: tags[TagId.CLOTHING_SHOES],
      [TagId.CLOTHING_HAT]: tags[TagId.CLOTHING_HAT],
    },
  },
}

const uiTagMap: TagMap = {
  [ModelId.BASE]: {
    groups: {
      ...styleGroup,
      ...subjectsGroup,
      ...animalGroup,
      ...ageGroup,
      ...facialExpressionGroup,
      ...clothingGroup,
      ...settingGroup,
    },
  },
}

export const selectRandomTag = (
  tagMap: TagMap,
  modelId: ModelId,
  groupId: GroupId
) => {
  const tagIds = Object.keys(tagMap[modelId].groups[groupId].tags) as TagId[]
  const tagIdLength = tagIds.length
  let randomTagIndex = Math.round(Math.random() * tagIdLength)
  if (randomTagIndex == tagIdLength && tagIdLength != 0) {
    randomTagIndex -= 1
  }
  const randomTagId = tagIds[randomTagIndex]
  tagMap[modelId].groups[groupId].tags[randomTagId].selected = true

  return tagMap
}

export const getDefaultGenerateTagMap = () => {
  const defaultTagMap: TagMap = JSON.parse(JSON.stringify(uiTagMap))
  defaultTagMap[ModelId.BASE].groups[GroupId.SUBJECTS].tags[
    TagId.SUBJECTS_ONE_PET
  ].selected = true
  defaultTagMap[ModelId.BASE].groups[GroupId.CLOTHING].tags[
    TagId.CLOTHING_HAT
  ].selected = true
  defaultTagMap[ModelId.BASE].groups[GroupId.STYLE].tags[
    TagId.STYLE_PHOTOGRAPH
  ].selected = true
  defaultTagMap[ModelId.BASE].groups[GroupId.ANIMAL].tags[
    TagId.ANIMAL_CAT
  ].selected = true
  defaultTagMap[ModelId.BASE].groups[GroupId.FACIAL_EXPRESSION].tags[
    TagId.FACIAL_EXPRESSION_HAPPY
  ].selected = true

  return defaultTagMap
}

export const getRequiredTagMap = () => {
  const requiredTagMap: TagMap = JSON.parse(JSON.stringify(uiTagMap))
  requiredTagMap[ModelId.BASE].groups[GroupId.SUBJECTS].tags[
    TagId.SUBJECTS_ONE_PET
  ].selected = true
  requiredTagMap[ModelId.BASE].groups[GroupId.ANIMAL].tags[
    TagId.ANIMAL_DOG
  ].selected = true

  return requiredTagMap
}

export const getEmptyTagMap = () => {
  const emptyTagMap: TagMap = JSON.parse(JSON.stringify(uiTagMap))
  return emptyTagMap
}
