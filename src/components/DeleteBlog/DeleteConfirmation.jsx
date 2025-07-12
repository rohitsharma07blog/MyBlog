import { useContext, useState } from "react";
import adminContext from "../../context/adminContext/AdminContext";

export default function DeleteConfirmation({setDeleteConfirmationShow, blogId}){
    const {token} = useContext(adminContext);
    const [error, setError] = useState('');
    const handleDelete = async ()=>{
        await fetch('/.netlify/functions/deleteBlog', 
            {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body : JSON.stringify(blogId)
            }
        ).then((res)=>{
            if(res.status == 200){
                return 'success';
            }else{
                return 'failure';
            }
        }).then((res)=>{
            if(res === 'success'){
                setDeleteConfirmationShow(false);
            }else{
                setError('Something went wrong! Please try again');
            }
        });
    }

    return (
        <>
        <div className="border rounded-lg shadow bg-gray-800 relative max-w-sm p-5">
    <div className="p-6 pt-0 text-center">
        <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">{(error === '') ?  'Are you sure you want to delete this blog?' : error}</h3>
        {(error == '') && <button onClick={handleDelete}
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
            Yes, I'm sure
        </button>}
        <button onClick={()=>{
            setError('');
            setDeleteConfirmationShow(false);
        }}
            className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center">
            {(error == '')? 'No, cancel' : 'Ok'}
        </button>
    </div>
</div>
        </>
    );
}