import Id from '../Id'

export default function makeFoodsDb ({ makeDb }) {
  return Object.freeze({
    insert,
    findAll,
    findById,
    update,
    remove
  })

  async function insert ({ id = Id.makeId(), ...foodInfo }) {
    const db = await makeDb()
    const result = await db.Food.create({ id, ...foodInfo })
    return result.dataValues
  }

  async function findAll ({ ...query } = {}) {
    const db = await makeDb()
    const result = await db.Food.findAll({ where: { ...query } })
    return result.map(({ dataValues }) => ({
      ...dataValues
    }))
  }

  async function findById ({ id }) {
    const db = await makeDb()
    const result = await db.Food.findByPk(id)
    return result.dataValues
  }

  async function update ({ id, ...foodInfo }) {
    const db = await makeDb()
    const [affectedRows] = await db.Food.update(
      { ...foodInfo },
      { where: { id: id } }
    )
    return affectedRows > 0 ? { id, ...foodInfo } : null
  }

  async function remove ({ id }) {
    const db = await makeDb()
    const [affectedRows] = await db.Food.update(
      { deleted: true },
      { where: { id: id } }
    )
    return affectedRows
  }
}
