export default function buildFood ({ Id }) {
  return function makeFood ({
    id = Id.makeId(),
    name,
    price = 0,
    available = true
  } = {}) {
    if (!name) {
      throw new Error('Food must have a name')
    }

    if (isNaN(price)) {
      throw new Error('Food must have a numerical price')
    } else if (price < 0) {
      throw new Error('Food cannot have a negative price')
    }

    if (!Id.isValidId(id)) {
      throw new Error('Food must have a valid id')
    }

    return Object.freeze({
      getPrice: () => price,
      isAvailable: () => available,
      markAvailable: () => {
        available = true
      },
      markUnavailable: () => {
        available = false
      }
    })
  }
}
