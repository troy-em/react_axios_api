import React from 'react'
import {useState, useEffect} from 'react'
import './index.css'

const Counter = () => {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    let timer = setTimeout(() => {
      setCounter((counter) => (counter + 1) )
    }, 1000)
    return () => clearTimeout(timer)
  })

  return(
    <>
      <h1>This is a React Counter</h1>
      <h4><small>Using</small> <b style={{color: 'orange'}}>useState</b> & <b style={{color: 'violet'}}>useEffect</b></h4>
      <p style={{color: 'green', fontWeight: '700', fontSize: '44px'}}>{counter}</p>
      <br />
      <button onClick={() => {
        setCounter((counter) => (counter+1))
      }}>Increment Manually</button>
    </>
  )

}

export default Counter