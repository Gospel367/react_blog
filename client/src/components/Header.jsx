import { useState, useContext, createContext } from 'react'
import Navigation from './Navigation'
import Modal from './Modal'
import Auth from './Auth'
import Authors from './Authors'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'
import { Mycontext } from './Mycontext'




const Header = ({ mode, setMode, openmodal,
    setOpenmodal, user, post, setFilter, filter, authToken,
}) => {

    const [openauth, setOpenauth] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies()
    const [errors, setErrors] = useState("")
    const [login, setLogin] = useState('')

    const {favorites} = useContext(Mycontext)


    const userid = useContext(UserContext)
    console.log(`user: ${user}`)



    const dash = `/${userid}/dashboard`
    const favlink = `/favorites/${user}`
    const home = `/`


    console.log(`auth: ${openauth}`)

    console.log(mode)

    return (
        <div>
            <div className='header'>
                <div className='subheader'>
                    <div className='header-logo'>
                        <h3><Link to={home}>The React Blog</Link></h3>
                        <p>The best react blog in the world...</p>
                    </div>
                    <div>
                        <ul className='auth-buttons'>

                            {authToken ? <li><button onClick={() => {
                                setOpenmodal(true)
                                setMode('create')
                            }
                            } >Create Post</button></li> : ""}
                           
                            {authToken && openmodal ? <Modal setOpenmodal={setOpenmodal}
                                mode={mode}
                                setmode={setMode}
                                post={post}
                                user={user}
                                 /> : ""}

                            {authToken ? <> <li><button onClick={() => {
                                removeCookie('Email')
                                removeCookie('AuthToken')

                            }}>Sign Out</button></li>
                                <li><button> <Link to={dash}>Dashboard</Link></button></li>
                            </>
                                : <li><button onClick={() => {
                                    setLogin(false)
                                    setOpenauth(true)
                                    setErrors("")

                                }}>Sign up</button></li>
                            }
                            {openauth === true && <Auth openauth={openauth} setOpenauth={setOpenauth}

                                login={login} setLogin={setLogin} />}
                            {!authToken && <li><button onClick={() => {
                                setLogin(true)
                                setOpenauth(true)

                            }}>Log In </button></li>}
                             <li><button> <Link to={favlink}>Favorites<sup style={{'color': 'red'}}>{favorites.length}</sup></Link></button></li>


                        </ul>
                    </div>
                </div>



                <div>
                    <Navigation filter={filter} setFilter={setFilter} />
                </div>
            </div>


        </div>
    )
}

export default Header
