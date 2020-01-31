export default function buildFood ({ Id, makeImage }) {
  return function makeFood ({
    id = Id.makeId(),
    name,
    description = '',
    price = 0,
    available = true,
    category,
    images = []
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

    if (!category) {
      throw new Error('Food must have a category')
    }

    if (!Array.isArray(images)) {
      throw new Error('Food images must be an array')
    } else {
      images.map((image) => makeImage(image))
    }

    return Object.freeze({
      getId: () => id,
      getName: () => name,
      getDescription: () => description,
      getPrice: () => price,
      isAvailable: () => available,
      getCategory: () => category,
      getImages: () => images,
      markAvailable: () => {
        available = true
      },
      markUnavailable: () => {
        available = false
      }
    })
  }
}
