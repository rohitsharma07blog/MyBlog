import {useState, useEffect} from "react";
import BlogInfoCard from "../BlogInfoCard/BlogInfoCard";
export default function Home() {
    const [blogs, setBlogs] = useState([]);
    // Initialize state to hold blog data
    useEffect(()=>{
        fetch('/post_data.json')
        .then(response => response.json())
        .then(data => setBlogs(data));
    }, []);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-1">

       { blogs.map((blog, index) => (
            <BlogInfoCard key={index} blogInfoObject={blog} />
        )
    )}
    </div>
); // Map through the blogs array and render a BlogInfoCard for each blog object
   
}