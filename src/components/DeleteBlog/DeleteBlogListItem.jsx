import {useState} from 'react'
import DeleteConfirmation from './DeleteConfirmation';

export default function DeleteBlogListItem({blog}){
    const [deleteConfirmationShow, setDeleteConfirmationShow] = useState(false);

    const handleDelete = ()=>{
        setDeleteConfirmationShow(true);
    }

    return (
        <>
            {deleteConfirmationShow && <div className="fixed inset-x-96 m-16 inset-y-40 z-50 flex items-center justify-center">
                <DeleteConfirmation setDeleteConfirmationShow = {setDeleteConfirmationShow} blogId = {blog.id}/>
            </div>}
            <div className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-200">
        <div className="flex items-center">
            <img className="rounded-full h-10 w-10" src={blog.image}/>
            <div className="ml-2 flex flex-col">
                <div className="leading-snug text-sm text-gray-900 font-bold">{blog.title}</div>
                <div className="leading-snug text-xs text-gray-600">{blog.description}</div>
            </div>
        </div>
        <button onClick={handleDelete} className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </span>
            <span className="hidden md:inline-block">Delete</span>
        </button>
    </div>
        </>
    )
}