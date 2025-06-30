import ViewBlogHeader from "../components/viewBloc/ViewHeader";
import React, { useEffect, useContext } from "react";
import blogContext from "../context/blogContext/BlogContext";
import ViewBlogContent from "../components/viewBloc/ViewBlogContent";
import { useParams } from "react-router-dom";


export default function ViewBlogPage() {
    const {id, category, title, date} = useParams();
    const {setBlog} = useContext(blogContext);
    useEffect(() => {
        // Fetch the blog data based on id and set it in context
        fetch(`/public/blogs/${id}.md`)
            .then(response => {
                return response.text()})
                .then(content => {
                    setBlog({
                    id: id,
                    content: content,
                    category: category,
                    title: title,
                    date: date
                })})
    }, [id, setBlog]);
    return (
        <>
            <ViewBlogHeader/>
            <ViewBlogContent/>

        </>
        
    );
}