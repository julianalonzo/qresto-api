import faker from 'faker'
import uuid from 'uuid/v4'

const Id = Object.freeze({
  makeId: uuid
})

export default function makeFakeGroup (overrides) {
  const group = {
    id: Id.makeId(),
    name: faker.commerce.productAdjective(),
    description: faker.lorem.sentences(2),
    restaurantId: Id.makeId()
  }

  return {
    ...group,
    ...overrides
  }
}
