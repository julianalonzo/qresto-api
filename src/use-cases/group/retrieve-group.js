export default function makeRetrieveGroup ({ groupsDb }) {
  return async function retrieveGroup ({ id } = {}) {
    if (!id) {
      throw new Error('Group id is required')
    }

    const exists = await groupsDb.findById({ id })
    if (!exists) {
      throw new RangeError('Group not found')
    }

    return { ...exists }
  }
}
