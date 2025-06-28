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
        blogs.map((blog, index) => (
            <BlogInfoCard key={index} blogInfoObject={blog} />
        )
    )); // Map through the blogs array and render a BlogInfoCard for each blog object
   
}