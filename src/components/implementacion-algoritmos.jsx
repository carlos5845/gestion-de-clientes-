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
    if (izquierda < length && array[izquierda].monto > array[mayor].monto) {
      mayor = izquierda;
    }
    if (derecha < length && array[derecha].monto > array[mayor].monto) {
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

  const pivote = array[array.length - 1];
  const izquierda = [];
  const derecha = [];

  for (let i = 0; i < array.length - 1; i++) {
    if (array[i].monto < pivote.monto) {
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
