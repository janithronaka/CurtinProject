var express = require('express');
var router = express.Router();
const GallerySchema = require("./gallery.model");
const multer = require('multer');
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid type!");
    if (isValid) {
      error = null;
    }
    cb(error, "server/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post("/", multer({storage: storage}).single("image"), (req, res, next) => {
  console.log(req.body);
  const url = req.protocol + '://' + req.get("host");
  const post = new GallerySchema({
    title: req.body.title,
    desc: req.body.desc,
    imagePath: url + "/images/" + req.file.filename,
    added: Date.now()
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Image added successfully",
      imgObj: {
        ...createdPost,
        id: createdPost._id
     }
    });
  });
});

router.get("/", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currPage = +req.query.currpage;
  const query = GallerySchema.find();
  let fetchedImages;
  if (pageSize && currPage) {
    query
    .sort('-added')
    .skip(pageSize * (currPage - 1))
    .limit(pageSize);
  }
  query.then(documents => {
    fetchedImages = documents;
    return GallerySchema.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        images: fetchedImages,
        imgCount: count
    });
  });
});

router.get("/:id", (req, res, next) => {
  GallerySchema.findOne({
      _id: req.params.id
    }).exec().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      images: documents
    });
  });
});

router.delete("/:id", (req, res, next) => {

  GallerySchema.findOne({
    _id: req.params.id
    }).exec().then(documents => {
      var imgPath;
      console.log(documents);
      imgPath = documents.imagePath;
      const fs = require('fs');
      var path =  'server\\images\\' +  imgPath.substring(imgPath.indexOf("images/") + 7);

      console.log(path);
      fs.unlink(path, (err) => {
        if (err){
          console.log('file deletion failed: '+imgPath);
        }
        else{
          console.log('successfully deleted image file '+imgPath);
        }
        GallerySchema.deleteOne({ _id: req.params.id }).then(result => {
          console.log("Image deleted!");
          res.status(200).json({ message: "Image deleted!" });
        });
      })
  })
  .catch((error) => {
    console.log('failed delete: '+ error.message);
    res.status(500).json({ message: "Deletion failed!" });
  });
});

module.exports = router;
