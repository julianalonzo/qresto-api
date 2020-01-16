export default function buildFood ({ Id }) {
  return function makeFood ({
    id = Id.makeId(),
    name,
    description = '',
    price = 0,
    available = true,
    groupId
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

    if (!Id.isValidId(groupId)) {
      throw new Error('Food must have a valid group id')
    }

    return Object.freeze({
      getId: () => id,
      getName: () => name,
      getDescription: () => description,
      getPrice: () => price,
      isAvailable: () => available,
      getGroupId: () => groupId,
      markAvailable: () => {
        available = true
      },
      markUnavailable: () => {
        available = false
      }
    })
  }
}
