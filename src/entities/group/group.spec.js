import makeFakeGroup from '../../../__test__/fixtures/group'
import makeGroup from './'

describe('group', () => {
  it('must have a name', () => {
    const fakeGroupWithoutName = makeFakeGroup({ name: null })
    expect(() => makeGroup(fakeGroupWithoutName)).toThrow(
      'Group must have a name'
    )

    const fakeGroupWithBlankName = makeFakeGroup({ name: '    ' })
    expect(() => makeGroup(fakeGroupWithBlankName)).toThrow(
      'Group must have a name'
    )
  })

  it('must have a valid restaurant id', () => {
    const fakeGroupWithoutRestaurantId = makeFakeGroup({
      restaurantId: undefined
    })
    expect(() => makeGroup(fakeGroupWithoutRestaurantId)).toThrow(
      'Group must have a valid restaurant id'
    )

    const fakeGroupWithInvalidRestaurantId = makeFakeGroup({
      restaurantId: 'invalid id'
    })
    expect(() => makeGroup(fakeGroupWithInvalidRestaurantId)).toThrow(
      'Group must have a valid restaurant id'
    )
  })
})
