import makeFakeFood from '../../../__test__/fixtures/food'
import makeFood from './'

describe('food', () => {
  it('must have a name', () => {
    const fakeFoodWithoutName = makeFakeFood({ name: null })
    expect(() => makeFood(fakeFoodWithoutName)).toThrow('Food must have a name')
  })

  it('must have a valid price', () => {
    const fakeFoodWithUndefinedPrice = makeFakeFood({ price: undefined })
    const foodWithUndefinedPrice = makeFood(fakeFoodWithUndefinedPrice)
    expect(foodWithUndefinedPrice.getPrice()).toBe(0)

    const fakeFoodWithNaNPrice = makeFakeFood({ price: 'Hi' })
    expect(() => makeFood(fakeFoodWithNaNPrice)).toThrow(
      'Food must have a numerical price'
    )

    const fakeFoodWithNegativePrice = makeFakeFood({ price: -50 })
    expect(() => makeFood(fakeFoodWithNegativePrice)).toThrow(
      'Food cannot have a negative price'
    )

    const fakeFreeFood = makeFakeFood({ price: 0 })
    expect(() => makeFood(fakeFreeFood)).not.toThrow()
  })

  it('can have an id', () => {
    const fakeFoodWithInvalidId = makeFakeFood({ id: 'invalid id' })
    expect(() => makeFood(fakeFoodWithInvalidId)).toThrow(
      'Food must have a valid id'
    )
    const fakeFoodWithoutId = makeFakeFood({ id: undefined })
    expect(() => makeFood(fakeFoodWithoutId)).not.toThrow()
  })

  it('can create an id', () => {
    const fakeFoodWithoutId = makeFakeFood({ id: undefined })
    const food = makeFood(fakeFoodWithoutId)
    expect(() => food.getId()).toBeDefined()
  })

  it('can be available', () => {
    const fakeAvailableFood = makeFakeFood({ available: true })
    const food = makeFood(fakeAvailableFood)
    expect(food.isAvailable()).toBe(true)
    food.markUnavailable()
    expect(food.isAvailable()).toBe(false)
  })

  it('can be unavailable', () => {
    const fakeUnavailableFood = makeFakeFood({ available: false })
    const food = makeFood(fakeUnavailableFood)
    expect(food.isAvailable()).toBe(false)
    food.markAvailable()
    expect(food.isAvailable()).toBe(true)
  })

  it('must have a valid group id', () => {
    const fakeFoodWithoutRestaurant = makeFakeFood({ groupId: undefined })
    expect(() => makeFood(fakeFoodWithoutRestaurant)).toThrow(
      'Food must have a valid group id'
    )

    const fakeFoodWithInvalidRestaurant = makeFakeFood({
      groupId: 'invalid id'
    })
    expect(() => makeFood(fakeFoodWithInvalidRestaurant)).toThrow(
      'Food must have a valid group id'
    )
  })
})
