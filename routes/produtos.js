const express = require('express')
const router = express.Router()
const {Produto} = require('../models')

router.get('/', async function (req, res) {
  const obj = { 
    produtos: await Produto.findAll()
  }
  res.render('produtos', obj)
})

module.exports = router
