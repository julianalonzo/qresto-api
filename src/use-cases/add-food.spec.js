import makeDb from '../../__test__/fixtures/db'
import makeFakeFood from '../../__test__/fixtures/food'
import makeFoodsDb from '../data-access/foods-db'
import makeAddFood from './add-food'

describe('add food', () => {
  let foodsDb, addFood

  beforeAll(() => {
    foodsDb = makeFoodsDb({ makeDb })
    addFood = makeAddFood({ foodsDb })
  })

  it('inserts food in the database', async () => {
    const newFood = makeFakeFood()
    const inserted = await addFood(newFood)
    expect(inserted).toMatchObject(newFood)
  })

  it('does not insert food without name', async () => {
    const newFood = makeFakeFood({ name: '' })
    expect(addFood(newFood)).rejects.toThrow('Food must have a name')
  })

  it('does not insert food without a valid price', async () => {
    const newFood = makeFakeFood({ price: 'Hi' })
    expect(addFood(newFood)).rejects.toThrow('Food must have a numerical price')

    newFood.price = -50
    expect(addFood(newFood)).rejects.toThrow(
      'Food cannot have a negative price'
    )
  })

  it('is idempotent', async () => {
    const newFood = makeFakeFood()

    const firstInsert = await addFood(newFood)
    const secondInsert = await addFood(newFood)
    expect(firstInsert.id).toBe(secondInsert.id)
  })
})
