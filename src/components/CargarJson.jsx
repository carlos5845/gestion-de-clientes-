import PropTypes from "prop-types";
import { useRef, useState } from "react";
import "../styles/CargarJson.css";

const CargarJson = ({ setClientes }) => {
  const [nombreArchivo, setNombreArchivo] = useState(""); // Estado para almacenar el nombre del archivo
  const inputFileRef = useRef(null); // Crear referencia para el input

  const manejarCargarArchivo = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setNombreArchivo(archivo.name); // Guardar el nombre del archivo en el estado
      const lector = new FileReader();
      lector.onload = (evento) => {
        const datos = JSON.parse(evento.target.result);

        const clientesFormateados = datos.map((cliente) => ({
          nombre: cliente.nombre,
          fechaCompra: cliente["fecha de compra"], // No realizar la conversión de fecha
          monto: cliente["monto de compra"],
        }));

        setClientes(clientesFormateados); // Actualizar el estado con los clientes formateados
      };
      lector.readAsText(archivo);
    }
  };

  const manejarClickBoton = () => {
    inputFileRef.current.click(); // Simular clic en el input de archivo
  };

  return (
    <div className="cargar-json">
      {/* Input de archivo oculto */}
      <input
        ref={inputFileRef} // Asignar la referencia al input
        className="input-json"
        type="file"
        accept=".json"
        onChange={manejarCargarArchivo}
        style={{ display: "none" }} // Ocultar el input de archivo
      />
      {/* Botón personalizado */}
      <button className="boton-json" onClick={manejarClickBoton}>
        Adjuntar archivo JSON
      </button>

      {/* Mostrar el nombre del archivo seleccionado */}
      {nombreArchivo && <p className="nombre-archivo">{nombreArchivo}</p>}
    </div>
  );
};

CargarJson.propTypes = {
  setClientes: PropTypes.func.isRequired,
};

export default CargarJson;
