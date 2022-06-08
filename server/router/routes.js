const Router = require("express").Router;
const uploader = require('../utils/Uploader');
const UserController = require('../controllers/UserController');
const RoomController = require('../controllers/RoomController');
const authMiddleware = require('../middlewares/auth-middleware');
const router = new Router();

router.post('/upload', uploader.single('photo'), UserController.uploadAvatar);
router.post('/register', UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.post('/refresh', UserController.refresh);
router.post('/user/activate', UserController.activate)

router.get('/users', authMiddleware, UserController.getUsers);
router.get('/me', authMiddleware, UserController.getMe);

router.get('/rooms', RoomController.index)
router.post('/rooms', RoomController.store)
router.get('/rooms/:id', RoomController.show)
router.delete('/rooms/:id', RoomController.destroy)

module.exports = router;