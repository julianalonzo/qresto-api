import makeDb from '../../../__test__/fixtures/db'
import makeFakeGroup from '../../../__test__/fixtures/group'
import makeGroupsDb from './groups-db'

describe('groups db', () => {
  let groupsDb

  beforeEach(async () => {
    groupsDb = makeGroupsDb({ makeDb })
  })

  it('inserts a group', async () => {
    const group = makeFakeGroup()
    const result = await groupsDb.insert(group)

    expect(result).toEqual(group)
  })

  it('lists groups', async () => {
    const inserts = await Promise.all(
      [makeFakeGroup(), makeFakeGroup(), makeFakeGroup()].map(insert =>
        groupsDb.insert(insert)
      )
    )

    const found = await groupsDb.findAll()

    expect.assertions(inserts.length)
    inserts.forEach(insert => expect(found).toContainEqual(insert))
  })

  it('finds a group by id', async () => {
    const group = makeFakeGroup()
    await groupsDb.insert(group)

    const found = await groupsDb.findById(group)

    expect(found).toEqual(group)
  })

  it('updates a group', async () => {
    const group = makeFakeGroup()
    await groupsDb.insert(group)

    group.name = 'Favorites'
    group.description = 'These are the all-time favorites'

    const updated = await groupsDb.update(group)

    expect(updated.name).toBe('Favorites')
    expect(updated.description).toBe('These are all the all-time favorites')
  })

  it('deletes a group', async () => {
    const group = makeFakeGroup()
    await groupsDb.insert(group)

    expect(await groupsDb.remove(group)).toBe(1)
  })
})
