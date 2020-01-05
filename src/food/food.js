export default function buildFood ({ Id }) {
  return function makeFood ({ id = Id.makeId(), name, price } = {}) {
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
  }
}
