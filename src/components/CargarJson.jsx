import PropTypes from "prop-types";

const CargarJson = ({ setClientes }) => {
  const manejarCargarArchivo = (e) => {
    const archivo = e.target.files[0];
    const lector = new FileReader();
    lector.onload = (evento) => {
      const datos = JSON.parse(evento.target.result);

      // No es necesario convertir las fechas, ya están en el formato correcto
      const clientesFormateados = datos.map((cliente) => ({
        nombre: cliente.nombre,
        fechaCompra: cliente["fecha de compra"], // No realizar la conversión de fecha
        monto: cliente["monto de compra"],
      }));

      setClientes(clientesFormateados); // Actualizar el estado con los clientes formateados
    };
    lector.readAsText(archivo);
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={manejarCargarArchivo} />
      <button>Adjuntar archivo JSON</button>
    </div>
  );
};

CargarJson.propTypes = {
  setClientes: PropTypes.func.isRequired,
};

export default CargarJson;
