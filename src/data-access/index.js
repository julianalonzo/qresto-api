import dotenv from 'dotenv'
import Sequelize from 'sequelize'
import { makeFoodModel, makeFoodsDb } from './food'
import { makeImageModel } from './image'

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
const Image = makeImageModel({ sequelize, DataTypes: Sequelize })

Food.hasMany(Image)
Image.belongsTo(Food)

sequelize
  .sync()
  .then(() => {
    console.log('Database synced')
  })
  .catch(e => {
    console.log('Database syncing error', e)
  })

export async function makeDb () {
  try {
    return Object.freeze({
      Food,
      Image
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
