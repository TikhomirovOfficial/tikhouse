const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const router = require('./router/routes')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

dotenv.config({
    path: `${__dirname}/.env`
})
require('./core/db')

const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use(cookieParser())
app.use('/api', router)

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server run on port', process.env.SERVER_PORT)
})