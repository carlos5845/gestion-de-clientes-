import PropTypes from "prop-types";

const CargarJson = ({ setClientes }) => {
    const manejarCargarArchivo = (e) => {
        const archivo = e.target.files[0];
        const lector = new FileReader();
        lector.onload = (evento) => {
            const datos = JSON.parse(evento.target.result);
            const clientesFormateados = datos.map(cliente => ({
                nombre: cliente.nombre,
                fecha: cliente["fecha de compra"],
                monto: cliente["monto de compra"]
            }));
            setClientes(clientesFormateados);
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

