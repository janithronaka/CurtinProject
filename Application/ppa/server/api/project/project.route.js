var express = require('express');
var router = express.Router();

var ProjectController = require('./project.controller');

router.get('/all/:filter', (req, res) => {
    ProjectController.getAll(req.params.filter).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.get('/', (req, res) => {
    ProjectController.getAll().then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.get('/latest', (req, res) => {
    ProjectController.getNextProject().then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.get('/:id', (req, res) => {
    ProjectController.get(req.params.id).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.post('/', (req, res) => {
    ProjectController.insert(req.body).then((data) => {
        res.status(data.status).send(data.message);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    })
})

router.put('/:id', (req, res) => {
    console.log(req.body);
    ProjectController.update(req.body).then((data) => {
        res.status(data.status).send(data.message);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    })
})

router.delete('/:id', (req, res) => {
    ProjectController.delete(req.params.id).then((data) => {
        res.status(data.status).send(data.message);
    })
})

module.exports = router;