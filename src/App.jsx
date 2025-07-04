
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage';
import ViewBlogPage from './pages/ViewBlogPage'
import Layout from './Layout';
import BlogContextProvider from './context/blogContext/BlogContextProvider';
import AdminPage from './pages/AdminPage';
import AdminContextProvider from './context/adminContext/AdminContextProvider';
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
        path : 'admin',
        element: <AdminContextProvider><AdminPage /></AdminContextProvider>
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
