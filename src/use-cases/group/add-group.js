import makeGroup from '../../entities/group'

export default function makeAddGroup ({ groupsDb }) {
  return async function addGroup (groupInfo) {
    const group = makeGroup(groupInfo)

    const exists = await groupsDb.findById({ id: group.getId() })
    if (exists) {
      return exists
    }

    return groupsDb.insert({
      id: group.getId(),
      name: group.getName(),
      description: group.getDescription(),
      restaurantId: group.getRestaurantId()
    })
  }
}
