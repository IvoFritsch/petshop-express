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
  const dados = buscaDadosProduto()
  res.send(dados)
})


function buscaDadosProduto(){
  var termo = 2000000000
  var penultimo = 0, ultimo= 1;
  var numero;

  if(termo<=2)
   numero = termo-1;
  else
   for(var count=3 ; count<=termo ; count++){
    numero = ultimo + penultimo;
    penultimo = ultimo;
    ultimo = numero;
   }

  return {
    nome: 'produto 1',
    valor: 13
  };
}


module.exports = router
