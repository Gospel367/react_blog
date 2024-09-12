import React from 'react'
import { Mycontext } from './Mycontext'
import { useContext } from 'react'



const Profile = () => {

  const {data, user, authToken, userEmail} = useContext(Mycontext)
  const {allauthors, setAllauthors} = useContext(Mycontext)
  const datum = allauthors.filter((personal) => personal.id ==user)
  console.log(datum)

  return (
    <div>
      <h3>Welcome Back {userEmail}</h3>
      <ul>
      {datum.map((data) => (
        <>
        <li key={data.id}>Name: {data.fullname}</li>
        <li>Email: {data.email}</li>
        <li>Class: {data.class_name ? data.class_name: "Unknown"}</li>
        </>
      ))}
      </ul>
      </div>
  )
}

export default Profile