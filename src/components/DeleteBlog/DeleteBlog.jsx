import { useEffect, useState } from "react"
import DeleteBlogListItem from "./DeleteBlogListItem";
import DeleteConfirmation from "./DeleteConfirmation";

export default function DeleteBlogs(){
    const [blogs, setBlogs] = useState([]);

    useEffect(()=>{
        fetch('/post_data.json').then(res => res.json()).then(data => setBlogs(data));
    }, []);

    return (
        <>
            
            {blogs.map((e)=>{
                return <DeleteBlogListItem key={e.id} blog = {e}/>
            })}
        </>
    );
}