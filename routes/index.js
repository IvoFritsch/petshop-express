const express = require('express');
const router = express.Router();
const { Usuario, Produto } = require('../models')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const obj = { 
    produtos: await Produto.findAll()
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

router.post('/cadastro', async function(req, res, next) {
  if(req.body.nome.length <= 3) {
    res.render('erro-validacao', { mensagemErro: 'O tamanho do nome deve ser maior do que 3 caracteres' })
    return
  }
  if(req.body.senha !== req.body.repeatPassword) {
    res.render('erro-validacao', { mensagemErro: 'As duas senhas não são iguais' })
    return
  }
  if(req.body.senha.length <= 6) {
    res.render('erro-validacao', { mensagemErro: 'O tamanho da deve ser maior do que 6 caracteres' })
    return
  }
  const usuario = await Usuario.findOne({
    where: {
      email: req.body.email
    }
  })
  if(usuario) {
    res.render('erro-validacao', { mensagemErro: 'Já existe um usuário com esse email' })
    return
  }
  await Usuario.create(req.body)

  res.redirect('/login')
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
  try {
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
  } catch (erro) {
    next(erro)
  }
})

module.exports = router;
