var express = require('express');
var formidable = require('formidable')

var router = express.Router();

var PostController = require('./post.controller');
var fs = require('fs');
var path = require('path');

router.get('/:projectId/all', (req, res) => {
    PostController.getAll(req.params.projectId).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.get('/', (req, res) => {
    PostController.getAll().then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})


router.get('/:id', (req, res) => {
    PostController.get(req.params.id).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.message));
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
})

router.post('/', (req, res) => {
    PostController.insert(req.body).then((data) => {
        res.status(data.status).send(data.message);
    }).catch((err) => {
        console.log(err);
        res.status(err.status).send(err.message);
    });
})

router.post('/:projectId/:postId/upload', (req, res) => {
    var projectId = req.params.projectId;
    var postId = req.params.postId;
    var form = new formidable.IncomingForm();
    //var url = req.protocol + '://' + req.get("host");
    var url = "http://localhost:3000"
    var filePath = "";
    var attachments = [];
    var allRWEPermissions = parseInt("0777", 8);
    form.parse(req, function (err, fields, files) {
        // ...
    });
    form.on('fileBegin', function (name, file) {
        //console.log("Path : " + dir);
        var projDir = path.join(__dirname, '/../../attachments/', projectId);
        if (!fs.existsSync(projDir)) {
            fs.mkdirSync(projDir);
            var postDir = path.join(projDir, '/', postId);
            if (!fs.existsSync(postDir)) {
                fs.mkdirSync(postDir);
                filePath = postDir + '/' + file.name;
                var attachment = {
                    fileName: file.name,
                    fileType: file.type,
                    fileLocation: filePath,
                    fileUrl: url + '/attachments/' + projectId + '/' + postId + '/' + file.name
                }
                attachments.push(attachment);
                file.path = filePath
            }
        }
        else {
            var postDir = path.join(projDir, '/', postId);
            if (!fs.existsSync(postDir)) {
                fs.mkdirSync(postDir);
            }
            filePath = postDir + '/' + file.name;
            var attachment = {
                fileName: file.name,
                fileType: file.type,
                fileLocation: filePath,
                fileUrl: url + '/attachments/' + projectId + '/' + postId + '/' + file.name
            }
            attachments.push(attachment);
            file.path = filePath;
        }

    });
    form.on('end', function () {
        var newPost = {
            postId: postId,
            attachments: attachments
        }
        PostController.updateAttachments(newPost).then((data) => {
            res.status(data.status).send(data.message);
        }).catch((err) => {
            console.log(err);
            res.status(err.status).send(err.message);
        })
    });
})

router.put('/:id', (req, res) => {
    PostController.update(req.body).then((data) => {
        res.status(data.status).send(data.message);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    })
})

router.delete('/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    PostController.delete(req.params.id).then((data) => {
        res.status(data.status).send(data.message);
    })
})

module.exports = router;