const express = require("express");

const router = express.Router()

const { Produto } = require('../models')

router.get('/produtos', async (req, res, next) => {
  const produtos = await Produto.findAll()

  res.send(produtos)
})

router.get('/produtos/:id', async (req, res, next) => {
  const id = req.params.id
  const produto = await Produto.findByPk(id)
  if(!produto) {
    res.status(404).send()
    return
  }
  res.send(produto)
})

router.post('/produtos', async (req, res, next) => {

  const prod = await Produto.create(req.body)

  res.send({
    id: prod.id
  })
})


module.exports = router