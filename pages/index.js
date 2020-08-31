import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import Axios from 'axios'

function fetchProduct () {
  const [Product, setProduct] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Axios({
      method: 'get',
      url: 'http://localhost:5000'
    })
    .then(({data}) => {
      console.log(data)
      setProduct(data)
    })
    .catch(_=> {
      setError(true)
    })
    .finally(_=> {
      setLoading(false)
    })
  }, [])
  return { Product, error, loading }
}


export default function Home() {
  const {Product, error, loading} = fetchProduct()
  return (
    <div className={styles.container}>
      <Head>
        <title>Ecommers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} style={{width: 90+'vw'}}>
        <div style={{
          position: 'fixed',
          top: 0,
          width: 100+'%',
          height: 60+'px',
          backgroundColor: 'black'
        }}>
          <div style={{
            color: 'white',
            textAlign: 'center',
            padding: 8 + 'px',
            marginLeft: 5 +'%',
            marginRight: 5 +'%',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <h1 style={{ padding:0, margin:0, textAlign: 'left'}}>Ecomms</h1>
            <button> <Link href='/login'> Login </Link> </button>
          </div>
        </div>
        <h1>
          Welcome to ecommers
        </h1>
        <div 
          style={{
            width: 100+'%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center'
            // justifyContent: 'space-between'
          }}
        >
          { Product.map((item) =>(
            <div style={{
              margin: 10+'px',
            }}>
              <div style={{
                width: 180+'px',
                height:200+'px',
                backgroundColor: 'lightgrey',
                backgroundImage: "url('https://picsum.photos/180/200')"
              }}>
              </div>
              <h2 key={item._id}> {item.name} </h2>
              {/* <span> {item.userId} </span> */}
              <p> Rp.{item.price} </p>
              <div>
                <button>Add to Cart </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a>
          AZ - copyrigth 2020
        </a>
      </footer>
    </div>
  )
}
