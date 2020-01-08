export default function makeRemoveFood ({ foodsDb }) {
  return async function removeFood ({ id } = {}) {
    if (!id) {
      throw new Error('Food id is required')
    }

    const deleted = await foodsDb.remove({ id })

    return {
      deletedCount: deleted,
      message:
        deleted > 0 ? 'Food deleted' : 'Food not found, nothing to delete'
    }
  }
}
