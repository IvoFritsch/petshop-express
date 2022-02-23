const express = require('express')
const multer = require('multer')

const router = express.Router()

const { Servico } = require('../models')

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

router.get('/servicos', async function(req, res) {
  const obj = {
    servicos: await Servico.findAll()
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

router.post('/servicos/criar', upload.single('imagemServico'), validaCadastroServico, async function(req, res) {
  req.body.imagem = req.file.filename

  await Servico.create(req.body)

  res.redirect('/admin/servicos')
})


router.get('/meus-dados', function(req, res) {
  res.render('admin/meus-dados')

})

router.get('/servicos/:idServico/remover', async function(req, res) {
  console.log('removendo servico')

  const idServico = req.params.idServico
  await Servico.destroy({
    where: {
      id: idServico
    }
  })

  res.redirect('/admin/servicos')
})

router.get('/servicos/:idServico/editar', async function(req, res) {
  const idServico = req.params.idServico
  const servico = await Servico.findByPk(idServico)

  if(!servico) {
    res.render('erro-validacao', { mensagemErro: 'Serviço não existe' })
    return
  }

  const obj = {
    servico: servico
  }

  res.render('admin/editar-servico', obj)
})

router.post('/servicos/:idServico/editar', async function(req, res) {

  const idServico = req.params.idServico

  await Servico.update(req.body, {
    where: {
      id: idServico
    }
  })

  res.redirect('/admin/servicos')
})

module.exports = router