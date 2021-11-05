import express from 'express';
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/TaskController.js';
import { protect } from './../controllers/authController.js'
const router = express.Router();

router.route('/')
    .get(getTasks)
    .post(protect, createTask);

router.route('/:id')
    .get(getTask)
    .patch(protect, updateTask)
    .delete(protect, deleteTask);

export default router;