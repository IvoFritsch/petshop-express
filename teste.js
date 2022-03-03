const { Produto } = require('./models')

async function app() {
  // const novoProduto = await Produto.create({
  //   imagem: '213413245115432151',
  //   nome: "Banho",
  //   descricao: "Um banho",
  //   valor: 40
  // })
  // console.log('id do produto criado:' + novoProduto.id)
  const produto = await Produto.findByPk(1)
  console.log('nome do produto: '+produto.nome)
}

app()