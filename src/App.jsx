import { useState } from "react";
import FormularioCliente from "./components/FormularioCliente";
import TablaClientes from "./components/TablaClientes";
import {
  ordenarPorHeapSort,
  ordenarPorQuickSort,
} from "./components/implementacion-algoritmos";
import CargarJson from "./components/CargarJson";
import GraficoEstadisticas from "./components/GraficoEstadisticas"; // Componente de gráficos

function App() {
  const [clientes, setClientes] = useState([]);
  const [tiempos, setTiempos] = useState([0, 0]); // Para almacenar los tiempos de Heapsort y Quicksort

  const agregarCliente = (cliente) => {
    setClientes([...clientes, cliente]);
  };

  // Función para medir el tiempo de ejecución
  const medirTiempoEjecucion = (funcion, datos) => {
    const inicio = performance.now(); // Tiempo inicial
    funcion([...datos]); // Ejecuta la función
    const fin = performance.now(); // Tiempo final
    return fin - inicio; // Devuelve el tiempo en milisegundos
  };

  const manejarOrdenarHeapSort = () => {
    const tiempoHeapsort = medirTiempoEjecucion(ordenarPorHeapSort, clientes);
    const ordenado = ordenarPorHeapSort([...clientes]);
    setClientes(ordenado);
    setTiempos([tiempoHeapsort, tiempos[1]]); // Actualiza solo el tiempo de Heapsort
  };

  const manejarOrdenarQuickSort = () => {
    const tiempoQuicksort = medirTiempoEjecucion(ordenarPorQuickSort, clientes);
    const ordenado = ordenarPorQuickSort([...clientes]);
    setClientes(ordenado);
    setTiempos([tiempos[0], tiempoQuicksort]); // Actualiza solo el tiempo de Quicksort
  };

  return (
    <div>
      <h1>Gestión de Clientes</h1>
      <FormularioCliente agregarCliente={agregarCliente} />
      <button onClick={manejarOrdenarHeapSort}>Ordenar por Heapsort</button>
      <button onClick={manejarOrdenarQuickSort}>Ordenar por Quicksort</button>
      <CargarJson setClientes={setClientes} />
      <TablaClientes clientes={clientes} />
      {/* Aquí se renderiza el gráfico de estadísticas */}
      <h2>Estadísticas de Tiempos de Ejecución</h2>
      <GraficoEstadisticas tiempos={tiempos} />{" "}
      {/* Pasamos los tiempos al gráfico */}
    </div>
  );
}

export default App;
