import makeDb from '../../../__test__/fixtures/db'
import makeFakeGroup from '../../../__test__/fixtures/group'
import { makeGroupsDb } from '../../data-access/group'
import Id from '../../entities/Id'
import makeRetrieveGroup from './retrieve-group'

describe('retrieve group', () => {
  let groupsDb, retrieveGroup

  beforeAll(() => {
    groupsDb = makeGroupsDb({ makeDb })
    retrieveGroup = makeRetrieveGroup({ groupsDb })
  })

  it('must include id', () => {
    expect(retrieveGroup({ id: undefined })).rejects.toThrow(
      'Group id is required'
    )
  })

  it('throws an error when group is not found', () => {
    expect(retrieveGroup({ id: Id.makeId() })).rejects.toThrow(
      'Group not found'
    )
  })

  it('gets a group', async () => {
    const fakeGroup = makeFakeGroup()
    const newGroup = await groupsDb.insert(fakeGroup)
    const found = await retrieveGroup(newGroup)
    expect(found).toEqual(newGroup)
  })
})
