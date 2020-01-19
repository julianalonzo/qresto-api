import Sequelize from 'sequelize'
import { makeFoodModel } from '../../src/data-access/food'
import { makeGroupModel } from '../../src/data-access/group'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  define: {
    timestamps: false
  },
  logging: false
})

const Group = makeGroupModel({ sequelize, DataTypes: Sequelize })
const Food = makeFoodModel({ sequelize, DataTypes: Sequelize })

export default async function makeDb () {
  try {
    await sequelize.sync()

    return Object.freeze({
      Group,
      Food
    })
  } catch (e) {
    console.error('Unable to connect to the database', e)
  }
}
