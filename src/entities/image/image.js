export default function buildImage ({ Id }) {
  return function makeImage ({ id = Id.makeId(), source } = {}) {
    if (!Id.isValidId(id)) {
      throw new Error('Image must have a valid id')
    }

    if (!isValidUrl(source)) {
      throw new Error('Image source is not a valid url')
    }

    return Object.freeze({
      getId: () => id,
      getSource: () => source
    })
  }

  function isValidUrl (str) {
    const pattern = new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
    )
    return str.match(pattern)
  }
}
