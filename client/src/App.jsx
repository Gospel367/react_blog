import { useEffect, useState, createContext, useContext } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { useCookies } from 'react-cookie'
import Post from './components/Post'
import { Buffer } from 'buffer'
import { Mycontext } from './components/Mycontext'

export const UserContext = createContext()

const App = () => {


  const [mode, setMode] = useState('')
  const {allposts, setAllposts} = useContext(Mycontext)
  const {allauthors, setAllautors, postmodal, setPostmodal} = useContext(Mycontext)
  const [openmodal, setOpenmodal] = useState(false)
  const [singlepost, setSinglepost] = useState('')
  const [filter, setFilter] = useState('')
  //const {categories, setCategories} = useContext(Mycontext)
  const [cookies, setCookie, removeCookie] = useCookies()
  const {data, user, authToken, userEmail} = useContext(Mycontext)


//forgot password
  //Add dashboard
  //Add CRUD for categories
  //Add CRUD for USERS
  //swap views for authentication
const deletePost = async(post) => {
     try {
      await fetch(`http://localhost:9949/posts/${post.id}`, {
        method: "DELETE",
      })
      window.location.reload()
     } catch(err){
        console.error(err)
     }
}
  //const sortedposts = allposts ?.sort((a, b) => new Date(a.date) - new Date(b.date));


  const filtrates = allposts.filter(filpost => filpost.category === filter.id)

  
  
  

  return (
    <div className='app'>

      <div className='header'>
        {userEmail ? <p> Welcome {userEmail}</p> : <p> Welcome Friend </p>}


<UserContext.Provider value={user}>
        <Header 
        mode={mode} setMode={setMode}
          openmodal={openmodal}
          setOpenmodal={setOpenmodal}
          post={singlepost}
          filter={filter}
          setFilter={setFilter}
          authToken={authToken}
          userEmail={userEmail}
          user={user}
        />
        </UserContext.Provider>
      </div>

    
      <div className='body'>
        <h3>{filter === "" ? 'General' : filter.category}: Latest Posts</h3>
        <div className='post-box'>
          {filter == "" ? allposts.map((post) => (
            <div key={post.id} className='post-tiles'>

              <p>Title: {post.title}</p>
              <p>ID: {post.id}</p>

              <p>Category: {post.postcategory}</p>
              <p> <img src={`${Buffer.from(post.image,'base64')}`} 
                            alt={post.title} 
                            style={{ maxWidth: '150px', height: '150px' }} 
                        /></p>
              <p>Body: {post.body}</p>
              <p>Author: {post.postauthor}</p>
              <p>Date: {post.post_date}</p>
              <p>Likes: {post.likes.length}</p>
              <p>Dislikes: {post.dislikes.length}</p>
             <div style={{'display': 'grid', 'gridTemplateColumns': '4fr 4fr 4fr'}}> 
              
              <button style={{'border': "solid orange"}} type='submit' onClick={() => {
                setSinglepost(post)
                setPostmodal(true)
                
              }}>Read</button>
              
              {postmodal===true ? <Post post ={singlepost} setPostmodal={setPostmodal}/> : "" }
              {data === 'admin' && authToken ? <button type='submit' onClick={() => {
                setMode('edit');
                setSinglepost(post)
                setOpenmodal(true)
              }}>Edit</button> : ""}
              {data === 'admin' && authToken ? <button type='submit' onClick={() => deletePost(post)}>Delete</button> : ""}

              </div>
            </div>
          )) : filtrates.map((post) => (
            <div key={post.id} className='post-tiles'>

              <p>Title: {post.title}</p>
              {/*post.category === filter.id ? <p>Category: {filter.category}</p> : <p>Category: "Unknown Category"</p>*/}

              <p>{post.postcategory}</p>
              <p>Body: {post.body}</p>
              <p> <img src={`${Buffer.from(post.image,'base64')}`} 
                            alt={post.title} 
                            style={{ maxWidth: '150px', height: '150px' }} 
                        /></p>
              <p>Body: {post.body}</p>
              <p>Author: {post.postauthor}</p>
              <p>Date: {post.post_date}</p>
              <p>Likes: {post.likes.length}</p>
              <p>Dislikes: {post.dislikes.length}</p>

             
              <div style={{'display': 'grid', 'gridTemplateColumns': '4fr 4fr 4fr'}}> 
              
              <button style={{'border': "solid orange"}} type='submit' onClick={() => {
                setSinglepost(post)
                setPostmodal(true)
                
              }}>Read</button>
              
              {postmodal===true ? <Post post ={singlepost} setPostmodal={setPostmodal}/> : "" }
              {data === 'admin' && authToken ? <button type='submit' onClick={() => {
                setMode('edit');
                setSinglepost(post)
                setOpenmodal(true)
              }}>Edit</button> : ""}
              {data === 'admin' && authToken ? <button type='submit' onClick={() => deletePost(post)}>Delete</button> : ""}

              </div>
            </div>
          ))}


        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
