import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Axios from 'axios'


export default function Login () {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  function loginSubmit (event) {
    event.preventDefault()
    console.log(email, password)
    Axios({
      method: 'post',
      url: 'http://localhost:5000/login',
      data: {
        email, password
      }
    })
    .then(({data}) => {
      localStorage.setItem('id', data._id)
      router.push('/')
      console.log(data._id)
    })
    .catch(err => {
      console.log(err)
    })
  }
  function handleEmail (event) {
    setEmail(event.target.value)
  }
  function handlePassword (event) {
    setPassword(event.target.value)
  }
  function checker () {
    if(localStorage.getItem('id')) {
      return (
        <div> 
          <h1>
            Already Login 
          </h1>
          <span style={{color: 'blue'}}>
          <Link href='/profile'>  Click here to see your profile  </Link>
          </span> 
        </div>
      )
    } else {
      return (
        <>
          <h1>
          Login
          </h1>
          <form>
            <label>Email</label> <br/> <br/>
            <input type='text' onChange={handleEmail}></input> <br/> <br/>
            <label>Password</label> <br/> <br/>
            <input type='password' onChange={handlePassword}></input> <br/> <br/>
            <button type='submit' onClick={loginSubmit}>Login</button> <span> or </span>
            <span  style={{color: 'red'}}>
              <Link href='/'> Go back </Link>
            </span>
          </form>
        </>
      )
    }
  }
  return (
    <div style={{
      width: 100+'vw',
      height: 100+'vh',
      justifyContent: 'center',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <>
        {checker()}
      </>
    </div>
  )
}