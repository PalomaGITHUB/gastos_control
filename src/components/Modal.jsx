import { useState, useEffect } from "react"
import Mensaje from "./Mensaje"
import CerrarBtn from "../img/cerrar.svg"

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

  /* Validar campos de añadir gasto */
  const [mensaje, setMensaje] = useState('')
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  const [fecha, setFecha] = useState('')
  const [id, setId] = useState('')

  /* rellenar la ventana de editar con los datos del gasto a editar */
  useEffect(() => {
    /* si gastoEditar esta vacio, es un registro nuevo
    si esta lleno, detecta que vamos a editar */
    if(Object.keys(gastoEditar).length > 0){
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  }, [])

  /* cerrar ventana de añadir gasto */
  const ocultarModal = () =>{
    setAnimarModal(false)
    setGastoEditar({})
    setTimeout(() => {
      setModal(false)
    }, 500);
  }
  /* Comprobaciones en el formulario de añadir gastos */
  const handleSubmit = e =>{
    /* prevenir enviar form */
    e.preventDefault();
    /* Si alguno de los tres esta vacio... */
    /* Con includes validamos el vacio, pero tbn podemos hacerlo asi: */
    /* if(nombre === '' || cantidad === '' || categoria === ''){} */
    if([nombre, cantidad, categoria].includes('')){
      setMensaje('Todos los campos son obligatorios')
      // Que el mensaje desaparezca a los tres segundos de aparecer
      // setTimeout(() => {
      //   setMensaje('')
      // }, 3000);
      return;
    }
    
    guardarGasto({nombre, cantidad, categoria, id, fecha})
  }

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBtn} alt="Boton cerrar" onClick={ocultarModal}/>
      </div>
      {/* Si animarModal es true, agregamos la clase "animar" */}
      {/* Esta es la ventana que aparece para agregar un nuevo gasto */}
      <form 
      onSubmit={handleSubmit}
      className= {`formulario ${animarModal ? "animar" : 'cerrar'}`}
      >
        <legend>{gastoEditar.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">¿En qué has gastado?</label>
          {/* Con value indicamos la variable y con setNombre va agregandolo */}
          <input value={nombre} onChange={e => setNombre(e.target.value)} type="text" id="nombre" placeholder="Añade el gasto"/>
        </div>

        <div className="campo">
          <label htmlFor="cantidad">¿Qué cantidad de dinero?</label>
          <input value={cantidad} onChange={e => setCantidad(Number(e.target.value))} type="number" id="nombre" placeholder="Añade la cantidad"/>
        </div> 

        <div className="campo">
          <label htmlFor="categoria">¿De qué tipo ha sido el gasto?</label>
          <select value={categoria} onChange={e => setCategoria(e.target.value)} name="categoria" id="categoria">
            <option value="">-- Selecciona una categoria --</option>
            <option value="ahorros">Ahorros</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="ocio">Ocio</option>
            <option value="suscripciones">Suscripciones</option>
            <option value="otros">Otros</option>
          </select>
        </div> 

        <input type="submit" value={gastoEditar.nombre ? 'Modificar' : 'Añadir gasto'}/>

      </form>
    </div>
  )
}

export default Modal