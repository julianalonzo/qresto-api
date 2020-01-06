import Id from '../Id'

export default function makeFoodsDb ({ makeDb }) {
  return Object.freeze({
    insert,
    findAll,
    findById
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

  async function findById (id) {
    const db = await makeDb()
    const result = await db.Food.findByPk(id)
    return result.dataValues
  }
}
