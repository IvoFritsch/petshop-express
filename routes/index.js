const express = require('express');
const router = express.Router();
const { Usuario, Servico } = require('../models')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const obj = { 
    servicos: await Servico.findAll()
  }
  res.render('index', obj);
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

router.get('/logout', function(req, res, next) {
  req.session.destroy()
  res.redirect('/')
})

router.post('/login', async function(req, res, next) {
  const usuarioLogin = await Usuario.findOne({
    where: {
      email: req.body.email
    }
  })
  if(usuarioLogin && usuarioLogin.senha == req.body.senha) {
    req.session.estaLogado = true
    req.session.usuarioLogado = usuarioLogin
    res.redirect('/admin')
  } else {
    res.render('erro-validacao', { mensagemErro: 'Senha inválida' })
  }
})

module.exports = router;
