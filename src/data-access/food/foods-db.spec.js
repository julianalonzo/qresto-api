import makeDb, { destroyDb } from '../../../__test__/fixtures/db'
import makeFakeFood from '../../../__test__/fixtures/food'
import makeFoodsDb from './foods-db'

describe('foods db', () => {
  let foodsDb

  beforeEach(() => {
    foodsDb = makeFoodsDb({ makeDb })
    return foodsDb
  })

  afterEach(() => {
    return destroyDb()
  })

  it('inserts a food', async () => {
    const food = makeFakeFood()
    const result = await foodsDb.insert(food)

    expect(result).toMatchObject(food)
  })

  it('lists foods', async () => {
    const inserts = await Promise.all(
      [
        makeFakeFood(),
        makeFakeFood(),
        makeFakeFood()
      ].map(insert => foodsDb.insert(insert))
    )

    const found = await foodsDb.findAll()

    expect.assertions(inserts.length)
    inserts.forEach(insert => expect(found).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: insert.id })
      ])
    ))
  })

  it('can list available foods only', async () => {
    const inserts = await Promise.all(
      [
        makeFakeFood({ available: true }),
        makeFakeFood({ available: true }),
        makeFakeFood({ available: true }),
        makeFakeFood({ available: false }),
        makeFakeFood({ available: false })
      ].map(insert => foodsDb.insert(insert))
    )

    const found = await foodsDb.findAll({ available: true })

    const availableFoodInserts = inserts.filter(
      insert => insert.available === true
    )

    expect.assertions(availableFoodInserts.length)
    availableFoodInserts.forEach(insert => expect(found).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: insert.id })
      ])
    ))
  })

  it('finds a food by id', async () => {
    const food = makeFakeFood()
    await foodsDb.insert(food)

    const found = await foodsDb.findById(food)

    expect(found).toMatchObject(food)
  })

  it('updates a food', async () => {
    const food = makeFakeFood()
    await foodsDb.insert(food)

    const updatedFood = makeFakeFood({ id: food.id })

    const updated = await foodsDb.update(updatedFood)

    expect(updated).toMatchObject(updatedFood)
  })

  it('deletes a food', async () => {
    const food = makeFakeFood()
    await foodsDb.insert(food)

    expect(await foodsDb.remove(food)).toBe(1)
  })
})
