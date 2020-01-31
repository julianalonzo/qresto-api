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

  it('can have no images', () => {
    const fakeFood = makeFakeFood({ images: undefined })
    const food = makeFood(fakeFood)
    expect(food.getImages()).toEqual([])
  })

  it('images must be an array when defined', () => {
    const fakeFood = makeFakeFood({ images: 'Hello' })
    expect(() => makeFood(fakeFood)).toThrow('Food images must be an array')
  })

  it('does not accept invalid images when defined', () => {
    const fakeFood = makeFakeFood()
    expect(() =>
      makeFood({
        ...fakeFood,
        images: fakeFood.images.map(image => ({
          ...image,
          source: 'invalid url'
        }))
      })
    ).toThrow('Image source is not a valid url')
  })
})
