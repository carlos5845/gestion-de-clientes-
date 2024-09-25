// Función para convertir la fecha "DD/MM/YYYY" en un objeto Date
const convertirFecha = (fechaStr) => {
  const [dia, mes, año] = fechaStr.split("/").map(Number);
  return new Date(año, mes - 1, dia); // Mes en JavaScript es 0 indexado
};

// Heapsort
export const ordenarPorHeapSort = (array) => {
  const construirHeap = (array) => {
    let i = Math.floor(array.length / 2 - 1);
    while (i >= 0) {
      heapify(array, array.length, i);
      i--;
    }
  };

  const heapify = (array, length, i) => {
    let mayor = i;
    let izquierda = 2 * i + 1;
    let derecha = 2 * i + 2;

    // Comparar fechas de compra
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
    if (mayor !== i) {
      [array[i], array[mayor]] = [array[mayor], array[i]];
      heapify(array, length, mayor);
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
export const ordenarPorQuickSort = (array) => {
  if (array.length <= 1) {
    return array;
  }

  const pivote = array[array.length - 1]; // Tomamos el último elemento como pivote
  const izquierda = [];
  const derecha = [];

  // Comparar fechas de compra en lugar de montos
  for (let i = 0; i < array.length - 1; i++) {
    if (
      convertirFecha(array[i].fechaCompra) < convertirFecha(pivote.fechaCompra)
    ) {
      izquierda.push(array[i]);
    } else {
      derecha.push(array[i]);
    }
  }

  return [
    ...ordenarPorQuickSort(izquierda),
    pivote,
    ...ordenarPorQuickSort(derecha),
  ];
};
