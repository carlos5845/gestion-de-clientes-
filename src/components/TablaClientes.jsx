import PropTypes from "prop-types";
import "../styles/TablaClientes.css";
const TablaClientes = ({ clientes }) => {
  return (
    <table className="tabla-clientes">
      <thead>
        <tr>
          <th>ID</th> {/* Nueva columna para mostrar el índice o posición */}
          <th>Nombre</th>
          <th>Fecha de compra</th>
          <th>Monto de compra</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente, indice) => (
          <tr key={indice}>
            <td>{indice + 1}</td>{" "}
            {/* Mostrar el índice + 1 (para que empiece desde 1) */}
            <td>{cliente.nombre}</td>
            <td>{cliente.fechaCompra}</td>
            <td>{cliente.monto}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TablaClientes.propTypes = {
  clientes: PropTypes.arrayOf(
    PropTypes.shape({
      nombre: PropTypes.string.isRequired,
      fechaCompra: PropTypes.string.isRequired, // Cambiado a fechaCompra
      monto: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TablaClientes;
