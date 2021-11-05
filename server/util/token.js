import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SIGNIN_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

export default generateToken