const { uuid } = require('uuidv4')

const servicos = []

function listaServicos() {
  return servicos
}

function buscaServicoViaId(id) {
  const servico = servicos.find(function (item) {
    return item.id == id
  })
  return servico
}

function adicionaServico(servico) {
  servico.id = uuid()
  servicos.push(servico)
}

function buscaIndexViaId(id) {
  const index = servicos.findIndex(function (item) {
    return item.id == id
  })
  return index
}

function removeServicoViaId(id) {
  const index = buscaIndexViaId(id)
  if(index == -1) {
    return
  }
  servicos.splice(index, 1)
}

function alteraServicoViaId(id, novosDados) {
  const index = buscaIndexViaId(id)
  if(index == -1) {
    return
  }
  servicos[index] = { ...servicos[index], ...novosDados }
}

module.exports.listaServicos = listaServicos
module.exports.buscaServicoViaId = buscaServicoViaId
module.exports.adicionaServico = adicionaServico
module.exports.removeServicoViaId = removeServicoViaId
module.exports.alteraServicoViaId = alteraServicoViaId
