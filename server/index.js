const express = require('express')
const dotenv = require('dotenv')
const multer = require('multer')
const cors = require('cors')
dotenv.config({
    path: `${__dirname}/.env`
})
require('./core/db')

const app = express();
app.use(cors())
const uploader = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '../public/avatars')
        },
        filename: function (req, file, cb) {
            console.log(file)
            cb(null, `${file.fieldname}_${Date.now()}.${file.originalname.split('.')[1]}`)
        }
    })
})
app.post('/upload', uploader.single('photo'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.json(file.path.replace('..\\public\\', ''))

})
app.post('/signup/auth', (req, res) => {
    console.log(req)
})

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server run on port', process.env.SERVER_PORT)

});