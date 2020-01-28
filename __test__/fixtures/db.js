import Sequelize from 'sequelize'
import { makeFoodModel } from '../../src/data-access/food'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  define: {
    timestamps: false
  },
  logging: false
})

const Food = makeFoodModel({ sequelize, DataTypes: Sequelize })

export default async function makeDb () {
  try {
    await sequelize.sync()

    return Object.freeze({
      Food
    })
  } catch (e) {
    console.error('Unable to connect to the database', e)
  }
}
