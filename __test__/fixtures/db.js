import Sequelize from 'sequelize'
import makeFoodModel from '../../src/data-access/models/food'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  define: {
    timestamps: false
  },
  logging: false
})

const FoodModel = makeFoodModel({ sequelize, DataTypes: Sequelize })

export default async function makeDb () {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    return Object.freeze({
      Food: FoodModel
    })
  } catch (e) {
    console.error('Unable to connect to the database', e)
  }
}
