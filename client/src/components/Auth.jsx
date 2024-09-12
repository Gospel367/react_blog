import { useState } from 'react'
import { useCookies } from 'react-cookie'


const Auth = ({ openauth, setOpenauth, login, setLogin }) => {

  const [errors, setErrors] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies()
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    hashed_password: "",
    hashed_password2: "",

  })


  const Signup = async (e, endpoint) => {
    e.preventDefault();

    if (login == false && values.hashed_password !== values.hashed_password2) {
      setErrors('Kindly check the password matches')
      return
    }
    try {

      const response = await fetch(`http://localhost:9949/users/${endpoint}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })

      const data = await response.json()
      if(data.detail){
        setErrors(data.detail)
      }else{
        setCookie('Email', data.email)
        setCookie('AuthToken', data.token)
        setCookie('Data', data.data)
        setCookie('User', data.user)


        
        window.location.reload()


      }
    } catch (err) {
      setErrors(err)
      console.error(err)
    }
  }



  function HandleChange(e) {
    const { name, value } = e.target
    setValues(values => ({
      ...values, [name]: value
    }))
  }

  console.log(values)

  return (
    <div>
      <div className='auth-overlay'>
        <div className='auth-box'>
          <div className='auth-title'>
            <h3> Enter {login === false ? "Sign-Up" : "Log-In"} Details</h3>
            <button style={{ "padding": 0 }} className='' onClick={() => setOpenauth(false)}>X</button>
          </div>
          <form>
            {login ===true ? '':<> <label> Full Name </label><input onChange={HandleChange} name='fullname' value={values.fullname} type='text' placeholder='Input your fullname' /><br></br><br></br></>}
            <label> Email </label><input onChange={HandleChange} name='email' value={values.email} type='text' placeholder='Input your email' /><br></br><br></br>
            <label> Password </label><input onChange={HandleChange} name='hashed_password' value={values.hashed_password} type='text' placeholder='Input your password password' /><br></br><br></br>
            {login === true ? "" : <><label> Confirm Password</label>  <input onChange={HandleChange} name='hashed_password2' value={values.hashed_password2} type='text' placeholder='Input your password password' /><br></br><br></br></>}

            <input type='submit' onClick={(e) => Signup(e, login === true ? 'login' : 'signup')} /><br></br><br></br>
            {errors ? <p>{errors}</p> : ""}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Auth
