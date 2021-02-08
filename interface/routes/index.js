var express = require('express');
var router = express.Router();
var axios = require('axios')

router.post('/adicionar_equipa', function(req, res, next) {

  console.log(req.body)
  
  axios.post('http://localhost:3000/api/teams?token=' + req.cookies.token, req.body)
    .then(dados => {
      console.log(dados.data)
      res.redirect('/')
    })
    .catch(e => res.render('error', {error: e}));
  
});

router.post('/adicionar_membro/:id', function(req, res, next) {

  var obj={id:req.body.id,
          name:req.body.name,
          course:req.body.course
    }

  
  console.log(obj)
  axios.post('http://localhost:3000/api/teams/'+req.params.id+'/members?token=' + req.cookies.token, obj)
    .then(dados => {
      res.redirect('/')
    })
    .catch(e => res.render('error', {error: e}))
  
});


router.get('/adicionar_equipa', function(req, res, next) {
  res.render('adicionar_equipa')
});

router.get('/adicionar_membro/:id', function(req, res, next) {
  res.render('adicionar_membro', {id:req.params.id})
});

router.get('/:id' , function(req, res, next) {
  axios.get('http://localhost:3000/api/teams/'+req.params.id+ '?token='+ req.cookies.token)
    .then(dados => {
      console.log(dados.data)
      res.render('equipa', {dados: dados.data})
    })
    .catch(e => res.render('error', {error: e}));
});

/* GET home page. */
router.get('/', function(req, res, next) {

  axios.get('http://localhost:3000/api/teams/?token=' + req.cookies.token)
    .then(dados => {
      console.log(dados.data)
      res.render('index', {dados: dados.data})
    })
    .catch(e => {
      if(e.response.data.message=="Failed to authenticate token.")
      {
        res.redirect('/')
      }
      else
      {
        res.render('error', {error: e})
      }
    });
});

router.get('/eliminar/:id',function(req, res, next) {
    axios.delete('http://localhost:3000/api/teams/'+req.params.id+'?token=' + req.cookies.token)
      .then(dados => {
        console.log(dados.data)
        res.redirect('/')
      })
      .catch(e => res.render('error', {error: e}));
  });



module.exports = router;
