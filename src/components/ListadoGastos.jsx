import Gasto from './Gasto'
 
const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados}) => {
  return (
    <div className='listado-gastos contenedor'>     
      {
        /* si hay un filtro activo, iteramos sobre los gastos del filtro */
        filtro ? (
          <>
          <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos de esta categoria'}</h2>
          {gastosFiltrados.map(gasto => (
            <Gasto 
            key = {gasto.id}
            gasto = {gasto}
            setGastoEditar = {setGastoEditar}
            eliminarGasto = {eliminarGasto}
            />
          ))}
          </>
          /* si no hay ningun filtro, iteramos sobre todos los gastos */
        ) : (
          <>
          <h2>{gastos.length ? 'Gastos' : 'Todavía no has hecho ningún gasto'}</h2>
          {gastos.map(gasto => (
            <Gasto 
            key={gasto.id}
            gasto={gasto}
            setGastoEditar={setGastoEditar}
            eliminarGasto = {eliminarGasto}
            />
          ))}
          </>
        )
      } 
    </div>
  )
}
 
export default ListadoGastos 