import lzString from "lz-string"
import fetch from "node-fetch"

let count = 0

const getEncodedTags = () => {
  const randomFromList = (list: string[]) => {
    const random = []
    const randomElement = list[Math.floor(Math.random() * list.length)]
    random.push(randomElement)
    return random
  }

  const decodedTags = {
    model: "base",
    groups: {
      animal: randomFromList([
        "animal_dog",
        "animal_cat",
        "animal_bird",
        "animal_fish",
        "animal_hamster",
        "animal_rabbit",
        "animal_guinea_pig",
        "animal_snake",
        "animal_turtle",
        "animal_hedgehog",
        "animal_ferret",
        "animal_lizard",
        "animal_goldfish",
        "animal_mouse",
        "animal_chinchilla",
        "animal_chicken",
        "animal_gerbil",
        "animal_rat",
        "animal_parrot",
        "animal_sugar_glider",
        "animal_tarantula",
        "animal_hermit_crab",
      ]),
      age: ["age_baby", "age_young", "age_middle_age", "age_old"],
      subjects: [
        "subjects_one_pet",
        "subjects_two_pets",
        "subjects_multiple_pets",
      ],
      setting: randomFromList([
        "setting_beach",
        "setting_park",
        "setting_forest",
        "setting_jungle",
        "setting_pool",
      ]),
      style: randomFromList([
        "style_photograph",
        "style_octane",
        "style_animated",
        "style_digital_art",
      ]),
      facial_expression: randomFromList([
        "facial_expression_happy",
        "facial_expression_sad",
        "facial_expression_angry",
        "facial_expression_nervous",
        "facial_expression_laughing",
      ]),
      clothing: [
        "clothing_shirt",
        "clothing_pants",
        "clothing_shoes",
        "clothing_hat",
      ],
    },
  }

  const encodedTags = lzString.compressToEncodedURIComponent(
    JSON.stringify(decodedTags)
  )

  return encodedTags
}

const generateImages = async () => {
  count += 1
  console.log(count)
  await fetch("https://thepetgen.com/api/generate", {
    method: "POST",
    headers: {
      ContentType: "application/json",
    },
    body: JSON.stringify({
      tags: getEncodedTags(),
    }),
  })
}

setInterval(generateImages, 1000)
