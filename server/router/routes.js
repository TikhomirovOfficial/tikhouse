const Router = require("express").Router;
const uploader = require('../utils/Uploader');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/auth-middleware')
const router = new Router();

router.post('/upload', uploader.single('photo'), UserController.uploadAvatar);
router.post('/register', UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);
router.get('/users', authMiddleware, UserController.getUsers);
router.get('/me', authMiddleware, UserController.getMe);
router.post('/user/activate', UserController.activate)

module.exports = router;