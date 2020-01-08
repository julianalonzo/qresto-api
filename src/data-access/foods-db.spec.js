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

    expect(result).toEqual(food)
  })

  it('lists foods', async () => {
    const inserts = await Promise.all(
      [makeFakeFood(), makeFakeFood(), makeFakeFood()].map(insert =>
        foodsDb.insert(insert)
      )
    )

    const found = await foodsDb.findAll()

    expect.assertions(inserts.length)
    inserts.forEach(insert => expect(found).toContainEqual(insert))
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
    availableFoodInserts.forEach(insert => expect(found).toContainEqual(insert))
  })

  it('finds a food by id', async () => {
    const food = makeFakeFood()
    await foodsDb.insert(food)

    const found = await foodsDb.findById(food)

    expect(found).toEqual(food)
  })

  it('updates a food', async () => {
    const food = makeFakeFood()
    await foodsDb.insert(food)

    food.name = 'Hamburger'
    food.description = 'This is a hamburger'
    food.price = 123
    food.available = true

    const updated = await foodsDb.update(food)

    expect(updated.name).toBe('Hamburger')
    expect(updated.description).toBe('This is a hamburger')
    expect(updated.price).toBe(123)
    expect(updated.available).toBe(true)
  })

  it('deletes a food', async () => {
    const food = makeFakeFood()
    await foodsDb.insert(food)

    expect(await foodsDb.remove(food)).toBe(1)
  })
})
