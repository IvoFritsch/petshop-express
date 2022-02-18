module.exports = (connection, DataTypes) => {

  const model = connection.define('Servico', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    imagem: {
      type: DataTypes.STRING(100)
    },
    nome: {
      type: DataTypes.STRING(50)
    },
    descricao: {
      type: DataTypes.STRING(300)
    },
    valor: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: true,
    tableName: 'servicos'
  })
  model.sync({ alter: true })
  return model
}
