import makeDb from '../../../__test__/fixtures/db'
import makeFakeGroup from '../../../__test__/fixtures/group'
import { makeGroupsDb } from '../../data-access/group'
import makeEditGroup from './edit-group'

describe('delete food', () => {
  let groupsDb, editGroup

  beforeAll(() => {
    groupsDb = makeGroupsDb({ makeDb })
    editGroup = makeEditGroup({ groupsDb })
  })

  it('must include id', () => {
    const groupToEdit = makeFakeGroup({ id: undefined })
    expect(editGroup(groupToEdit)).rejects.toThrow('Group id is required')
  })

  it('requires name when supplied', async () => {
    const newGroup = await groupsDb.insert(makeFakeGroup())
    expect(editGroup({ ...newGroup, name: '' })).rejects.toThrow(
      'Group must have a name'
    )
  })

  it('must be an existing group', async () => {
    const groupToEdit = makeFakeGroup()
    expect(editGroup(groupToEdit)).rejects.toThrow('Group is not found')
  })

  it('modifies a group', async () => {
    const newGroup = await groupsDb.insert(makeFakeGroup())

    newGroup.name = 'Favorites'
    newGroup.description = 'These are all the all-time favorites'

    const updatedGroup = await editGroup(newGroup)
    expect(updatedGroup).toEqual(newGroup)
  })
})
