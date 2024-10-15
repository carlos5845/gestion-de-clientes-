// Función para convertir la fecha "DD/MM/YYYY" en un objeto Date
const convertirFecha = (fechaStr) => {
  const [dia, mes, año] = fechaStr.split("/").map(Number);
  return new Date(año, mes - 1, dia); // Mes en JavaScript es 0 indexado
};

// Heapsort
export const ordenarPorHeapSort = (array, criterio) => {
  const heapify = (array, length, i) => {
    let mayor = i;
    let izquierda = 2 * i + 1;
    let derecha = 2 * i + 2;

    if (criterio === "fecha") {
      if (
        izquierda < length &&
        convertirFecha(array[izquierda].fechaCompra) >
          convertirFecha(array[mayor].fechaCompra)
      ) {
        mayor = izquierda;
      }
      if (
        derecha < length &&
        convertirFecha(array[derecha].fechaCompra) >
          convertirFecha(array[mayor].fechaCompra)
      ) {
        mayor = derecha;
      }
    } else if (criterio === "monto") {
      if (
        izquierda < length &&
        parseFloat(array[izquierda].monto) > parseFloat(array[mayor].monto)
      ) {
        mayor = izquierda;
      }
      if (
        derecha < length &&
        parseFloat(array[derecha].monto) > parseFloat(array[mayor].monto)
      ) {
        mayor = derecha;
      }
    }

    if (mayor !== i) {
      [array[i], array[mayor]] = [array[mayor], array[i]];
      heapify(array, length, mayor);
    }
  };

  const construirHeap = (array) => {
    let i = Math.floor(array.length / 2 - 1);
    while (i >= 0) {
      heapify(array, array.length, i);
      i--; 
    }
  };

  construirHeap(array);

  let final = array.length - 1;
  while (final >= 0) {
    [array[0], array[final]] = [array[final], array[0]];
    heapify(array, final, 0);
    final--;
  }

  return array;
};

// Quicksort
export const ordenarPorQuickSort = (array, criterio) => {
  if (array.length <= 1) {
    return array;
  }

  const pivote = array[array.length - 1]; // Tomamos el último elemento como pivote
  const izquierda = [];
  const derecha = [];

  // Comparar según el criterio de ordenación
  for (let i = 0; i < array.length - 1; i++) {
    if (criterio === "fecha") {
      if (
        convertirFecha(array[i].fechaCompra) <
        convertirFecha(pivote.fechaCompra)
      ) {
        izquierda.push(array[i]);
      } else {
        derecha.push(array[i]);
      }
    } else if (criterio === "monto") {
      if (parseFloat(array[i].monto) < parseFloat(pivote.monto)) {
        izquierda.push(array[i]);
      } else {
        derecha.push(array[i]);
      }
    }
  }

  return [
    ...ordenarPorQuickSort(izquierda, criterio),
    pivote,
    ...ordenarPorQuickSort(derecha, criterio),
  ];
};

// Busqueda Binaria
export const busquedaBinaria = (array, criterio, valor) => {
  let inicio = 0;
  let fin = array.length - 1;

  // Asegurarse de que el array esté ordenado antes de realizar la búsqueda binaria
  array.sort((a, b) => {
    if (criterio === "fecha") {
      return convertirFecha(a.fechaCompra) - convertirFecha(b.fechaCompra);
    } else if (criterio === "monto") {
      return parseFloat(a.monto) - parseFloat(b.monto);
    }
    return 0;
  });

  // Convertir el valor de búsqueda según el criterio
  if (criterio === "fecha") {
    valor = convertirFecha(valor).getTime();
  } else if (criterio === "monto") {
    valor = parseFloat(valor);
  }

  while (inicio <= fin) {
    const medio = Math.floor((inicio + fin) / 2);
    let valorMedio;

    if (criterio === "fecha") {
      valorMedio = convertirFecha(array[medio].fechaCompra).getTime();
    } else if (criterio === "monto") {
      valorMedio = parseFloat(array[medio].monto);
    }

    if (valorMedio === valor) {
      return medio; // Encontrado
    } else if (valorMedio < valor) {
      inicio = medio + 1;
    } else {
      fin = medio - 1;
    }
  }

  return -1; // No encontrado
};
