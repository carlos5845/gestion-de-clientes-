import PropTypes from "prop-types";
const TablaClientes = ({ clientes }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Fecha de compra</th>
          <th>Monto de compra</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente, indice) => (
          <tr key={indice}>
            <td>{cliente.nombre}</td>
            <td>{cliente.fecha}</td>
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
      fecha: PropTypes.string.isRequired,
      monto: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TablaClientes;
