import dotenv from 'dotenv'
import Sequelize from 'sequelize'
import { makeFoodModel, makeFoodsDb } from './food'

dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    define: {
      timestamps: false
    },
    logging: false
  }
)

const Food = makeFoodModel({ sequelize, DataTypes: Sequelize })

export async function makeDb () {
  try {
    await sequelize.sync()

    return Object.freeze({
      Food
    })
  } catch (e) {
    console.error('Unable to connect to the database', e)
  }
}

const foodsDb = makeFoodsDb({ makeDb })

const db = Object.freeze({
  foodsDb: foodsDb
})

export default db
export { foodsDb }
