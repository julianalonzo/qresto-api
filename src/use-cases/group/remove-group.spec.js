import makeDb from '../../../__test__/fixtures/db'
import makeFakeGroup from '../../../__test__/fixtures/group'
import { makeGroupsDb } from '../../data-access/group'
import makeRemoveGroup from './remove-group'

describe('remove food', () => {
  let groupsDb, removeGroup

  beforeAll(() => {
    groupsDb = makeGroupsDb({ makeDb })
    removeGroup = makeRemoveGroup({ groupsDb })
  })

  it('must include id', () => {
    const groupToDelete = makeFakeGroup({ id: undefined })
    expect(removeGroup(groupToDelete)).rejects.toThrow('Group id is required')
  })

  it('handles non-existent groups', async () => {
    const fakeGroup = makeFakeGroup()
    const expected = {
      deletedCount: 0,
      message: 'Group not found, nothing to delete'
    }
    const actual = await removeGroup(fakeGroup)
    expect(actual).toEqual(expected)
  })

  it('hard deletes a group', async () => {
    const fakeGroup = await groupsDb.insert(makeFakeGroup())
    const expected = {
      deletedCount: 1,
      message: 'Group deleted'
    }
    const actual = await removeGroup(fakeGroup)
    expect(actual).toEqual(expected)
  })
})
