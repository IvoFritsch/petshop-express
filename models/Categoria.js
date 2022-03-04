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

  model.associate = models => {
    model.hasMany(models.Produto, {
      foreignKey: 'categoria_id',
      as: 'produtos'
    })

    model.sync({ alter: true })
  }

  return model
}
