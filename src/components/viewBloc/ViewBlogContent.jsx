import { useContext } from "react";
import blogContext from "../../context/blogContext/BlogContext";
import ReactMarkdown from "react-markdown"; 
export default function ViewBlogContent() {
    const {blog} = useContext(blogContext)
    return (
        <>
        <div id="progress" className="h-1 bg-white shadow" style={{background: "linear-gradient(to right, #4dc0b5 var(--scroll), transparent 0)"}}></div>
        
        <div className="prose max-w-3xl mx-auto p-4">
            <ReactMarkdown children={blog.content}></ReactMarkdown>
        </div>
        </>
    );
}