import Sequelize from 'sequelize'
import makeFoodModel from '../../src/data-access/models/food'

export default async function makeDb () {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    define: {
      timestamps: false
    }
  })

  try {
    await sequelize.authenticate()
    console.log('Connected to the database')
  } catch (dbConnectionError) {
    console.error('Unable to connect to the database', dbConnectionError)
  }

  const FoodModel = makeFoodModel({ sequelize, DataTypes: Sequelize })

  try {
    await sequelize.sync()
    console.log('Database and tables have been synchronized')
  } catch (dbSyncError) {
    console.log('Unable to synchronize database', dbSyncError)
  }

  return Object.freeze({
    Food: FoodModel
  })
}
