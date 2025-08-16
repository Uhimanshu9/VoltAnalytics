import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ScatterController,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { VoltageData } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ScatterController
);

interface VoltageChartProps {
  data: VoltageData;
}

const VoltageChart: React.FC<VoltageChartProps> = ({ data }) => {
  console.log(data)
  const chartData = {
    labels: data.timestamps,
    datasets: [
      {
        label: 'Voltage',
        data: data.Voltages,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 1,
        pointHoverRadius: 5,
      },
      {
        label: '5-Day Moving Average (MA5)',
        data: data.ma5,
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 1,
        pointHoverRadius: 5,
        borderDash: [5, 5],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: 'Voltage Analysis Over Time',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        padding: 20,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#3B82F6',
        borderWidth: 1,
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Timestamp',
          font: {
            weight: 'bold' as const,
          },
        },
        ticks: {
          maxTicksLimit: 10,
          maxRotation: 45,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Voltage (V)',
          font: {
            weight: 'bold' as const,
          },
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Voltage Chart</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
  <span>Peaks: {data?.peaks?.length ?? 0}</span>
</div>
<div className="flex items-center">
  <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
  <span>Lows: {data?.lows?.length ?? 0}</span>
</div>
        </div>
      </div>
      <div className="h-96">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default VoltageChart;