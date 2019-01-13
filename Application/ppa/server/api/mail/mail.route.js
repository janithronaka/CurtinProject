var express = require('express');
var router = express.Router();

var Services = require('../util/services');

router.post('/', (req, res) => {
    Services.sendMail(req.body.subject, req.body.body, req.body.to, req.body.from).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
});

module.exports = router;