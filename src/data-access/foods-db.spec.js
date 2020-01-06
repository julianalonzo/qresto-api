import makeFakeFood from '../../__test__/fixtures/food'
import makeDb from '../../__test__/fixtures/db'
import makeFoodsDb from './foods-db'

describe('foods db', () => {
  let foodsDb

  beforeEach(async () => {
    foodsDb = makeFoodsDb({ makeDb })
  })

  it('inserts a food', async () => {
    const food = makeFakeFood()
    const result = await foodsDb.insert(food)
    return expect(result).toEqual(food)
  })

  it('lists foods', async () => {
    const inserts = await Promise.all(
      [makeFakeFood(), makeFakeFood(), makeFakeFood()].map(foodsDb.insert)
    )
    const found = await foodsDb.findAll()
    expect.assertions(inserts.length)
    return inserts.forEach(insert => expect(found).toContainEqual(insert))
  })

  it('can list available foods only', async () => {
    const inserts = await Promise.all([
      makeFakeFood({ available: true }),
      makeFakeFood({ available: true }),
      makeFakeFood({ available: true }),
      makeFakeFood({ available: false }),
      makeFakeFood({ available: false })
    ])
    const found = await foodsDb.findAll({ availableOnly: true })
    const availableFoodInserts = inserts.filter(insert => insert.available)
    expect.assertions(availableFoodInserts.length)
    return availableFoodInserts.forEach(insert =>
      expect(found).toContainEqual(insert)
    )
  })

  it('can list deleted foods only', async () => {
    const inserts = await Promise.all([
      makeFakeFood({ deleted: true }),
      makeFakeFood({ deleted: true }),
      makeFakeFood({ deleted: true }),
      makeFakeFood({ deleted: false }),
      makeFakeFood({ deleted: false })
    ])
    const found = await foodsDb.findAll({ deletedOnly: true })
    const deletedFoodInserts = inserts.filter(insert => insert.deleted)
    expect.assertions(deletedFoodInserts.length)
    return deletedFoodInserts.forEach(insert =>
      expect(found).toContainEqual(insert)
    )
  })

  it('finds a food by id', async () => {
    const food = makeFakeFood()
    await foodsDb.insert(food)
    const found = await foodsDb.findById(food.id)
    expect(found).toEqual(food)
  })

  it('updates a food name', async () => {
    const food = makeFakeFood()
    await foodsDb.insert(food)
    food.name = 'Hamburger'
    const updated = await foodsDb.update(food)
    return expect(updated.name).toBe('Hamburger')
  })

  it('deletes a food', async () => {
    const food = makeFakeFood()
    await foodsDb.insert(food)
    return expect(await foodsDb.remove(food)).toBe(1)
  })
})
