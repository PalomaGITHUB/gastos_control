import React from 'react'
import Mensaje from './Mensaje';
import { useState } from 'react';

const NuevoPresupuesto = ({
  presupuesto, 
  setPresupuesto, 
  setIsValidPresupuesto
}) => {
  const [mensaje, setMensaje] = useState('')
  const handlePresupuesto = (e) => {
    e.preventDefault();
    //Con Number convierto el string presupuesto en numero
    if(!presupuesto || (presupuesto) < 0){
      setMensaje("El presupuesto no es válido")
      //romper la ejecución del codigo
      return 
    }
    setMensaje("")
    setIsValidPresupuesto(true);
  }
  return (
    <div className='contenedor-presupuesto contenedor sombra '>
      <form onSubmit={handlePresupuesto} className='formulario'>
        <div className='campo'>
          <label>¿De qué presupuesto dispones?</label>
          <h4>Calcularemos tu dinero gastado y el disponible a partir del presupuesto inicial que nos indiques
          y los gastos que registres.</h4>
          <h4>Recuerda que todo será calculado en euros (€).</h4>
          <input
          className='nuevo-presupuesto'
          type='number'
          placeholder='Añade tu presupuesto'
          value={presupuesto}
          //con e.target.value hacemos que lo que el usuario vaya escribiendo
          //se vaya almacenando en setPresupuesto (Leo el contenido y actualizo el Padre)
          onChange= { e => setPresupuesto (Number(e.target.value))}
          />
        </div>
        <input type="submit"  value="Definir presupuesto inicial"/>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  )
}

export default NuevoPresupuesto