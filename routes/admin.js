const express = require('express')
const multer = require('multer')

const router = express.Router()

const ModelServicos = require('../models/servicos')

const upload = multer({
  dest: 'public/uploads/'
})

function verificaLoginAdmin(req, res, next) {
  if(!req.session.estaLogado) {
    res.redirect('/login')
    return
  }
  next()
}

router.use(verificaLoginAdmin)

router.get('/', function(req, res) {
  res.render('admin/dashboard-admin')
})

router.get('/servicos', function(req, res) {
  const obj = {
    servicos: ModelServicos.listaServicos()
  }
  res.render('admin/servicos-admin', obj)
})

router.get('/servicos/criar', function(req, res) {
  res.render('admin/criar-servico')
})

/*
O nome do serviço tem mais de 3 caracteres;
Os campos Nome, Descrição e Preço foram preenchidos;
O campo Descrição tem mais de 10 caracteres.
O campo preço é do tipo numérico.
*/
function validaCadastroServico(req, res, next) {
  if(!req.body.nome || !req.body.descricao || !req.body.valor) {
    res.render('erro-validacao', { mensagemErro: 'Preencha todos os campos' })
    return
  }
  if(req.body.nome.length <= 3) {
    res.render('erro-validacao', { mensagemErro: 'O tamanho do nome deve ser maior do que 3 caracteres' })
    return
  }
  if(req.body.descricao.length <= 10) {
    res.render('erro-validacao', { mensagemErro: 'O tamanho da descrição deve ser maior do que 3 caracteres' })
    return
  }
  if(isNaN(req.body.valor)) {
    res.render('erro-validacao', { mensagemErro: 'O preço não é um número válido' })
    return
  }
  next()
}

router.post('/servicos/criar', upload.single('imagemServico'), validaCadastroServico, function(req, res) {
  req.body.imagem = req.file.filename

  ModelServicos.adicionaServico(req.body)

  res.redirect('/admin/servicos')
})


router.get('/meus-dados', function(req, res) {
  res.render('admin/meus-dados')

})

router.get('/servicos/:idServico/remover', function(req, res) {
  console.log('removendo servico')

  const idServico = req.params.idServico

  ModelServicos.removeServicoViaId(idServico)


  res.redirect('/admin/servicos')
})

router.get('/servicos/:idServico/editar', function(req, res) {
  const idServico = req.params.idServico

  const servico = ModelServicos.buscaServicoViaId(idServico)
  const obj = {
    servico: servico
  }

  res.render('admin/editar-servico', obj)
})

router.post('/servicos/:idServico/editar', function(req, res) {

  const idServico = req.params.idServico
  ModelServicos.alteraServicoViaId(idServico, req.body)

  res.redirect('/admin/servicos')
})

module.exports = router