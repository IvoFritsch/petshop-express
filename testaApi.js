const axios = require('axios').default

const idProduto = 4

async function app() {
  console.log('fazendo request 1')
  let response = await axios.get('http://localhost:3000/api/produtos')
  console.log('response 1', response.data.length)
  
  try {
    console.log('fazendo request 2')
    response = await axios.get('http://localhost:3000/api/produtos/' + idProduto)
    console.log('response 2', response.data)

    response = await axios.post('http://localhost:3000/api/produtos', {
      nome: 'Testando AXIOS 2',
      descricao: 'Nosso segundo produto com axios',
      valor: 45 + 30
    })
    console.log('id do produto adicionado:', response.data.id)



  } catch (erro) {
    console.log("Ocorreu um erro:", erro.response.status)
  }

  console.log('saiu')  

}

async function app2() {

  const response = await axios.get('https://viacep.com.br/ws/93510310/json')
  console.log(response.data)

}



app2()
