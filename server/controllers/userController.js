import express from 'express'
import googleauthlibrary from 'google-auth-library'
import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'
import { getAll, getOne, createOne, updateOne, deleteOne } from './handlerFactory.js';

const { OAuth2Client } = googleauthlibrary;
const client = new OAuth2Client(process.env.G_CLIENT_ID)

const router = express.Router();

// export const createUser = asyncHandler(async (req, res) => {
//     const { tokenId } = req.body;

//     client.verifyIdToken({ idToken: tokenId, audience: process.env.G_CLIENT_ID }).then(response => {
//         console.log(response.payload);
//         const { email_verified, name, email, picture } = response.payload;
//         if (email_verified) {
//             User.findOne({ email }).exec((err, user) => {
//                 if (err) {
//                     return res.status(400).json({
//                         error: "Something went wrong...",
//                         message: err.message
//                     });
//                 } else {
//                     if (user) {
//                         const token = generateToken(user._id);
//                         const { _id, name, email } = user;

//                         res.json({
//                             token,
//                             user: { _id, name, email }
//                         })
//                     } else {
//                         let password = email + process.env.JWT_SIGNIN_KEY;
//                         let newUser = new User({ name, email, password, image: picture });
//                         newUser.save((err, data) => {
//                             if (err) {
//                                 console.log("error in newuser.save");
//                                 return res.status(400).json({
//                                     error: "Something went wrong...",
//                                     message: err.message
//                                 });
//                             }
//                             console.log("passed newuser.save");
//                             const token = generateToken(data._id);
//                             const { _id, name, email } = newUser;

//                             res.json({
//                                 token,
//                                 user: { _id, name, email }
//                             })
//                         })
//                     }
//                 }
//             })
//         }

//         console.log(res.payload);
//     })
// })

export const getUsers = getAll(User);
export const getUser = getOne(User);
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);

export default router;