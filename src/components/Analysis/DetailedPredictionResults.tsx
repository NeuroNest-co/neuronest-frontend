import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DetailedPredictionResultsProps {
  distributions: {
    age: number;
    count: number;
  }[];
}

export default function DetailedPredictionResults({
  distributions,
}: DetailedPredictionResultsProps) {
  const uniqueAges = Array.from(new Set(distributions.map((dist) => dist.age)));

  const chartData = {
    labels: uniqueAges.map((age) => `Age: ${age}`),
    datasets: [
      {
        label: 'Count',
        data: uniqueAges.map((age) => distributions.filter((dist) => dist.age === age).reduce((acc, curr) => acc + curr.count, 0)),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return (
    <div  style={{ width: '400px', height: '500px', margin: '0 auto' }}>
      
      <h2 style={{ textAlign: 'center' }} >Distribution</h2>
      <Pie data={chartData} />
    </div>
  );
}
