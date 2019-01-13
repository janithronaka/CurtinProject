var express = require('express');
var router = express.Router();

var TaskController = require('./task.controller');

router.get('/:projectId/all', (req, res) => {
    TaskController.getAllTasks(req.params.projectId).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.get('/', (req, res) => {
    TaskController.getAll().then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.get('/latest', (req, res) => {
    TaskController.getNextTask().then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.get('/:id', (req, res) => {
    TaskController.get(req.params.id).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.post('/', (req, res) => {
    TaskController.insert(req.body).then((data) => {
        res.status(data.status).send(data.message);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    })
})

router.put('/:id', (req, res) => {
    TaskController.update(req.body).then((data) => {
        res.status(data.status).send(data.message);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    })
})

router.delete('/:projectId/:id', (req, res) => {
    TaskController.delete(req.params.projectId, req.params.id).then((data) => {
        res.status(data.status).send(data.message);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    })
})

module.exports = router;