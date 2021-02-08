var express = require('express');
var router = express.Router();
var Equipa = require('../controllers/equipa')
var jwt = require('jsonwebtoken')

router.get('/api/token', function(req,res){
  var sub = "Exame"
  var data = "dataDoSistema"
  const token = jwt.sign({sub,data}, "DAW-PRI-2020-recurso",{
      expiresIn: 86400 // expires in 24h
    });
    return res.status(200).json({ token: token });
  }
)

router.get('/api/teams/:id', function(req, res, next) {
  Equipa.consultar(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

router.get('/api/teams', function(req, res, next) {
  Equipa.listar()
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

router.get('/api/teams/:id/members/:idMember', function(req, res, next) {
  Equipa.consultar_membro(req.params.id,req.params.idMember)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});


router.delete('/api/teams/:id', (req,res) => {
  Equipa.remove(req.params.id)
    .then(data => {
      console.log(data)
      if(data.nModified == 0)
        res.status(200).json({message: false})
      else
      res.status(200).json({message: true})
    })
    .catch(e => res.status(404).jsonp({message: e}))
})


router.post('/api/teams/:id/members', function(req, res, next) {
  Equipa.inserir_membro(req.params.id,req.body)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

router.post('/api/teams', function(req, res, next) {
  console.log(req.body)
  Equipa.inserir_equipa(req.body)
    .then(dados =>{
        res.status(200).jsonp(dados)
      })
    .catch(e => res.status(500).jsonp({error: e}))
});

module.exports = router;
