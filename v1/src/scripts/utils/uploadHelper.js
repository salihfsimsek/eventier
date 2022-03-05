const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('./v1/src/uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

module.exports = { upload }