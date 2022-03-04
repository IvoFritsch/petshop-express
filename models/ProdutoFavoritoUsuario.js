module.exports = (connection, DataTypes) => {

  const model = connection.define('ProdutoFavoritoUsuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    produto_id: DataTypes.INTEGER,
    usuario_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'produto_favorito_usuario'
  })

  model.sync({ alter: true })

  return model
}
