export default function makeGroupModel ({ sequelize, DataTypes }) {
  return sequelize.define('group', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: '',
      trim: true
    },
    restaurantId: DataTypes.UUID
  })
}
