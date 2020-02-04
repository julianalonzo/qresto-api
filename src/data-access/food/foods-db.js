import Id from '../../entities/Id'

export default function makeFoodsDb ({ makeDb }) {
  return Object.freeze({
    insert,
    findAll,
    findById,
    update,
    remove
  })

  async function insert ({ id = Id.makeId(), ...foodInfo }) {
    const { Food, Image } = await makeDb()
    const food = await Food.create({ id, ...foodInfo }, { include: Image })
    return food ? food.toJSON() : null
  }

  async function findAll ({ ...query } = {}) {
    const { Food, Image } = await makeDb()
    const result = await Food.findAll({ where: { ...query }, include: Image })
    return result.map(item => item.toJSON())
  }

  async function findById ({ id }) {
    const { Food, Image } = await makeDb()
    const result = await Food.findByPk(id, { include: Image })
    return result ? result.toJSON() : null
  }

  async function update ({ id, images, ...foodInfo }) {
    const { Food, Image } = await makeDb()
    const food = await Food.findByPk(id)

    if (food) {
      const updatedFood = await food.update({ ...foodInfo })

      if (images) {
        const updatedImages = await Promise.all(
          images.map(image =>
            Image.upsert(
              { ...image },
              {
                returning: true
              }
            )
          )
        )

        // image[0] points to the Model, while image[1] points to a boolean
        await updatedFood.setImages(updatedImages.map(image => image[0]))
      }

      return {
        id,
        ...foodInfo,
        images
      }
    }

    return null
  }

  async function remove ({ id }) {
    const db = await makeDb()
    const affectedRows = await db.Food.destroy({ where: { id } })
    return affectedRows
  }
}
