const express = require('express')
const router = express.Router()

const pets = ['Cachorro', 'Gato', 'Cavalo', 'Passarinho', 'Coelho']



router.get('/', function (req, res){

  res.send(pets)
})

router.get('/:numeroPet', function retornaPet2(req, res) {

  res.send(pets[req.params.numeroPet])
})

module.exports = router