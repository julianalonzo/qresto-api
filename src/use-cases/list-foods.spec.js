import makeDb from '../../__test__/fixtures/db'
import makeFakeFood from '../../__test__/fixtures/food'
import makeFoodsDb from '../data-access/foods-db'
import Id from '../Id'
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

  it('can get and filter foods by restaurantId', async () => {
    const firstFakeRestaurantId = Id.makeId()
    const secondFakeRestaurantId = Id.makeId()
    const inserts = await Promise.all(
      [
        makeFakeFood({ restaurantId: firstFakeRestaurantId }),
        makeFakeFood({ restaurantId: firstFakeRestaurantId }),
        makeFakeFood({ restaurantId: firstFakeRestaurantId }),
        makeFakeFood({ restaurantId: firstFakeRestaurantId }),
        makeFakeFood({ restaurantId: firstFakeRestaurantId }),
        makeFakeFood({ restaurantId: secondFakeRestaurantId }),
        makeFakeFood({ restaurantId: secondFakeRestaurantId }),
        makeFakeFood({ restaurantId: secondFakeRestaurantId }),
        makeFakeFood({ restaurantId: secondFakeRestaurantId })
      ].map(insert => foodsDb.insert(insert))
    )

    const insertedFirstRestaurantFoods = inserts.filter(
      insert => insert.restaurantId === firstFakeRestaurantId
    )
    const firstRestaurantFoodsFound = await getFoods({
      restaurantId: firstFakeRestaurantId
    })
    insertedFirstRestaurantFoods.forEach(insert =>
      expect(firstRestaurantFoodsFound).toContainEqual(insert)
    )

    const insertedSecondRestaurantFoods = inserts.filter(
      insert => insert.restaurantId === secondFakeRestaurantId
    )
    const secondRestaurantFoodsFound = await getFoods({
      restaurantId: secondFakeRestaurantId
    })
    insertedSecondRestaurantFoods.forEach(insert =>
      expect(secondRestaurantFoodsFound).toContainEqual(insert)
    )
  })
})
