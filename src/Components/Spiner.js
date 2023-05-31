import React from 'react'
import Walk from './Walk.gif'
const Spiner =(props)=> {
    return (
     props.status && <div className="text-center"> 
        <img src={Walk} alt="Loading"/>
      </div>
    )
}

export default Spiner;