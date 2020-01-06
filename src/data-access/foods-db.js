import Id from '../Id'

export default function makeFoodsDb ({ makeDb }) {
  return Object.freeze({
    insert
  })

  async function insert ({ id = Id.makeId(), ...foodInfo }) {
    const db = await makeDb()
    const result = await db.Food.create({ id, ...foodInfo })
    return result.dataValues
  }
}
