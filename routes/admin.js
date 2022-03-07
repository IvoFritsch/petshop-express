const express = require('express')
const multer = require('multer')

const router = express.Router()

const { Produto, Categoria } = require('../models')

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

router.get('/produtos', async function(req, res) {
  const obj = {
    produtos: await Produto.findAll()
  }
  res.render('admin/produtos', obj)
})

router.get('/categorias', async function(req, res) {

  const obj = {
    categorias: await Categoria.findAll()
  }
  res.render('admin/categorias', obj)
})

router.get('/categorias/criar', function(req, res) {
  res.render('admin/criar-categoria')
})

router.get('/categorias/:idCategoria', async function(req, res) {
  const idCategoria = req.params.idCategoria
  const obj = {
    categoria: await Categoria.findByPk(idCategoria, {
      include: {
        model: Produto,
        as: 'produtos'
      }
    })
  }

  res.render('admin/visualizar-categoria', obj)
})

router.get('/meus-favoritos/', async function(req, res) {
  res.render('admin/favoritos')
})

router.get('/produtos/criar', function(req, res) {
  res.render('admin/criar-produto')
})

/*
O nome do produto tem mais de 3 caracteres;
Os campos Nome, Descrição e Preço foram preenchidos;
O campo Descrição tem mais de 10 caracteres.
O campo preço é do tipo numérico.
*/
function validaCadastroProduto(req, res, next) {
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

router.post('/produtos/criar', upload.single('imagemProduto'), validaCadastroProduto, async function(req, res) {
  req.body.imagem = req.file.filename

  await Produto.create(req.body)

  res.redirect('/admin/produtos')
})

router.post('/categorias/criar', async function(req, res) {
  if(req.body.nome.length <= 3) {
    res.render('erro-validacao', { mensagemErro: 'O tamanho do nome deve ser maior do que 3 caracteres' })
    return
  }

  console.log(req.body)
  await Categoria.create(req.body)

  res.redirect('/admin/categorias')
})


router.get('/meus-dados', function(req, res) {
  res.render('admin/meus-dados')

})

router.get('/produtos/:idProduto/remover', async function(req, res) {

  const idProduto = req.params.idProduto
  await Produto.destroy({
    where: {
      id: idProduto
    }
  })

  res.redirect('/admin/produtos')
})

router.get('/produtos/:idProduto/editar', async function(req, res) {
  const idProduto = req.params.idProduto
  const produto = await Produto.findByPk(idProduto, {
    include: {
      model: Categoria,
      as: 'categoria'
    }
  })

  if(!produto) {
    res.render('erro-validacao', { mensagemErro: 'Produto não existe' })
    return
  }

  const obj = {
    produto: produto
  }

  res.render('admin/editar-produto', obj)
})

router.post('/produtos/:idProduto/editar', async function(req, res) {

  const idProduto = req.params.idProduto

  await Produto.update(req.body, {
    where: {
      id: idProduto
    }
  })

  res.redirect('/admin/produtos')
})

module.exports = router