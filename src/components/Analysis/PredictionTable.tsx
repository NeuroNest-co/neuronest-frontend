import React from 'react';

interface PredictionClass {
  patientId: string;
  age: number;
  count: number;
}

interface PredictionTableProps {
  predictions: PredictionClass[];
}

export default function PredictionTable({ predictions }: PredictionTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Patient ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Age
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Count
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {predictions.map((prediction, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {prediction.patientId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {prediction.age}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {prediction.count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}