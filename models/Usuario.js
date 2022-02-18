module.exports = (connection, DataTypes) => {

  const model = connection.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(100)
    },
    email: {
      type: DataTypes.STRING(100)
    },
    senha: {
      type: DataTypes.STRING(100)
    }
  }, {
    timestamps: true,
    tableName: 'usuarios'
  })
  model.sync({ alter: true })
  return model
}
