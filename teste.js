const { Produto } = require('./models')

const Inserir = [
  {
    "imagem": "7b475d624a8f8260effa5697dcc88915",
    "nome": "Bebedouro Inox",
    "descricao": "Bebedouro simples",
    "valor": 89
  },
  {
    "imagem": "c9cb0b9731c391f3eca71db7116024ce",
    "nome": "Bola gelada",
    "descricao": "Uma bolinha de gel para colocar no freezer",
    "valor": 25
  },
  {
    "imagem": "613812e26b6a34e5640c13f06b828490",
    "nome": "Fonte bebedouro",
    "descricao": "Um bebedouro com água corrente",
    "valor": 110
  },
  {
    "imagem": "1fcf978d400da66f8bae58b6d4916668",
    "nome": "Frisbee plástico",
    "descricao": "Um frisbee simples de plástico",
    "valor": 19
  },
  {
    "imagem": "b8d8bdf69cf4f5dd0fafb4f94a94413e",
    "nome": "Ração fórmula natural",
    "descricao": "Ração da marca Fórmula Natural",
    "valor": 60
  },
  {
    "imagem": "1f22ec60dd840553513f9d68176802d0",
    "nome": "Ração Nutrilus",
    "descricao": "Ração simples da marca Nutrilus",
    "valor": 65
  },
  {
    "imagem": "7a74b37cf635e8050c97fec09e99d799",
    "nome": "Ração True",
    "descricao": "Ração da marca True",
    "valor": 49
  },
  {
    "imagem": "5b9a1863992e1ed6d6262c18591affd1",
    "nome": "Sorvete canino",
    "descricao": "Um sorvete para seu cão",
    "valor": 55
  }
]

async function app() {
  for(const p of Inserir){
    await Produto.create(p)
  }
}

app()