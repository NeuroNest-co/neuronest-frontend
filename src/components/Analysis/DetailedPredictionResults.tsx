import PredictionTable from './PredictionTable';
import ClassDistributionChart from './ClassDistributionChart';

interface DetailedPredictionResultsProps {
  predictions: {
    id: string;
    name: string;
    precision: number;
    minScore: number;
    maxScore: number;
    mean: number;
    mode: number;
  }[];
  distributions: {
    name: string;
    percentage: number;
  }[];
}

export default function DetailedPredictionResults({
  predictions,
  distributions,
}: DetailedPredictionResultsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Detailed Analysis Results</h2>
        <p className="text-gray-600 mb-6">
          Comprehensive breakdown of prediction results and class distributions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Prediction Metrics</h3>
          <PredictionTable predictions={predictions} />
        </div>
        <div>
          <ClassDistributionChart distributions={distributions} />
        </div>
      </div>
    </div>
  );
}