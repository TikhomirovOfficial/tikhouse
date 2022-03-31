const Router = require("express").Router;
const uploader = require('../utils/Uploader');
const UserController = require('../controllers/UserController');
const router = new Router();

router.post('/upload', uploader.single('photo'), UserController.uploadAvatar);
router.post('/register', UserController.registration);
router.post('/login', UserController.login);
router.post('/user/activate', UserController.activate)

module.exports = router;