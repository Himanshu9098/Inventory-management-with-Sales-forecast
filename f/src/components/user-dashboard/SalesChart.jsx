import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const SalesChart = (id) => {
  const chartRef = useRef(null); // Reference to the chart canvas
  const chartInstance = useRef(null); // Reference to the chart instance
  const user = {user:id}
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5555/dashboard/sales/`,{params:user})
      .then((response) => {
        setData(response.data)
        console.log(data);
        const labels = data.map((entry) => entry.Date);
        const sales = data.map((entry) => entry.Sales);

        const chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Total Sales',
              data: sales,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              fill: false,
            },
          ],
        };

        // Destroy the previous chart instance
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        // Create a new chart instance
        chartInstance.current = new Chart(chartRef.current, {
          type: 'line',
          data: chartData,
        });
      })
      .catch((error) => {
        console.error('Error fetching sales data:', error);
      });
  }, []);

  return (
    <div className='content-center' style={{ width: '80vw', height: '50vh' }}>
      <canvas ref={chartRef} />
    </div>
  );
}

export default SalesChart;
