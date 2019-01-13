var express = require('express');
var router = express.Router();

var MemberController = require('./membership.controller');

router.get('/all', (req, res) => {
  MemberController.getAll().then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.get('/:id', (req, res) => {
  MemberController.get(req.params.id).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.get('/all/dir', (req, res) => {
  const pageSize = +req.query.pagesize;
  const currPage = +req.query.currpage;
  var filter = req.query.filter;
  var value = req.query.value;
  MemberController.getAllDir(pageSize, currPage, filter, value).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.get("/count/profiles", (req, res, next) => {
  MemberController.countMembershipProfiles().then((data) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(data.status).send(JSON.stringify(data.message));
  }).catch((err) => {
    console.log(err.message);
    res.status(err.status).send(err.message);
  })
})

router.get("/count/requests", (req, res, next) => {
  MemberController.countMembershipRequests().then((data) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(data.status).send(JSON.stringify(data.message));
  }).catch((err) => {
    console.log(err.message);
    res.status(err.status).send(err.message);
  })
})

router.get('/member/:id', (req, res) => {
  console.log('GET MEMBERRR');
  MemberController.getByMemberId(req.params.id).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.get('/memberobj/:id', (req, res) => {
  console.log('GET MEMBERRR OBJ');
  MemberController.getByObjId(req.params.id).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.post('/', (req, res) => {
  MemberController.insert(req.body).then((data) => {
        res.status(data.status).send(data.message);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    })
})

router.put('/', (req, res) => {
  MemberController.update(req.body).then((data) => {
        res.status(data.status).send(data.message);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    })
})

router.delete('/:id', (req, res) => {
  MemberController.delete(req.params.id).then((data) => {
        res.status(data.status).send(data.message);
    })
})

module.exports = router;
