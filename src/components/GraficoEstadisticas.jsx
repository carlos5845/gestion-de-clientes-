import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import PropTypes from "prop-types";

const GraficoEstadisticas = ({ tiempos }) => {
  const chartRef = useRef(null);
  let chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destruir el gráfico existente antes de crear uno nuevo
      }

      // Verificar que los tiempos sean válidos antes de renderizar el gráfico
      if (tiempos[0] >= 0 || tiempos[1] >= 0) {
        const ctx = chartRef.current.getContext("2d");
        chartInstance.current = new Chart(ctx, {
          type: "pie", // Gráfico de barras
          data: {
            labels: ["Heapsort", "Quicksort"], // Etiquetas para los algoritmos
            datasets: [
              {
                label: "Tiempo de ejecución (ms)", // Título de la gráfica
                data: tiempos, // Datos de los tiempos
                backgroundColor: [
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                ],
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true, // El eje Y comienza desde 0
              },
            },
          },
        });
      }
    }
  }, [tiempos]); // Solo se actualiza cuando los tiempos cambian

  // Renderizar un canvas vacío si los tiempos no son válidos
  return (
    <canvas
      ref={chartRef}
      style={{ display: tiempos[0] >= 0 || tiempos[1] >= 0 ? "block" : "none" }}
    ></canvas>
  );
};

GraficoEstadisticas.propTypes = {
  tiempos: PropTypes.arrayOf(PropTypes.number).isRequired, // Array de tiempos de ejecución
};

export default GraficoEstadisticas;
