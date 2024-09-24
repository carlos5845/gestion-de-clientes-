import { useState } from "react";
import PropTypes from "prop-types";

const FormularioCliente = ({ agregarCliente }) => {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [monto, setMonto] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (nombre && fecha && monto) {
      agregarCliente({ nombre, fecha, monto: parseFloat(monto) });
      setNombre("");
      setFecha("");
      setMonto("");
    }
  };

  return (
    <form onSubmit={manejarEnvio}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />
      <input
        type="number"
        placeholder="Monto de compra"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

FormularioCliente.propTypes = {
  agregarCliente: PropTypes.func.isRequired,
};

export default FormularioCliente;
