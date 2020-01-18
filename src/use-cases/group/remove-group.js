export default function makeRemoveGroup ({ groupsDb }) {
  return async function removeGroup ({ id } = {}) {
    if (!id) {
      throw new Error('Group id is required')
    }

    const deleted = await groupsDb.remove({ id })

    return {
      deletedCount: deleted,
      message:
        deleted > 0 ? 'Group deleted' : 'Group not found, nothing to delete'
    }
  }
}
