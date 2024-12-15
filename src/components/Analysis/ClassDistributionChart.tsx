import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ClassDistribution {
  name: string;
  percentage: number;
}

interface ClassDistributionChartProps {
  distributions: ClassDistribution[];
}

export default function ClassDistributionChart({ distributions }: ClassDistributionChartProps) {
  const data = {
    labels: distributions.map(d => d.name),
    datasets: [
      {
        data: distributions.map(d => d.percentage),
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',  // Mucosa
          'rgba(255, 99, 132, 0.8)',  // Lesions
          'rgba(255, 206, 86, 0.8)',  // Light
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Class Distribution',
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Class Distribution Analysis</h3>
      <div className="w-full max-w-md mx-auto">
        <Pie data={data} options={options} />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {distributions.map((dist) => (
          <div key={dist.name} className="text-center">
            <p className="text-sm font-medium text-gray-600">{dist.name}</p>
            <p className="text-2xl font-bold text-indigo-600">{dist.percentage}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}