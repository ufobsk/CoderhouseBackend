import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    const token = jwt.sign({ user }, "coderhouse123", { expiresIn: '12h'})
    return token
}

console.log(generateToken())