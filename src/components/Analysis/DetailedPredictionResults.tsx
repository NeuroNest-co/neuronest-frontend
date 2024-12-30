import React from 'react';

interface DetailedPredictionResultsProps {
  predictions: {
    patientId: string;
    age: number;
    count: number;
  }[];
  distributions: {
    patientId: string;
    age: number;
    count: number;
  }[];
}

export default function DetailedPredictionResults({
  predictions,
  distributions,
}: DetailedPredictionResultsProps) {
  return (
    <div>
      <h2>Predictions</h2>
      {predictions.map((prediction, index) => (
        <div key={index}>
          <p>Patient ID: {prediction.patientId}</p>
          <p>Age: {prediction.age}</p>
          <p>Count: {prediction.count}</p>
        </div>
      ))}

      <h2>Distributions</h2>
      {distributions.map((distribution, index) => (
        <div key={index}>
          <p>Patient ID: {distribution.patientId}</p>
          <p>Age: {distribution.age}</p>
          <p>Count: {distribution.count}</p>
        </div>
      ))}
    </div>
  );
}