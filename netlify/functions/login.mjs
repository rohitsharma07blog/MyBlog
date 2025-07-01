import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET = process.env.JWT_SECRET;
const userName = process.env.USER_NAME;
const password = process.env.PASSWORD;

export default async (req, context) =>{
    if(req.method !== 'POST') {
        return new Response(
            JSON.stringify({ error: 'Method Not Allowed' }),
            {
                status: 405,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            }
        );
    }
    const body = await req.json();
    const { username, password: userPassword } = body;
    console.log(username, userPassword, userName, password);
    if (username === userName && userPassword === password) {
        const token = jwt.sign({ username }, SECRET, { expiresIn: '5h' });
        return new Response(
            JSON.stringify({token : token}),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            }
        );
    }
    return new Response(
        JSON.stringify({ error: 'Invalid username or password' }),
        {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        }
    );
}