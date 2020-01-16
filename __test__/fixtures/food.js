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
    price: parseInt(faker.commerce.price()),
    available: faker.random.boolean(),
    groupId: Id.makeId()
  }

  return {
    ...food,
    ...overrides
  }
}
