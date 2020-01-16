import makeDb from '../../../__test__/fixtures/db'
import makeFakeFood from '../../../__test__/fixtures/food'
import { makeFoodsDb } from '../../data-access/food'
import Id from '../../entities/Id'
import makeGetFoods from './list-foods'

describe('get foods', () => {
  let foodsDb, getFoods

  beforeAll(() => {
    foodsDb = makeFoodsDb({ makeDb })
    getFoods = makeGetFoods({ foodsDb })
  })

  it('returns an empty array when empty', async () => {
    const found = await getFoods()
    expect(found).toEqual([])
  })

  it('gets all food', async () => {
    const inserts = await Promise.all(
      [makeFakeFood(), makeFakeFood(), makeFakeFood()].map(insert =>
        foodsDb.insert(insert)
      )
    )

    const found = await getFoods()
    expect.assertions(inserts.length)
    inserts.forEach(insert => expect(found).toContainEqual(insert))
  })

  it('can get and filter foods by availability', async () => {
    const inserts = await Promise.all(
      [
        makeFakeFood({ available: true }),
        makeFakeFood({ available: true }),
        makeFakeFood({ available: true }),
        makeFakeFood({ available: true }),
        makeFakeFood({ available: true }),
        makeFakeFood({ available: false }),
        makeFakeFood({ available: false }),
        makeFakeFood({ available: false }),
        makeFakeFood({ available: false })
      ].map(insert => foodsDb.insert(insert))
    )

    const insertedAvailableFoods = inserts.filter(insert => insert.available)
    const availableFoodsFound = await getFoods({ available: true })
    insertedAvailableFoods.forEach(insert =>
      expect(availableFoodsFound).toContainEqual(insert)
    )

    const insertedUnavailableFoods = inserts.filter(insert => !insert.available)
    const unavailableFoodsFound = await getFoods({ available: false })
    insertedUnavailableFoods.forEach(insert =>
      expect(unavailableFoodsFound).toContainEqual(insert)
    )
  })

  it('can get and filter foods by groupId', async () => {
    const firstFakeGroupId = Id.makeId()
    const secondFakeGroupId = Id.makeId()
    const inserts = await Promise.all(
      [
        makeFakeFood({ groupId: firstFakeGroupId }),
        makeFakeFood({ groupId: firstFakeGroupId }),
        makeFakeFood({ groupId: firstFakeGroupId }),
        makeFakeFood({ groupId: firstFakeGroupId }),
        makeFakeFood({ groupId: firstFakeGroupId }),
        makeFakeFood({ groupId: secondFakeGroupId }),
        makeFakeFood({ groupId: secondFakeGroupId }),
        makeFakeFood({ groupId: secondFakeGroupId }),
        makeFakeFood({ groupId: secondFakeGroupId })
      ].map(insert => foodsDb.insert(insert))
    )

    const insertedFirstRestaurantFoods = inserts.filter(
      insert => insert.groupId === firstFakeGroupId
    )
    const firstRestaurantFoodsFound = await getFoods({
      groupId: firstFakeGroupId
    })
    insertedFirstRestaurantFoods.forEach(insert =>
      expect(firstRestaurantFoodsFound).toContainEqual(insert)
    )

    const insertedSecondRestaurantFoods = inserts.filter(
      insert => insert.groupId === secondFakeGroupId
    )
    const secondRestaurantFoodsFound = await getFoods({
      groupId: secondFakeGroupId
    })
    insertedSecondRestaurantFoods.forEach(insert =>
      expect(secondRestaurantFoodsFound).toContainEqual(insert)
    )
  })
})
