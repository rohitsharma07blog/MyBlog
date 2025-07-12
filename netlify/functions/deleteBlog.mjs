import 'dotenv/config';
import jwt from 'jsonwebtoken';

const removeBlog = async(blogId) => {
    try{

        //updating post_data.json file
        const url = `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.REPO_NAME}/contents/public/post_data.json?ref=${process.env.BRANCH_NAME}`;

        const ref = await fetch(
            url,
            {
                headers : {
                    'Authorization' : `token ${process.env.GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );
        
        //reading data from file
        const data = await ref.json();
        const jsonDataString = Buffer.from(data.content, 'base64').toString('utf-8');
        const jsonData = JSON.parse(jsonDataString);

        //creqting new data by removing the object with give id
        const newJson = jsonData.filter(obj => obj.id !== blogId);
        const newJsonString = JSON.stringify(newJson);

        console.log(newJsonString);
        console.log(blogId);

        const base64Data = Buffer.from(newJsonString).toString('base64');

        //updating the file
        const postData = await fetch(
            url,
            {
                method : 'POST',
                headers : {
                    Authorization: `token ${process.env.GITHUB_TOKEN}`,
                    Accept: "application/vnd.github.v3+json",
                },
                body : JSON.stringify({
                    message : "Post_data.json is updated after deleting",
                    content : base64Data,
                    sha : data.sha,
                    branch : process.env.BRANCH_NAME,
                })
            }
        );
        //returning error
        if(!postData.ok){
            throw new Error("Post updating failed");
        }


        //Get file SHA
        const blogUrl = `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.REPO_NAME}/contents/public/blogs/${blogId}.md`
        console.log(blogUrl); //log
        const getRef = await fetch(
            `${blogUrl}?ref=${process.env.BRANCH_NAME}`,
            {
                headers : {
                    Authorization: `token ${process.env.GITHUB_TOKEN}`,
                    Accept: "application/vnd.github.v3+json",
                }
            }
        )

        const getRefData = await getRef.json();
        console.log(getRefData.sha); //log
        //deleting file
        const deleteRef = await fetch(blogUrl, {
            method : 'DELETE',
            headers : {
                Authorization: `token ${process.env.GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
            },
            body : JSON.stringify({
                message : `delete  ${blogId}`,
                sha : getRefData.sha,
            }),
        });
        console.log(deleteRef);//log
        if(!deleteRef.ok){
            throw new Error(`Failed to delete file ${blogId}`);
        }
        return;
    }catch(error){
        throw error;
    }
}

export default async (req, context) => {
    if(req.method != 'POST'){
        return new Response(
            JSON.stringify({error : "Method not required"}),
            {
                status : 401,
                headers : {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            }
        );
    }
    const body = await req.json();
    const {blogId} = body;
    
    console.log(body);
    console.log(blogId);

    const token = req.headers.get('authorization')?.split(' ')[1];
    if(!token){
        return new Response(
            JSON.stringify({error : "Token not provided!"}),
            {
                status : 401,
                headers : {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            }
        );
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await removeBlog(blogId);
        return new Response(
            JSON.stringify({message : "Blog deleted!"}),
            {
                status : 200,
                headers : {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            }
        );
    }
    catch(error){
        console.error("Delete blog error : " + error);
        return new Response(
            JSON.stringify({error : "Internal server error"}),
            {
                status : 500,
                headers : {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            }
        );
    }
}