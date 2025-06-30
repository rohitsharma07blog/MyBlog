import { useContext } from "react";
import blogContext from "../../context/blogContext/BlogContext";
import { Link } from "react-router-dom";
export default function ViewBlogHeader(){
    const {blog} = useContext(blogContext);

    return (
        <div className="w-full flex bg-gradient-to-r justify-start bg-gray-900 p-2">
            <Link to="/" className="inline-flex items-center px-3 py-1.5 rounded-md text-white ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
                    </path>
                </svg>
            </Link>
            <div className="text-center">
                <p className="text-sm md:text-base text-green-500 font-bold">{blog.date} <span className="text-white">/</span> {blog.category}</p>
                <h1 className="font-bold break-normal text-white text-xl text-left md:text-5xl">{blog.title}</h1>            </div>
        </div>
    );
}