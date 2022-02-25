const Router = require("express").Router;
const uploader = require('../utils/Uploader');
const UserController = require('../controllers/UserController');


const router = new Router();

router.post('/upload', uploader.single('photo'), UserController.uploadAvatar);
router.post('/register', UserController.registration);

module.exports = router;