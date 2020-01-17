import makeDb from '../../../__test__/fixtures/db'
import makeFakeGroup from '../../../__test__/fixtures/group'
import { makeGroupsDb } from '../../data-access/group'
import Id from '../../entities/Id'
import makeListGroups from './list-groups'

describe('list groups', () => {
  let groupsDb, listGroups

  beforeAll(() => {
    groupsDb = makeGroupsDb({ makeDb })
    listGroups = makeListGroups({ groupsDb })
  })

  it('returns an empty array when empty', async () => {
    const found = await listGroups()
    expect(found).toEqual([])
  })

  it('lists all groups', async () => {
    const inserts = await Promise.all(
      [makeFakeGroup(), makeFakeGroup(), makeFakeGroup()].map(insert =>
        groupsDb.insert(insert)
      )
    )

    const found = await listGroups()
    expect.assertions(inserts.length)
    inserts.forEach(insert => expect(found).toContainEqual(insert))
  })

  it('can list and filter foods by restaurantId', async () => {
    // TODO change implementation once Restaurant model is implemented
    const firstFakeRestaurantId = Id.makeId()
    const secondFakeRestaurantId = Id.makeId()
    const inserts = await Promise.all(
      [
        makeFakeGroup({ restaurantId: firstFakeRestaurantId }),
        makeFakeGroup({ restaurantId: firstFakeRestaurantId }),
        makeFakeGroup({ restaurantId: firstFakeRestaurantId }),
        makeFakeGroup({ restaurantId: firstFakeRestaurantId }),
        makeFakeGroup({ restaurantId: firstFakeRestaurantId }),
        makeFakeGroup({ restaurantId: secondFakeRestaurantId }),
        makeFakeGroup({ restaurantId: secondFakeRestaurantId }),
        makeFakeGroup({ restaurantId: secondFakeRestaurantId }),
        makeFakeGroup({ restaurantId: secondFakeRestaurantId })
      ].map(insert => groupsDb.insert(insert))
    )

    const insertedFirstRestaurantGroups = inserts.filter(
      insert => insert.restaurantId === firstFakeRestaurantId
    )
    const firstRestaurantGroupsFound = await listGroups({
      restaurantId: firstFakeRestaurantId
    })
    insertedFirstRestaurantGroups.forEach(insert =>
      expect(firstRestaurantGroupsFound).toContainEqual(insert)
    )

    const insertedSecondRestaurantGroups = inserts.filter(
      insert => insert.restaurantId === secondFakeRestaurantId
    )
    const secondRestaurantGroupsFound = await listGroups({
      restaurantId: secondFakeRestaurantId
    })
    insertedSecondRestaurantGroups.forEach(insert =>
      expect(secondRestaurantGroupsFound).toContainEqual(insert)
    )
  })
})
