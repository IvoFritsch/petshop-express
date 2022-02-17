
const usuarios = [{
  email: 'averbeck.nutri@hotmail.com',
  senha: '123123',
  nome: 'Ingrid'
}]

function buscaUsuarioViaEmail(email) {
  const usuario = usuarios.find(function (item) {
    return item.email == email
  })
  return usuario
}

module.exports.buscaUsuarioViaEmail = buscaUsuarioViaEmail