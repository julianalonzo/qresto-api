import makeDb from '../../__test__/fixtures/db'
import makeFakeFood from '../../__test__/fixtures/food'
import makeFoodsDb from '../data-access/foods-db'
import Id from '../Id'
import makeRetrieveFood from './retrieve-food'

describe('get food', () => {
  let foodsDb, retrieveFood

  beforeAll(() => {
    foodsDb = makeFoodsDb({ makeDb })
    retrieveFood = makeRetrieveFood({ foodsDb })
  })

  it('must include id', () => {
    expect(retrieveFood({ id: undefined })).rejects.toThrow('Food id is required')
  })

  it('throws an error when food is not found', () => {
    expect(retrieveFood({ id: Id.makeId() })).rejects.toThrow('Food not found')
  })

  it('gets a food', async () => {
    const fakeFood = makeFakeFood()
    const newFood = await foodsDb.insert(fakeFood)
    const found = await retrieveFood(newFood)
    expect(found).toEqual(newFood)
  })
})
