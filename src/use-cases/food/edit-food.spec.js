import makeDb from '../../../__test__/fixtures/db'
import makeFakeFood from '../../../__test__/fixtures/food'
import { makeFoodsDb } from '../../data-access/food'
import makeEditFood from './edit-food'

describe('edits food', () => {
  let foodsDb, editFood

  beforeAll(() => {
    foodsDb = makeFoodsDb({ makeDb })
    editFood = makeEditFood({ foodsDb })
  })

  it('must include id', () => {
    const { id, ...foodInfo } = makeFakeFood()
    expect(editFood(foodInfo)).rejects.toThrow('Food id is required')
  })

  it('requires name when supplied', async () => {
    const newFood = await foodsDb.insert(makeFakeFood())
    expect(editFood({ ...newFood, name: '' })).rejects.toThrow(
      'Food must have a name'
    )
  })

  it('must have a valid price when supplied', async () => {
    const newFood = await foodsDb.insert(makeFakeFood())

    expect(editFood({ ...newFood, price: 'Hi' })).rejects.toThrow(
      'Food must have a numerical price'
    )

    expect(editFood({ ...newFood, price: -50 })).rejects.toThrow(
      'Food cannot have a negative price'
    )
  })

  it('must be an existing food', async () => {
    const foodToEdit = makeFakeFood()
    expect(editFood(foodToEdit)).rejects.toThrow('Food is not found')
  })

  it('modifies a food', async () => {
    const food = makeFakeFood()
    await foodsDb.insert(food)

    const modifiedFood = makeFakeFood({ id: food.id })

    const updatedFood = await foodsDb.update(modifiedFood)
    expect(updatedFood).toMatchObject(modifiedFood)
  })
})
