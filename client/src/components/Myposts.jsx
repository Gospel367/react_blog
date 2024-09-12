import React from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Mycontext } from './Mycontext';
import Header from './Header';

const Myposts = () => {

    const {allposts, setAllposts} = useContext(Mycontext)
    const {data, user, authToken, userEmail} = useContext(Mycontext)
    const params = useParams();
    console.log(`params: ${params.userid}`)
    console.log(`trial: ${allposts}`)


    let filtered = allposts.filter(filt => filt.author ===user)
    
  return (
    <div>
   
            <Header
                data = {data}
                user ={user}
                userEmail={userEmail}
                authToken={authToken}
                />
<h3>All my posts</h3>

{filtered.length >0 ? filtered.map((post) => (
    <li key={post.id}>{post.title} {post.id}</li>
)) : "No posts found"}



    </div>
  )
}

export default Myposts