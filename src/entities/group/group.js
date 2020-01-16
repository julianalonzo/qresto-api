export default function buildGroup ({ Id }) {
  return function makeGroup ({
    id = Id.makeId(),
    name,
    description,
    restaurantId
  } = {}) {
    if (!Id.isValidId(id)) {
      throw new Error('Group must have a valid id')
    }

    if (!name || !name.trim()) {
      throw new Error('Group must have a name')
    }

    if (!Id.isValidId(restaurantId)) {
      throw new Error('Group must have a valid restaurant id')
    }

    return Object.freeze({
      getId: () => id,
      getName: () => name,
      getDescription: () => description,
      getRestaurantId: () => restaurantId
    })
  }
}
