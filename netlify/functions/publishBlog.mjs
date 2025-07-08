import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { nanoid } from 'nanoid';


const SECRET = process.env.JWT_SECRET;

const updatePostData = async(title, category, image, description, content) => {
    try{
    const url = `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.REPO_NAME}/contents/public/post_data.json?ref=${process.env.BRANCH_NAME}`;
    const fetchref = await fetch(url, {
        headers: {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });
   
    const data = await fetchref.json();
    const jsonContent = Buffer.from(data.content, 'base64').toString('utf-8');
    const postData = JSON.parse(jsonContent);
    const postId = nanoid();

    postData.push({
        id : postId,
        title,
        category,
        image,
        description,
        date: new Date().toISOString()
    });
    console.log('Post data before update:', fetchref.sha);
    // Convert updated postData to base64
    const updatedContent = Buffer.from(JSON.stringify(postData)).toString('base64');
    const postmetadata = await fetch(url, {
        method: "PUT",
        headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
        message: "Append new item to post_data.json",
        content: updatedContent,
        sha: data.sha,
        branch: process.env.BRANCH_NAME,
        }),
    });
    console.log('Post metadata updated:', postmetadata.ok);
    const postUrl = `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.REPO_NAME}/contents/public/blogs/${postId}.md`;
    const postpublist = await fetch(postUrl, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
            message: `Publish blog post: ${title}`,
            content: Buffer.from(content).toString('base64'),
            branch: process.env.BRANCH_NAME
        })
    });
    return true;
    } catch (error) {
        console.error('Error updating post data:', error);
        return false;
    }

}

export default async (req, context) => {
    if (req.method !== 'POST') {
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
    const { title, category, image, description, content } = body;

    // Verify JWT
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Received JWT:', req.headers.authorization);
    if (!token) {
        return new Response(
            JSON.stringify({ error: 'Unauthorized' }),
            {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            }
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded JWT:', decoded);
    } catch (error) {
        console.error('JWT verification failed:', error);
        return new Response(
            JSON.stringify({ error: 'Invalid token' }),
            {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            }
        );
    }

    // Publish blog post logic here
    const success = await updatePostData(title, category, image, description, content);
    if (!success) {
        return new Response(
            JSON.stringify({ error: 'Failed to publish blog post' }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            }
        );
    }
    return new Response(
        JSON.stringify({ message: 'Blog post published successfully' }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        }
    );
}
