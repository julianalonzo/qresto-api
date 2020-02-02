import faker from 'faker'
import uuid from 'uuid/v4'
import makeFakeImage from './image'

const Id = Object.freeze({
  makeId: uuid
})

export default function makeFakeFood ({ id = Id.makeId(), ...overrides } = {}) {
  const food = {
    id: id,
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(2),
    price: parseInt(faker.commerce.price()),
    available: faker.random.boolean(),
    category: faker.commerce.productAdjective(),
    images: [
      generateImageWithFoodId(id),
      generateImageWithFoodId(id),
      generateImageWithFoodId(id)
    ]
  }

  return {
    ...food,
    ...overrides
  }
}

function generateImageWithFoodId (foodId) {
  return {
    ...makeFakeImage(),
    foodId
  }
}
