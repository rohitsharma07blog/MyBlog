
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage';
import ViewBlog from './pages/ViewBlog'
import Layout from './Layout';

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
      path: '/blog/:id',
      element: <ViewBlog/>,
      }
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
