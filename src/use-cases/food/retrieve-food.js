export default function makeRetrieveFood ({ foodsDb }) {
  return async function retrieveFood ({ id } = {}) {
    if (!id) {
      throw new Error('Food id is required')
    }

    const exists = await foodsDb.findById({ id })
    if (!exists) {
      throw new RangeError('Food not found')
    }

    return { ...exists }
  }
}
