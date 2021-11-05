import express from 'express'

import Task from '../models/taskModel.js'
import { getAll, getOne, createOne, updateOne, deleteOne } from './handlerFactory.js';

const router = express.Router();

export const getTasks = getAll(Task);
export const createTask = createOne(Task);
export const getTask = getOne(Task);
export const updateTask = updateOne(Task);
export const deleteTask = deleteOne(Task);


export default router;