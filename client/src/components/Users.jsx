import React, { useContext } from 'react'
import { Mycontext } from './Mycontext'
import Header from './Header'
//import { useContext } from 'react'





const Users = () => {
const {allauthors, setAllauthors} = useContext(Mycontext)


  return (
    <div>
        <h3>All Users</h3>
        {allauthors? allauthors.map((post) => (
    <li key={post.id}>{post.fullname} --- {post.id} ----{post.email}</li>
)) : "No posts found"}

    </div>
    
  )
}

export default Users