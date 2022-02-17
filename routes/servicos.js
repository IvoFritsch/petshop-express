const express = require('express')
const router = express.Router()
const ModelServicos = require('../models/servicos')

router.get('/', function (req, res) {
  const obj = { 
    servicos: ModelServicos.listaServicos()
  }
  res.render('servicos', obj)
})

router.get('/:idServico', function (req, res) {
  const { idServico } = req.params

  const servico = ModelServicos.buscaServicoViaId(idServico)
  res.send(servico)
})

module.exports = router
