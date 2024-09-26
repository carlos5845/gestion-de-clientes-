import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/FormularioCliente.css";

// Función para convertir la fecha "YYYY-MM-DD" a "DD/MM/YYYY"
const convertirFecha = (fecha) => {
  const [año, mes, dia] = fecha.split("-");
  return `${dia}/${mes}/${año}`;
};

const FormularioCliente = ({ agregarCliente }) => {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [monto, setMonto] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (nombre && fecha && monto) {
      const fechaFormateada = convertirFecha(fecha); // Convertir fecha a "DD/MM/YYYY"
      agregarCliente({
        nombre,
        fechaCompra: fechaFormateada,
        monto: parseFloat(monto),
      });
      setNombre("");
      setFecha("");
      setMonto("");
    }
  };

  return (
    <form className="formulario-cliente" onSubmit={manejarEnvio}>
      <input
        className="input-cliente"
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        className="input-cliente"
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />
      <input
        className="input-cliente"
        type="number"
        placeholder="Monto de compra"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
      />
      <button className="boton-cliente" type="submit">
        Agregar
      </button>
    </form>
  );
};

FormularioCliente.propTypes = {
  agregarCliente: PropTypes.func.isRequired,
};

export default FormularioCliente;
