import { useState, useEffect } from 'react'
import Axios from 'axios'


function getDataUser () {
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Axios({
      method: 'get',
      url: 'http://localhost:5000/profile',
      headers: {
        id: localStorage.getItem('id')
      }
    })
    .then(({data}) => {
      setUser(data)
    })
    .catch(err => {
      setError(err)
    })
    .finally(_=> {
      setLoading(false)
    })
  }, [])

  return {user, loading, error}
}

export default function profile () {
  const {user, loading, error} = getDataUser()
  if(loading) return ( <h1> Loading... </h1> )
  if(error) return ( <p>{JSON.stringify(error)}</p> )
  return (
    <div style={{
      width: 100+'vw',
      height: 100+'vh',
      justifyContent: 'center',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <h1>
        Profile
      </h1>
      <table>
        <tr>
          <td> Name : </td>
          <td> {user.name} </td>
        </tr>
        <tr>
          <td> Email : </td>
          <td> {user.email} </td>
        </tr>
        <tr>
          <td> Saldo : </td>
          <td> {user.saldo} </td>
        </tr>
      </table>
      <h1>
        Cart
      </h1>
        {user.product.map((item) => {
        <div key={item._id}>
          <p> {item.name} </p>
          <p> {item.price} </p>
          <p> {item.amount} </p>
        </div>
        })}
        <p> {JSON.stringify(user.product[0].name)} </p>
    </div>
  )
}