const express = require('express')
const router = express.Router()
const {Produto} = require('../models')

router.get('/', async function (req, res) {
  const obj = { 
    produtos: await Produto.findAll()
  }
  res.render('produtos', obj)
})

router.get('/:idProduto', async function (req, res) {
  const { idProduto } = req.params

  const produto = await Produto.findByPk(idProduto)
  res.send(produto)
})

module.exports = router
