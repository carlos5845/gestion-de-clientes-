import { useState } from "react";
import FormularioCliente from "./components/FormularioCliente";
import TablaClientes from "./components/TablaClientes";
import {
  ordenarPorHeapSort,
  ordenarPorQuickSort,
} from "./components/implementacion-algoritmos";
import CargarJson from "./components/CargarJson";

function App() {
  const [clientes, setClientes] = useState([]);

  const agregarCliente = (cliente) => {
    setClientes([...clientes, cliente]);
  };

  const manejarOrdenarHeapSort = () => {
    const ordenado = ordenarPorHeapSort([...clientes]);
    setClientes(ordenado);
  };

  const manejarOrdenarQuickSort = () => {
    const ordenado = ordenarPorQuickSort([...clientes]);
    setClientes(ordenado);
  };

  return (
    <div>
      <h1>Gestión de Clientes</h1>
      <FormularioCliente agregarCliente={agregarCliente} />
      <button onClick={manejarOrdenarHeapSort}>Ordenar por Heapsort</button>
      <button onClick={manejarOrdenarQuickSort}>Ordenar por Quicksort</button>
      <CargarJson setClientes={setClientes} />
      <TablaClientes clientes={clientes} />
    </div>
  );
}

export default App;
