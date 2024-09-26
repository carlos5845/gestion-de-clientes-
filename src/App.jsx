import { useState } from "react";
import FormularioCliente from "./components/FormularioCliente";
import TablaClientes from "./components/TablaClientes";
import {
  ordenarPorHeapSort,
  ordenarPorQuickSort,
  busquedaBinaria, // Importar la función de búsqueda binaria
} from "./components/implementacion-algoritmos";
import CargarJson from "./components/CargarJson";
import GraficoEstadisticas from "./components/GraficoEstadisticas"; // Componente de gráficos
import "./App.css";
function App() {
  const [clientes, setClientes] = useState([]);
  const [criterioOrden, setCriterioOrden] = useState("fecha"); // Criterio de orden: "fecha" o "monto"
  const [tiempos, setTiempos] = useState([0, 0]); // Para almacenar los tiempos de Heapsort y Quicksort
  const [resultadoBusqueda, setResultadoBusqueda] = useState(null); // Para almacenar el resultado de la búsqueda
  const [valorBusqueda, setValorBusqueda] = useState(""); // Para almacenar el valor de búsqueda

  const agregarCliente = (cliente) => {
    setClientes([...clientes, cliente]);
  };

  // Función para medir el tiempo de ejecución
  const medirTiempoEjecucion = (funcion, datos) => {
    const inicio = performance.now(); // Tiempo inicial
    funcion([...datos], criterioOrden); // Ejecuta la función con el criterio de orden
    const fin = performance.now(); // Tiempo final
    return fin - inicio; // Devuelve el tiempo en milisegundos
  };

  const manejarOrdenar = (ordenarFuncion, tipoOrden) => {
    const tiempo = medirTiempoEjecucion(ordenarFuncion, clientes);
    const ordenado = ordenarFuncion([...clientes], criterioOrden); // Pasa el criterio de orden (fecha o monto)
    setClientes(ordenado);

    // Actualiza el estado de tiempos
    if (tipoOrden === "heapsort") {
      setTiempos([tiempo, tiempos[1]]); // Actualiza solo el tiempo de Heapsort
    } else if (tipoOrden === "quicksort") {
      setTiempos([tiempos[0], tiempo]); // Actualiza solo el tiempo de Quicksort
    }
  };

  const manejarOrdenarHeapSort = () => {
    manejarOrdenar(ordenarPorHeapSort, "heapsort");
  };

  const manejarOrdenarQuickSort = () => {
    manejarOrdenar(ordenarPorQuickSort, "quicksort");
  };

  // Función para desordenar (invertir) la lista de clientes
  const desordenarClientes = () => {
    const desordenado = [...clientes].reverse(); // Invertir el orden para simular el peor de los casos
    setClientes(desordenado);
    setTiempos([0, 0]); // Resetear los tiempos ya que no estamos ejecutando un algoritmo aquí
  };

  // Función para manejar la búsqueda binaria
  const manejarBusquedaBinaria = () => {
    const resultado = busquedaBinaria(clientes, criterioOrden, valorBusqueda);
    setResultadoBusqueda(resultado);
  };

  return (
    <div className="app-container">
      <h1>Gestión de Clientes</h1>
      <FormularioCliente agregarCliente={agregarCliente} />
      {/* Selector para escoger el criterio de orden */}
      <div className="ordenar-container">
        <label htmlFor="criterio">Ordenar por: </label>
        <select
          id="criterio"
          value={criterioOrden}
          onChange={(e) => setCriterioOrden(e.target.value)}
        >
          <option value="fecha">Fecha de compra</option>
          <option value="monto">Monto de compra</option>
        </select>
      </div>
      <button className="boton-ordenar" onClick={manejarOrdenarHeapSort}>
        Ordenar por Heapsort
      </button>
      <button className="boton-ordenar" onClick={manejarOrdenarQuickSort}>
        Ordenar por Quicksort
      </button>
      {/* Botón para desordenar los clientes */}
      <button className="boton-desordenar" onClick={desordenarClientes}>
        Desordenar (Peor Caso)
      </button>
      {/* Sección para búsqueda binaria */}
      <div className="busqueda-container">
        <div className="busqueda-container-interno">
          <label htmlFor="criterioBusqueda">Buscar por: </label>
          <select
            id="criterioBusqueda"
            value={criterioOrden}
            onChange={(e) => setCriterioOrden(e.target.value)}
          >
            <option value="fecha">Fecha de compra</option>
            <option value="monto">Monto de compra</option>
          </select>
          <input
            type="text"
            placeholder={`Buscar por ${criterioOrden}`}
            value={valorBusqueda}
            onChange={(e) => setValorBusqueda(e.target.value)}
          />
          <button className="boton-buscar" onClick={manejarBusquedaBinaria}>
            Buscar
          </button>
        </div>
        <div className="resultado-busqueda">
          {resultadoBusqueda !== null && (
            <p>
              {resultadoBusqueda === -1
                ? "No encontrado"
                : `Encontrado en la posición ${resultadoBusqueda + 1}`}
            </p>
          )}
        </div>
      </div>
      <CargarJson setClientes={setClientes} />
      <TablaClientes clientes={clientes} />
      {/* Aquí se renderiza el gráfico de estadísticas */}
      <h2>Estadísticas de Tiempos de Ejecución</h2>
      <GraficoEstadisticas tiempos={tiempos} />
    </div>
  );
}

export default App;
