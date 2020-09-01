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
function payAction (e) {
    e.preventDefault
    Axios({
        method: 'get',
        url: 'http://localhost:5000/pay',
        headers: {
            id: localStorage.getItem('id')
        }
    })
    .then(result => {
        console.log(result)
        getDataUser()
    })
    .catch(err => {
        console.log(err)
    })
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
        Product
      </h1>
            <table style={{border: 1+'px'}}>
                <thead>
                    <tr>
                        <th> Name </th>
                        <th> Price </th>
                        <th> Amount </th>
                    </tr>
                </thead>
                <tbody>
                    {user.product.map((item) =>(
                        <tr>
                            <td> {item.name} </td>
                            <td> {item.price} </td>
                            <td> {item.amount} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        <h1>
         Cart
        </h1>
        <table style={{border: 1+'px'}}>
            <thead>
                <tr>
                    <th> Name </th>
                    <th> Price </th>
                    <th> Amount </th>
                    <th> Total Price </th>
                </tr>
            </thead>
            <tbody>
                {user.cart.map((item) =>(
                    <tr style={{textAlign: 'center'}}>
                        <td> {item.name} </td>
                        <td> Rp.{item.price} </td>
                        <td> {item.amount_product} </td>
                        <td> Rp.{parseInt(item.price)*item.amount_product} </td>
                    </tr>
                ))}
            </tbody>
        </table> <br/>
        <button type='button' onClick={payAction}>
            Pay
        </button>
    </div>
  )
}