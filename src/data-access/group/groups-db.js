import Id from '../../entities/Id'

export default function makeGroupsDb ({ makeDb }) {
  return Object.freeze({
    insert,
    findAll,
    findById,
    update,
    remove
  })

  async function insert ({ id = Id.makeId(), ...groupInfo }) {
    const db = await makeDb()
    const result = await db.Group.create({ id, ...groupInfo })
    return result ? result.dataValues : null
  }

  async function findAll ({ ...query } = {}) {
    const db = await makeDb()
    const result = await db.Group.findAll({ where: { ...query } })
    return result.map(({ dataValues }) => ({
      ...dataValues
    }))
  }

  async function findById ({ id }) {
    const db = await makeDb()
    const result = await db.Group.findByPk(id)
    return result ? result.dataValues : null
  }

  async function update ({ id, ...groupInfo }) {
    const db = await makeDb()
    const [affectedRows] = await db.Group.update(
      { ...groupInfo },
      { where: { id: id } }
    )
    return affectedRows > 0 ? { id, ...groupInfo } : null
  }

  async function remove ({ id }) {
    const db = await makeDb()
    const affectedRows = await db.Group.destroy({ where: { id } })
    return affectedRows
  }
}
