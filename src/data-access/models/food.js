export default function makeFoodModel ({ sequelize, DataTypes }) {
  return sequelize.define('food', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    description: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    restaurantId: DataTypes.UUID
  })
}
