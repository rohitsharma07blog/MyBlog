
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage';
import ViewBlogPage from './pages/ViewBlogPage'
import Layout from './Layout';
import BlogContextProvider from './context/blogContext/BlogContextProvider';
import AdminPage from './pages/AdminPage';
import AdminContextProvider from './context/adminContext/AdminContextProvider';
import Editor from './components/Editor/Editor';
import DeleteBlogs from './components/DeleteBlog/DeleteBlog';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children:[
      {
        path: '',
        element: <LandingPage />
      }
      ,
      {     
      path: '/blog/:date/:category/:title/:id',
      element: <BlogContextProvider><ViewBlogPage/></BlogContextProvider>
      },
      {
        path : '/admin',
        element: <AdminContextProvider><AdminPage /></AdminContextProvider>,
        children : [
          {
            path : 'editor',
            element : <Editor/>
          },
          {
            path : 'deleteBlogs',
            element : <DeleteBlogs/>
          }
        ]
      },      
    ]
  },

  
])

function App() {
  

  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App
