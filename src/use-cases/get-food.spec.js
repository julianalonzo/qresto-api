import makeDb from '../../__test__/fixtures/db'
import makeFakeFood from '../../__test__/fixtures/food'
import makeFoodsDb from '../data-access/foods-db'
import Id from '../Id'
import makeGetFood from './get-food'

describe('get food', () => {
  let foodsDb, getFood

  beforeAll(() => {
    foodsDb = makeFoodsDb({ makeDb })
    getFood = makeGetFood({ foodsDb })
  })

  it('must include id', () => {
    expect(getFood({ id: undefined })).rejects.toThrow('Food id is required')
  })

  it('throws an error when food is not found', () => {
    expect(getFood({ id: Id.makeId() })).rejects.toThrow('Food not found')
  })

  it('gets a food', async () => {
    const fakeFood = makeFakeFood()
    const newFood = await foodsDb.insert(fakeFood)
    const found = await getFood(newFood)
    expect(found).toEqual(newFood)
  })
})
