module.exports = (connection, DataTypes) => {

  const model = connection.define('Categoria', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(50)
    }
  }, {
    timestamps: false,
    tableName: 'categorias'
  })

  return model
}
