import makeDb from '../../../__test__/fixtures/db'
import makeFakeFood from '../../../__test__/fixtures/food'
import { makeFoodsDb } from '../../data-access/food'
import makeRemoveFood from './remove-food'

describe('remove food', () => {
  let foodsDb, removeFood

  beforeAll(() => {
    foodsDb = makeFoodsDb({ makeDb })
    removeFood = makeRemoveFood({ foodsDb })
  })

  it('must include id', () => {
    const { id, ...foodInfo } = makeFakeFood()
    expect(removeFood(foodInfo)).rejects.toThrow('Food id is required')
  })

  it('handles non-existent foods', async () => {
    const fakeFood = makeFakeFood()
    const expected = {
      deletedCount: 0,
      message: 'Food not found, nothing to delete'
    }
    const actual = await removeFood(fakeFood)
    expect(actual).toEqual(expected)
  })

  it('hard deletes a food', async () => {
    const fakeFood = await foodsDb.insert(makeFakeFood())
    const expected = {
      deletedCount: 1,
      message: 'Food deleted'
    }
    const actual = await removeFood(fakeFood)
    expect(actual).toEqual(expected)
  })
})
