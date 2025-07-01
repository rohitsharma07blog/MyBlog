import jwt from 'jsonwebtoken';
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;
const userName = process.env.USER_NAME;
const password = process.env.PASSWORD;

export default async (req, context) =>{
    if(req.method !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }
    const { username, password: userPassword } = JSON.parse(req.body);
    if (username === userName && userPassword === password) {
        const token = jwt.sign({ username }, SECRET, { expiresIn: '5h' });
        return {
            statusCode: 200,
            body: JSON.stringify({ token })
        };
    }
    return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized' })
    };
}