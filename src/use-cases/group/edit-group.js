import makeGroup from '../../entities/group'

export default function makeEditFood ({ groupsDb }) {
  return async function editFood ({ id, ...modifiedFields } = {}) {
    if (!id) {
      throw new Error('Group id is required')
    }

    const existing = await groupsDb.findById({ id })
    if (!existing) {
      throw new RangeError('Group is not found')
    }

    const modifiedGroup = makeGroup({ id, ...existing, ...modifiedFields })

    const updatedGroup = await groupsDb.update({
      id: modifiedGroup.getId(),
      name: modifiedGroup.getName(),
      description: modifiedGroup.getDescription(),
      restaurantId: modifiedGroup.getRestaurantId()
    })

    return { ...existing, ...updatedGroup }
  }
}
