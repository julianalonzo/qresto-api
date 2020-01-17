import makeDb from '../../../__test__/fixtures/db'
import makeFakeFood from '../../../__test__/fixtures/food'
import makeFakeGroup from '../../../__test__/fixtures/group'
import makeGroupsDb from '../group/groups-db'
import makeFoodsDb from './foods-db'

describe('foods db', () => {
  let foodsDb, group

  beforeAll(async () => {
    const groupsDb = makeGroupsDb({ makeDb })
    const fakeGroup = makeFakeGroup()
    group = await groupsDb.insert(fakeGroup)
  })

  beforeEach(async () => {
    foodsDb = makeFoodsDb({ makeDb })
  })

  it('inserts a food', async () => {
    const food = makeFakeFood({ groupId: group.id })
    const result = await foodsDb.insert(food)

    expect(result).toEqual(food)
  })

  it('lists foods', async () => {
    const inserts = await Promise.all(
      [
        makeFakeFood({ groupId: group.id }),
        makeFakeFood({ groupId: group.id }),
        makeFakeFood({ groupId: group.id })
      ].map(insert => foodsDb.insert(insert))
    )

    const found = await foodsDb.findAll()

    expect.assertions(inserts.length)
    inserts.forEach(insert => expect(found).toContainEqual(insert))
  })

  it('can list available foods only', async () => {
    const inserts = await Promise.all(
      [
        makeFakeFood({ groupId: group.id, available: true }),
        makeFakeFood({ groupId: group.id, available: true }),
        makeFakeFood({ groupId: group.id, available: true }),
        makeFakeFood({ groupId: group.id, available: false }),
        makeFakeFood({ groupId: group.id, available: false })
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
    const food = makeFakeFood({ groupId: group.id })
    await foodsDb.insert(food)

    const found = await foodsDb.findById(food)

    expect(found).toEqual(food)
  })

  it('updates a food', async () => {
    const food = makeFakeFood({ groupId: group.id })
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
    const food = makeFakeFood({ groupId: group.id })
    await foodsDb.insert(food)

    expect(await foodsDb.remove(food)).toBe(1)
  })
})
