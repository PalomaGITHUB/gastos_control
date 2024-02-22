import React from 'react'

const Mensaje = ({children, tipo}) => {
  return (
    //juntar una clase fija alerta con dinamica, tipo
    <div className={`alerta ${tipo}`}>{children}</div>
  )
}

export default Mensaje