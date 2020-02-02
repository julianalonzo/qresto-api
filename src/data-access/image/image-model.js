export default function makeImageModel ({ sequelize, DataTypes }) {
  return sequelize.define(
    'image',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      source: DataTypes.STRING
    },
    { name: { singular: 'image', plural: 'images' } }
  )
}
