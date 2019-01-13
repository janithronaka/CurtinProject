var express = require('express');
var router = express.Router();

var LoginController = require('./login.controller');

router.get('/all', (req, res) => {
  LoginController.getAll().then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.get('/:id', (req, res) => {
  LoginController.get(req.params.id).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.put('/:id', (req, res) => {
  LoginController.update(req.body).then((data) => {
        res.status(data.status).send(data.message);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    })
})


router.post('/', (req, res) => {
  LoginController.insert(req.body).then((data) => {
      res.status(data.status).send(data.message);
  }).catch((err) => {
      res.status(err.status).send(err.message);
  })
})

router.delete('/:id', (req, res) => {
  LoginController.delete(req.params.id).then((data) => {
      res.status(data.status).send(data.message);
  })
})

module.exports = router;
