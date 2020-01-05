export default function buildFood ({ Id }) {
  return function makeFood ({ name, price } = {}) {
    if (!name) {
      throw new Error('Food must have a name')
    }

    if (isNaN(price)) {
      throw new Error('Food must have a numerical price')
    } else if (price < 0) {
      throw new Error('Food cannot have a negative price')
    }
  }
}
