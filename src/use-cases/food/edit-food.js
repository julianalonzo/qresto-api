import makeFood from '../../entities/food'

export default function makeEditFood ({ foodsDb }) {
  return async function editFood ({ id, ...modifiedFields } = {}) {
    if (!id) {
      throw new Error('Food id is required')
    }

    const existing = await foodsDb.findById({ id })
    if (!existing) {
      throw new RangeError('Food is not found')
    }

    const modifiedFood = makeFood({ id, ...existing, ...modifiedFields })

    const updatedFood = await foodsDb.update({
      id: modifiedFood.getId(),
      name: modifiedFood.getName(),
      description: modifiedFood.getDescription(),
      price: modifiedFood.getPrice(),
      available: modifiedFood.isAvailable()
    })

    return { ...existing, ...updatedFood }
  }
}
