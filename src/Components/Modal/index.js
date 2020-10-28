import React from 'react'
import './styles.css';
const Modal = ({children, toggle, onClose}) => {
  return (
    <div>
      {
        toggle && <div className="modal">
          <div className="content">
            <div 
              className="close-button-container"
              onClick={onClose}
            > 
              <button className="close-button">x</button>
            </div>
            {children}
          </div>
        </div>
      }
    </div>
  )
}

export default Modal
