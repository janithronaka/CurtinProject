var express = require('express');
var router = express.Router();

var commentController = require('./comment.controller');

router.get('/all', (req, res) => {
  commentController.getAll().then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.get('/new-count', (req, res) => {
  console.log('request recieved');
  commentController.newComments().then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.post('/', (req, res) => {
  commentController.insert(req.body).then((data) => {
        res.status(data.status).send(data.message);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    })
})

router.put('/', (req, res) => {
  commentController.update(req.body).then((data) => {
        res.status(data.status).send(data.message);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    })
})

router.get('/:id', (req, res) => {
  commentController.get(req.params.id).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.delete('/:id', (req, res) => {
  commentController.delete(req.params.id).then((data) => {
        res.status(data.status).send(data.message);
    }).catch((err) => {
      res.status(err.status).send(err.message);
    })
})

module.exports = router;
