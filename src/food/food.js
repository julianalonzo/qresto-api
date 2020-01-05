export default function buildFood ({ Id }) {
  return function makeFood ({
    id = Id.makeId(),
    name,
    price = 0,
    available = true,
    deleted = false,
    restaurantId
  } = {}) {
    if (!Id.isValidId(id)) {
      throw new Error('Food must have a valid id')
    }

    if (!name) {
      throw new Error('Food must have a name')
    }

    if (isNaN(price)) {
      throw new Error('Food must have a numerical price')
    } else if (price < 0) {
      throw new Error('Food cannot have a negative price')
    }

    if (!Id.isValidId(restaurantId)) {
      throw new Error('Food must have a valid restaurant id')
    }

    return Object.freeze({
      getName: () => name,
      getPrice: () => price,
      isAvailable: () => available,
      markAvailable: () => {
        available = true
      },
      markUnavailable: () => {
        available = false
      },
      isDeleted: () => deleted,
      markDeleted: () => {
        deleted = true
      },
      markRestored: () => {
        deleted = false
      }
    })
  }
}
