import faker from 'faker'
import uuid from 'uuid/v4'

const Id = Object.freeze({
  makeId: uuid
})

export default function makeFakeFood (overrides) {
  const food = {
    id: Id.makeId(),
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(2),
    price: faker.commerce.price(),
    available: faker.random.boolean(),
    restaurantId: Id.makeId()
  }

  return {
    ...food,
    ...overrides
  }
}
