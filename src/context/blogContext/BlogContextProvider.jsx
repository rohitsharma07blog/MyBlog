import { Children, useState } from "react";
import blogContext from "./BlogContext";

const BlogContextProvider = ({children})=>{
    const [blog, setBlog] = useState({})
    return (
        <blogContext.Provider value = {{blog, setBlog}}>
            {children}
        </blogContext.Provider>
    );
}

export default BlogContextProvider;