export interface Image {
  uri: string
  tags: ImageTags
  model: ModelId
  createdAt: number
}

export interface ImageWithId extends Image {
  id: string
}

export type ImageTags = {
  [key in TagId]?: true
}

export interface Tag {
  name: string
  prompt: string
  negativePrompt: string
  selected: boolean
}

export interface TagWithId extends Tag {
  id: string
}

export type TagMap = {
  [key in ModelId]?: {
    groups: {
      [key in GroupId]?: {
        select: Select
        name: string
        required: boolean
        tags: {
          [key in TagId]?: Tag
        }
      }
    }
  }
}

export enum GroupId {
  ANIMAL = "animal",
  BODY_TYPE = "body_type",
  AGE = "age",
  SUBJECTS = "subjects",
  SETTING = "setting",
  STYLE = "style",
  FACIAL_EXPRESSION = "facial_expression",
  HAIR_COLOR = "hair_color",
  CLOTHING = "clothing",
}

export enum ModelId {
  BASE = "base",
}

export enum Select {
  SINGLE = "single",
  MULTI = "multi",
}

export enum TagId {
  // Animals
  ANIMAL_DOG = "animal_dog",
  ANIMAL_CAT = "animal_cat",
  ANIMAL_BIRD = "animal_bird",
  ANIMAL_FISH = "animal_fish",
  ANIMAL_HAMSTER = "animal_hamster",
  ANIMAL_RABBIT = "animal_rabbit",
  ANIMAL_GUINEA_PIG = "animal_guinea_pig",
  ANIMAL_SNAKE = "animal_snake",
  ANIMAL_TURTLE = "animal_turtle",
  ANIMAL_HEDGEHOG = "animal_hedgehog",
  ANIMAL_FERRET = "animal_ferret",
  ANIMAL_LIZARD = "animal_lizard",
  ANIMAL_GOLDFISH = "animal_goldfish",
  ANIMAL_MOUSE = "animal_mouse",
  ANIMAL_CHINCHILLA = "animal_chinchilla",
  ANIMAL_CHICKEN = "animal_chicken",
  ANIMAL_GERBIL = "animal_gerbil",
  ANIMAL_RAT = "animal_rat",
  ANIMAL_PARROT = "animal_parrot",
  ANIMAL_SUGAR_GLIDER = "animal_sugar_glider",
  ANIMAL_TARANTULA = "animal_tarantula",
  ANIMAL_HERMIT_CRAB = "animal_hermit_crab",

  // Age
  AGE_YOUNG = "age_young",
  AGE_MIDDLE_AGE = "age_middle_age",
  AGE_OLD = "age_old",

  // Subjects
  SUBJECTS_ONE_PET = "subjects_one_pet",
  SUBJECTS_TWO_PETS = "subjects_two_pets",
  SUBJECTS_MULTIPLE_PETS = "subjects_multiple_pets",

  // Setting
  SETTING_BEACH = "setting_beach",
  SETTING_PARK = "setting_park",
  SETTING_FOREST = "setting_forest",
  SETTING_JUNGLE = "setting_jungle",
  SETTING_POOL = "setting_pool",

  // Style
  STYLE_PHOTOGRAPH = "style_photograph",
  STYLE_OCTANE = "style_octane",
  STYLE_ANIMATED = "style_animated",
  STYLE_DIGITAL_ART = "style_digital_art",

  // Facial Expression
  FACIAL_EXPRESSION_HAPPY = "facial_expression_happy",
  FACIAL_EXPRESSION_SAD = "facial_expression_sad",
  FACIAL_EXPRESSION_ANGRY = "facial_expression_angry",
  FACIAL_EXPRESSION_NERVOUS = "facial_expression_nervous",
  FACIAL_EXPRESSION_LAUGHING = "facial_expression_laughing",

  // Clothing
  CLOTHING_SHIRT = "clothing_shirt",
  CLOTHING_PANTS = "clothing_pants",
  CLOTHING_SHOES = "clothing_shoes",
  CLOTHING_HAT = "clothing_hat",
}

export type DecodedTags = {
  model: ModelId
  groups: {
    [key in GroupId]?: TagId[]
  }
}

export type Prompts = {
  prompt: string
  negativePrompt: string
}

export enum ImageStatus {
  PENDING = "pending",
  SUCCEEDED = "succeeded",
}
