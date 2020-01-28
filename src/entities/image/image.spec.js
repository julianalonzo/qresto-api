import makeFakeImage from '../../../__test__/fixtures/image'
import makeImage from './'

describe('image', () => {
  it('can create an id', () => {
    const imageWithoutId = makeFakeImage({ id: undefined })
    const image = makeImage(imageWithoutId)
    expect(() => image.getId()).toBeDefined()
  })

  it('must have a valid source (url)', () => {
    const fakeImageWithInvalidSource = makeFakeImage({ source: 'Hello' })
    expect(() => makeImage(fakeImageWithInvalidSource)).toThrow(
      'Image source is not a valid url'
    )
  })

  it('can create an image', () => {
    const image = makeImage(makeFakeImage())
    expect(image.getSource()).toBe(image.source)
  })
})
