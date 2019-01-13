var express = require('express');
var router = express.Router();

var ExcoController = require('./exco.controller');

router.get('/all', (req, res) => {
  ExcoController.getAll().then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.get('/date/:date_from/:date_to', (req, res) => {
  ExcoController.get(req.params.date_from, req.params.date_to).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.get('/member/:id', (req, res) => {
  ExcoController.getById(req.params.id).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})


router.get('/memberById/:id', (req, res) => {
  ExcoController.getByMemId(req.params.id).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})


router.put('/', (req, res) => {
  ExcoController.update(req.body).then((data) => {
        res.status(data.status).send(data.message);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    })
})


router.post('/', (req, res) => {
  ExcoController.insert(req.body).then((data) => {
      res.status(data.status).send(data.message);
  }).catch((err) => {
      res.status(err.status).send(err.message);
  })
})

router.delete('/:id', (req, res) => {
  ExcoController.delete(req.params.id).then((data) => {
      res.status(data.status).send(data.message);
  })
})

module.exports = router;
