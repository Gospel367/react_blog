import React, {useContext} from 'react'
import { NavLink, useParams, Outlet, useLocation } from 'react-router-dom'
import { UserContext } from '../App'
import { Mycontext } from './Mycontext'
import Header from './Header'



const Dashboard = () => {
    const params = useParams()
    const path = useLocation()

    const {data, user, authToken, userEmail} = useContext(Mycontext)
    

    console.log(params)
    console.log(path)



    const tria = useContext(UserContext)
    console.log(`trial: ${tria}`)


    let prof = `/${params.userid}/dashboard/profile`
    let posts = `/${params.userid}/dashboard/myposts`
    let settings = `/${params.userid}/dashboard/settings`
    let users = `/${params.userid}/dashboard/users`
    let home = `/${params.userid}/dashboard/`



    return (
        <>
                <Header
                data = {data}
                user ={user}
                userEmail={userEmail}
                authToken={authToken}
                />

            <div><h3>Welcome to Dashboard {params.userid}</h3> </div>
            <div className='dash-container'>
                <ul className='sidebar' >
                    <li><NavLink to={home}
                        className={({ isActive }) => {
                            return isActive ? 'activate' : ''
                        }}>Home</NavLink></li>
                    <li><NavLink to={prof}
                        className={({ isActive }) => {
                            return isActive ? 'activate' : ''
                        }}>Profile</NavLink></li>
                    <li><NavLink to={posts}
                        className={({ isActive }) => {
                            return isActive ? 'activate' : ''
                        }}>My Posts</NavLink></li>
                    <li><NavLink to={users} onClick={() => console.log(params)}>All Users</NavLink></li>
                    <li>Categories</li>
                    <li><NavLink to={settings}
                        className={({ isActive }) => {
                            return isActive ? 'activate' : ''
                        }}>Settings</NavLink></li>
                </ul>

                <div className='outlet'>
                    <Outlet />
                </div>

            </div>
        </>
    )
}

export default Dashboard