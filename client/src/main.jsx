import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard.jsx';
import Profile from './components/Profile.jsx';
import Notfound from './components/Notfound.jsx';
import Settings from './components/Settings.jsx';
import Myposts from './components/Myposts.jsx';
import Users from './components/Users.jsx';
import MyProvider from './components/Mycontext.jsx';
import FavoritesList from './components/FavoritesLists.jsx';




const router = createBrowserRouter([
  
  {
    path: '/',
    element: <App />,
    errorElement: <Notfound />

  },

  {
  path: "/favorites/:user",
  element:  <FavoritesList />,
  errorElement: <Notfound />
  },

  {
    path: `/:userid/dashboard/myposts`,
    element: <Myposts />,
    errorElement: <Notfound />


  },

  {
    path: `/:userid/dashboard`,
    element: <Dashboard />,
    children: [
      {
        path: `/:userid/dashboard/profile`,
        element: <Profile />,
        errorElement: <Notfound />


      },

      {
        path: `/:userid/dashboard/settings`,
        element: <Settings />,
        errorElement: <Notfound />


      }

      ,
      {
        path: `/:userid/dashboard/users`,
        element: <Users />,
        errorElement: <Notfound />


      }

    ]

  },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

<MyProvider>
<RouterProvider router={router} />
</MyProvider>
  </React.StrictMode>,
)
