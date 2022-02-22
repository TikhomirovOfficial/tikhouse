const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const router = require('./router/routes')

dotenv.config({
    path: `${__dirname}/.env`
})
require('./core/db')

const app = express();

app.use(cors())
app.use('/api', router)

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server run on port', process.env.SERVER_PORT)
})