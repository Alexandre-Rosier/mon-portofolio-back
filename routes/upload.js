const express = require('express')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../remoteFR-R2dwild-P3-cubecraft-front/public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/ /g, ''))
  }
})
var upload = multer({ storage: storage })
router.post('/', upload.single('file'), function (req) {
  const { file } = req
  console.log(file)
})

module.exports = router
