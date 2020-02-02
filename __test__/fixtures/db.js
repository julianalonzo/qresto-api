import Sequelize from 'sequelize'
import { makeFoodModel } from '../../src/data-access/food'
import { makeImageModel } from '../../src/data-access/image'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  define: {
    timestamps: false
  },
  logging: false
})

const Food = makeFoodModel({ sequelize, DataTypes: Sequelize })
const Image = makeImageModel({ sequelize, DataTypes: Sequelize })

Food.hasMany(Image)
Image.belongsTo(Food)

export default async function makeDb () {
  try {
    await sequelize.sync()

    return Object.freeze({
      Food,
      Image
    })
  } catch (e) {
    console.error('Unable to connect to the database', e)
  }
}

export async function destroyDb () {
  await sequelize.sync({ force: true })
}
