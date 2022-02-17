var express = require('express');
var router = express.Router();
var ModelUsuarios = require('../models/usuarios')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

const middlewareSobre = function(req, res, next) {
  console.log('rodando middleware do /sobre')
  next()
}

router.get('/sobre', middlewareSobre, function(req, res, next) {
  console.log('rodando controller')
  res.render('sobre')
})

router.get('/cadastro', function(req, res, next) {
  res.render('cadastro')
})

router.get('/contato', function(req, res, next) {
  res.render('contato')
})

router.get('/login', function(req, res, next) {
  res.render('login')
})

router.post('/login', function(req, res, next) {
  const usuarioLogin = ModelUsuarios.buscaUsuarioViaEmail(req.body.email)
  if(usuarioLogin.senha == req.body.senha) {
    req.session.estaLogado = true
    req.session.nomeUsuario = usuarioLogin.nome
    res.redirect('/admin')
  } else {
    res.render('erro-validacao', { mensagemErro: 'Senha inválida' })
  }
})

module.exports = router;
