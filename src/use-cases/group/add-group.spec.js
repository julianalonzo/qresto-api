import makeDb from '../../../__test__/fixtures/db'
import makeFakeGroup from '../../../__test__/fixtures/group'
import { makeGroupsDb } from '../../data-access/group'
import makeAddGroup from './add-group'

describe('add group', () => {
  let groupsDb, addGroup

  beforeAll(() => {
    groupsDb = makeGroupsDb({ makeDb })
    addGroup = makeAddGroup({ groupsDb })
  })

  it('inserts group in the database', async () => {
    const newGroup = makeFakeGroup()
    const inserted = await addGroup(newGroup)
    expect(inserted).toMatchObject(newGroup)
  })

  it('does not insert group without a name', async () => {
    const newGroup = makeFakeGroup({ name: '' })
    expect(addGroup(newGroup)).rejects.toThrow('Group must have a name')

    const newGroupWithBlankName = makeFakeGroup({ name: '     ' })
    expect(addGroup(newGroupWithBlankName)).rejects.toThrow(
      'Group must have a name'
    )
  })

  it('is idempotent', async () => {
    const newGroup = makeFakeGroup()

    const firstInsert = await addGroup(newGroup)
    const secondInsert = await addGroup(newGroup)

    expect(firstInsert.id).toBe(secondInsert.id)
  })
})
