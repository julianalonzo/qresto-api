import faker from 'faker'
import uuid from 'uuid/v4'

const Id = Object.freeze({
  makeId: uuid
})

export default function makeFakeImage (overrides) {
  const image = {
    id: Id.makeId(),
    source: faker.image.food()
  }

  return {
    ...image,
    ...overrides
  }
}
