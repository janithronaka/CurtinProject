var express = require('express');
var router = express.Router();

var ReqController = require('./request.controller');

router.get('/all', (req, res) => {
  ReqController.getAll().then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.get('/:id', (req, res) => {
  ReqController.get(req.params.id).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.get("/count/new", (req, res, next) => {
  ReqController.countNewRequests().then((data) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(data.status).send(JSON.stringify(data.message));
  }).catch((err) => {
    console.log(err.message);
    res.status(err.status).send(err.message);
  })
})

router.get('/member/:id', (req, res) => {
  ReqController.getByMemberId(req.params.id).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})



router.put('/', (req, res) => {
  ReqController.update(req.body).then((data) => {
        res.status(data.status).send(data.message);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    })
})


router.post('/', (req, res) => {
  ReqController.insert(req.body).then((data) => {
      res.status(data.status).send(data.message);
  }).catch((err) => {
      res.status(err.status).send(err.message);
  })
})

router.delete('/:id', (req, res) => {
  ReqController.delete(req.params.id).then((data) => {
      res.status(data.status).send(data.message);
  })
})

module.exports = router;
