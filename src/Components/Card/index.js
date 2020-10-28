import React from 'react'
import './styles.css';

const Card = ({title, children}) => {
  return (
    <div className="card">
      <h4>{title}</h4>
      <div>
        {children}
      </div>
    </div>
  )
}

export default Card
