import express from 'express'
import {
    getUsers, deleteUser, getUser,
    // createUser,
} from '../controllers/userController.js'
import { signup, login } from './../controllers/authController.js';
import { protect } from './../controllers/authController.js'

const router = express.Router()

router.post('/signup', signup);
router.post('/login', login);

router.use(protect);

router.route('/')
    .get(getUsers)
// .post(createUser);

router
    .route('/:id')
    .delete(deleteUser)
    .get(getUser)

export default router
