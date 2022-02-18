const { Servico } = require('./models')

async function app() {
  // const novoServico = await Servico.create({
  //   imagem: '213413245115432151',
  //   nome: "Banho",
  //   descricao: "Um banho",
  //   valor: 40
  // })
  // console.log('id do servico criado:' + novoServico.id)
  const servico = await Servico.findByPk(1)
  console.log('nome do servico: '+servico.nome)
}

app()