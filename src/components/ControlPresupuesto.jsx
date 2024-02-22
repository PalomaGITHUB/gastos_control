import {useEffect} from 'react'
import { useState} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
 
const ControlPresupuesto = ({gastos, presupuesto, setGastos, setPresupuesto, setIsValidPresupuesto}) => {

    const [porcentaje, setPorcentaje] = useState(0)
    /* controlar datos de los gastos, presupuesto... */
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    /* controlar lo gastado */
    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0)
        /* calcular lo disponible */
        const totalDisponible = presupuesto - totalGastado

        //calcular el porcentaje gastado con solo dos decimales
        const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2);

        setDisponible(totalDisponible)
        setGastado(totalGastado)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1200);
    }, [gastos])

    /* numeros a euros */
    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-ES', {
            style: "currency",
            currency: 'EUR'
        })
    }

    //resetear app
    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?')
        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                {/* gráfica de gasto */}
                <CircularProgressbar
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#DC2626' : '#8f76b4',
                    trailColor: '#e3d9f3',
                    textColor: porcentaje > 100 ? '#DC2626' : '#8f76b4'
                })}
                value={porcentaje}
                //mostrar el porcentaje gastado en la grafica
                text={`${porcentaje}% gastado`}
                />
            </div>
            <div className='contenido-presupuesto'>
                <button className='reset-app' type='button' onClick={handleResetApp}>
                    Reiniciar
                </button>
                <p><span>Presupuesto: </span> {formatearCantidad(presupuesto)}</p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span> {formatearCantidad(disponible)}</p>
                <p><span>Gastado: </span> {formatearCantidad(gastado)}</p>
            </div>
        </div>
    )
}

export default ControlPresupuesto