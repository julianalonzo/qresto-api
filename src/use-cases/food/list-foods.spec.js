import makeDb from '../../../__test__/fixtures/db'
import makeFakeFood from '../../../__test__/fixtures/food'
import { makeFoodsDb } from '../../data-access/food'
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
    inserts.forEach(insert =>
      expect(found).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: insert.id })])
      )
    )
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
      expect(availableFoodsFound).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: insert.id })])
      )
    )

    const insertedUnavailableFoods = inserts.filter(insert => !insert.available)
    const unavailableFoodsFound = await getFoods({ available: false })
    insertedUnavailableFoods.forEach(insert =>
      expect(unavailableFoodsFound).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: insert.id })])
      )
    )
  })

  it('can get and filter foods by category', async () => {
    const firstFakeCategory = 'Main Course'
    const secondFakeCategory = 'Appetizer'
    const inserts = await Promise.all(
      [
        makeFakeFood({ category: firstFakeCategory }),
        makeFakeFood({ category: firstFakeCategory }),
        makeFakeFood({ category: firstFakeCategory }),
        makeFakeFood({ category: firstFakeCategory }),
        makeFakeFood({ category: firstFakeCategory }),
        makeFakeFood({ category: secondFakeCategory }),
        makeFakeFood({ category: secondFakeCategory }),
        makeFakeFood({ category: secondFakeCategory }),
        makeFakeFood({ category: secondFakeCategory })
      ].map(insert => foodsDb.insert(insert))
    )

    const insertedFirstCategoryFoods = inserts.filter(
      insert => insert.category === firstFakeCategory
    )
    const firstCategoryFoodsFound = await getFoods({
      category: firstFakeCategory
    })
    insertedFirstCategoryFoods.forEach(insert =>
      expect(firstCategoryFoodsFound).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: insert.id })])
      )
    )

    const insertedSecondCategoryFoods = inserts.filter(
      insert => insert.category === secondFakeCategory
    )
    const secondCategoryFoodsFound = await getFoods({
      category: secondFakeCategory
    })
    insertedSecondCategoryFoods.forEach(insert =>
      expect(secondCategoryFoodsFound).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: insert.id })])
      )
    )
  })
})
