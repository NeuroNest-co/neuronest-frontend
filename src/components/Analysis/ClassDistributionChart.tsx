import React from 'react';
import { Bar } from 'react-chartjs-2';

interface Distribution {
  patientId: string;
  age: number;
  count: number;
}

interface ClassDistributionChartProps {
  distributions: Distribution[];
}

export default function ClassDistributionChart({
  distributions,
}: ClassDistributionChartProps) {
  // Prepare data for the bar chart
  const data = {
    labels: distributions.map(dist => `Patient ${dist.patientId}`),
    datasets: [
      {
        label: 'Age',
        data: distributions.map(dist => dist.age),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Count',
        data: distributions.map(dist => dist.count),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Class Distribution Analysis</h3>
      <div className="w-full max-w-md mx-auto">
        <Bar data={data} options={options} />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {distributions.map((dist) => (
          <div key={dist.patientId} className="text-center">
            <p className="text-sm font-medium text-gray-600">Patient ID: {dist.patientId}</p>
            <p className="text-sm font-medium text-gray-600">Age: {dist.age}</p>
            <p className="text-2xl font-bold text-indigo-600">Count: {dist.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}