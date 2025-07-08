import React, { useContext, useState } from 'react';
import adminContext from '../../context/adminContext/AdminContext';

export default function UploadForm({setMetadataForm, markdown}) {
    const [imageURL, setImageURL] = useState(undefined);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const {token} = useContext(adminContext)
    const upload = async ()=>{
        const metadata = {
            title: title,
            category: category,
            description: description,
            image: imageURL,
            content: markdown,
        }
        await fetch('/.netlify/functions/publishBlog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(metadata)
        }).then((response) =>{
            if(response.status === 200) {
                setMetadataForm(false);
            } else {
                setError("Failed to upload metadata. Please try again.");
            }
        });
    }

    return (
        <>

            <div className="absolute w-[25rem] h-[30rem] bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
            </div>
            <div className="text-white relative h-[30rem] w-[30rem] px-4 py-10 bg-indigo-400 shadow-lg sm:rounded-3xl overflow-auto scrollbar-none">
            {error != '' && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}.</span>
            </div>}
            <div className="text-center pb-6">
                <h1 className="text-3xl">Enter Metadata</h1>
            </div>

            <form>

                <input className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>

                <input className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="Category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}/>

                <input className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={imageURL} onChange={(e) => setImageURL(e.target.value)} type="text" placeholder="Image URL" name="image"/>
                <br />
                {imageURL && (
                    <div className="w-full h-auto border rounded overflow-hidden">
                    <img
                        src={imageURL}
                        alt="Preview"
                        className="object-contain w-full max-h-96"
                    />
                    </div>
                )}

                {!imageURL && (
                    <p className="text-gray-500 text-sm">No image selected</p>
                )}
                <br />
                <textarea className="shadow mb-4 min-h-0 appearance-none border rounded h-64 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description...." name="description" style={{height: "50px"}}></textarea>

                <div className="flex justify-between">
                    <button onClick={upload} className="shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" value="Upload">
                        Upload
                    </button>
                    <button onClick={() => setMetadataForm(false)}
                        className="shadow bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Back
                    </button>
                </div>

            </form>
        </div>
    </>
    );
}