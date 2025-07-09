import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function App() {
  const [prediction, setPrediction] = useState('');
  const [chartData, setChartData] = useState(null);
  const [file, setFile] = useState(null);
  const [seasonality, setSeasonality] = useState('30'); // Default seasonality value

  let myChart;
  let actualSalesChart;

  const handleFileUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('seasonality', seasonality);

      axios.post('http://localhost:8000/predict', formData)
        .then(response => {
          if (myChart) {
            myChart.destroy();
          }

          // Extract SARIMA prediction data
          const sarimaData = response.data.forecast.sarimaData;
          setPrediction(sarimaData[0]);

          // Extract actual sales data
          const ctx1 = document.getElementById('myChart');

          const actualSalesData = response.data.forecast.actualSalesLast30Days;

          // Update both charts
          myChart = new Chart(ctx1, {
            type: 'line',
            data: {
              labels: response.data.forecast.labels,
              datasets: [
                {
                  label: 'SARIMA Predictions',
                  data: sarimaData,
                  borderColor: 'blue',
                  fill: false,
                },
              ],
            },
          });

          // Render the actual sales chart
          renderActualSalesChart(response.data.forecast.prev_labels, actualSalesData);
        })
        .catch(error => {
          console.error('File Upload Error:', error);
        });
    }
  };

  useEffect(() => {
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [file]);


  const renderActualSalesChart = (labels, data) => {
    if (actualSalesChart) {
      actualSalesChart.destroy();
    }

    const ctx = document.getElementById('actualSalesChart');
    actualSalesChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Actual Sales',
            data: data,
            borderColor: 'green',
            fill: false,
          },
        ],
      },
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSeasonalityChange = (event) => {
    setSeasonality(event.target.value);
  };

  return (
    <div className="App">
      <h1>SARIMA Model Prediction</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <label for="seasonality">Seasonality: </label>
      <select id="seasonality" onChange={handleSeasonalityChange}>
        <option value="30">Monthly</option>
        <option value="7">Weekly</option>
      </select>
      <button onClick={handleFileUpload}>Upload</button>
      <div>
        <h2>Actual Sales for Last 30 Days</h2>
        <canvas id="actualSalesChart" />
      </div>

      <div>
        <h2>SARIMA Predictions Chart</h2>
        <canvas id="myChart" />
      </div>
    </div>
  );
}

export default App;
