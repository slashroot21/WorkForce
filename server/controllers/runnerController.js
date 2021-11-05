import express from 'express';
import asyncHandler from 'express-async-handler'
import generateToken from '../util/token.js'
import googleauthlibrary from 'google-auth-library';

import Runner from '../models/runnerModel.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from './handlerFactory.js';

const { OAuth2Client } = googleauthlibrary;
const client = new OAuth2Client(process.env.G_CLIENT_ID)

const router = express.Router();

export const googleLogin = asyncHandler(async (req, res) => {
    const { tokenId } = req.body;

    client.verifyIdToken({ idToken: tokenId, audience: process.env.G_CLIENT_ID }).then(response => {
        console.log(response.payload);
        const { email_verified, name, email, picture } = response.payload;
        if (email_verified) {
            Runner.findOne({ email }).exec((err, runner) => {
                if (err) {
                    return res.status(400).json({
                        error: "Something went wrong...",
                        message: err.message
                    });
                } else {
                    if (runner) {
                        const token = generateToken(runner._id);
                        const { _id, name, email } = runner;

                        res.json({
                            token,
                            runner: { _id, name, email }
                        })
                    } else {
                        let password = email + process.env.JWT_SIGNIN_KEY;
                        let newrunner = new Runner({ name, email, password, image: picture });
                        newrunner.save((err, data) => {
                            if (err) {
                                console.log("error in newrunner.save");
                                return res.status(400).json({
                                    error: "Something went wrong...",
                                    message: err.message
                                });
                            }
                            console.log("passed newrunner.save");
                            const token = generateToken(data._id);
                            const { _id, name, email } = newrunner;

                            res.json({
                                token,
                                runner: { _id, name, email }
                            })
                        })
                    }
                }
            })
        }

        console.log(res.payload);
    })
})

export const getRunners = getAll(Runner);
export const createRunner = createOne(Runner);
export const getRunner = getOne(Runner, { path: 'reviews' });
export const updateRunner = updateOne(Runner);
export const deleteRunner = deleteOne(Runner);

export default router;