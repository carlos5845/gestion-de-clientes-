import PropTypes from "prop-types";
import "../styles/aleatorio.css";

const Aleatorio = ({ clientes, setClientes }) => {
  // Función para desordenar aleatoriamente
  const desordenarAleatorio = () => {
    const aleatorio = [...clientes].sort(() => Math.random() - 0.5); // Algoritmo de mezcla aleatoria
    setClientes(aleatorio); // Actualiza el estado con los clientes desordenados
  };

  return (
    <button className="boton-desordenar" onClick={desordenarAleatorio}>
      Desordenar 
    </button>
  );
};

Aleatorio.propTypes = {
  clientes: PropTypes.array.isRequired, // Lista de clientes
  setClientes: PropTypes.func.isRequired, // Función para actualizar la lista de clientes
};

export default Aleatorio;
