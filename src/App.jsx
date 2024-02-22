/* importar funciones y componentes */
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  const [gastos, setGastos] = useState(
    //comporbamos que existe, si no array vacio, si si, convertimos a arreglo lo que encuentre
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  // const [gastos, setGastos] = useState([
  //   ...(JSON.parse(localStorage.getItem("gastos")) ?? []),
  // ]);

  //Definir estado de Presupuesto
  const [presupuesto, setPresupuesto] = useState(
    //coge el contenido guardado y si no hay, es cero
    Number(localStorage.getItem('presupuesto')) ?? 0
  )

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  /* cuando deslices editar, comprueba si esta lleno
  llama a la ventana de añadir gasto */
  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)  
      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  }, [gastoEditar])

  //guardar los datos al recargar
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  //cargar el resto de datos guardados al recargar
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos])

  //si hay un presupuesto guardado, no mostrar pagina de def presup
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if(presupuestoLS > 0 ){
      setIsValidPresupuesto(true)
    }
  }, [])

  //filtrar gastos por categoria
  useEffect(() => {
    if(filtro) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro )
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {
    /* comprobar si el gasto existe  */
    if(gasto.id){
      /* recorre el array de gastos */
      const gastosActualizados = gastos.map(
        /* y si el gasto coincide se sobreescribe */
        gastoState => gastoState.id === gasto.id ? gasto : gastoState
      )
      setGastos(gastosActualizados)
      setGastoEditar({})
    /* si el id de gasto no existe, se crea uno nuevo */
    }else{
      /* generar un id único para el array de gasto (x, 100, ocio) */
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }

    /* cerrar ventana una vez se añade el gasto */
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  /* eliminar un gasto */
  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id != id);
    
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      {/*div className={modal && 'fijar'}*/}
      {/* Pasar la variable de componente en componente */}
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        isValidPresupuesto = {isValidPresupuesto}
        setIsValidPresupuesto = {setIsValidPresupuesto}
      />
      
      {/* Si el presupuesto es válido: */}
      {isValidPresupuesto && (
        <>
        <main>
          <Filtros
            filtro={filtro}
            setFiltro={setFiltro}
          />
          {/* se muestra el listado inferior de gastos */}
          <ListadoGastos
            gastos = {gastos}
            setGastoEditar = {setGastoEditar}
            eliminarGasto = {eliminarGasto}
            filtro = {filtro}
            gastosFiltrados = {gastosFiltrados}
          />
            {/* le pasamos el array de gastos */}
        </main>
        {/* Mostrar el icono de "mas" (añadir nuevo gasto) */}
        <div className='nuevo-gasto'>
          <img src={IconoNuevoGasto} alt="Icono Nuevo Gasto" onClick={handleNuevoGasto} />
        </div>
        </>
      )}

      { /* Cerrar ventana de añadir gasto */}
      {modal && <Modal 
        setModal = {setModal}
        animarModal = {animarModal}
        setAnimarModal = {setAnimarModal}
        guardarGasto = {guardarGasto}
        gastoEditar = {gastoEditar}
        setGastoEditar = {setGastoEditar}
      /> }
    </div>   
  )
}

export default App