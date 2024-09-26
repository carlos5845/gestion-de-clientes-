import PropTypes from "prop-types";
import { convertirFecha } from "./implementacion-algoritmos"; // Asegúrate de que tienes esta función en un archivo común de utilidades si no está aquí.
import "../styles/DesordenarClientes.css";
const DesordenarClientes = ({ clientes, setClientes, criterioOrden }) => {
  const desordenarClientes = () => {
    const desordenado = [...clientes].sort((a, b) => {
      if (criterioOrden === "fecha") {
        // Orden inverso por fecha
        return convertirFecha(b.fechaCompra) - convertirFecha(a.fechaCompra);
      } else if (criterioOrden === "monto") {
        // Orden inverso por monto
        return parseFloat(b.monto) - parseFloat(a.monto);
      }
      return 0;
    });
    setClientes(desordenado);
  };

  return (
    <button className="boton-desordenar" onClick={desordenarClientes}>
      Desordenar para el peor caso
    </button>
  );
};

DesordenarClientes.propTypes = {
  clientes: PropTypes.array.isRequired, // Clientes a desordenar
  setClientes: PropTypes.func.isRequired, // Función para actualizar los clientes
  criterioOrden: PropTypes.string.isRequired, // Criterio de orden (fecha o monto)
};

export default DesordenarClientes;
