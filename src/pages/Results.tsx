import { useState } from 'react';
import { Filter, FileText } from 'lucide-react';
import Button from '../components/common/Button';
import ResultsTable from '../components/Results/ResultsTable';
import ResultsFilter from '../components/Results/ResultsFilter';
import ResultsStats from '../components/Results/ResultsStats';
import DetailedPredictionResults from '../components/Analysis/DetailedPredictionResults';

export default function Results() {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);

  // Mock data for predictions
  const mockPredictions = [
    {
      id: '1',
      name: 'Mucus',
      precision: 95.5,
      minScore: 85.0,
      maxScore: 98.5,
      mean: 92.3,
      mode: 94.0,
    },
    {
      id: '2',
      name: 'Lesions',
      precision: 88.7,
      minScore: 75.5,
      maxScore: 95.0,
      mean: 85.6,
      mode: 87.5,
    },
    {
      id: '3',
      name: 'Light',
      precision: 92.3,
      minScore: 82.0,
      maxScore: 97.0,
      mean: 89.8,
      mode: 91.0,
    },
  ];

  // Mock data for class distribution
  const mockDistributions = [
    { name: 'Mucus', percentage: 50 },
    { name: 'Lesions', percentage: 30 },
    { name: 'Light', percentage: 20 },
  ];

  // Rest of the existing mock data
  const mockResults = [
    {
      id: 1,
      patientId: 'P-2024-001',
      date: '2024-03-15',
      lesionCount: 3,
      severity: 'Medium',
      confidence: 89,
      status: 'Reviewed',
    },
    {
      id: 2,
      patientId: 'P-2024-002',
      date: '2024-03-14',
      lesionCount: 1,
      severity: 'Low',
      confidence: 95,
      status: 'Pending Review',
    },
    {
      id: 3,
      patientId: 'P-2024-003',
      date: '2024-03-13',
      lesionCount: 5,
      severity: 'High',
      confidence: 92,
      status: 'Reviewed',
    },
  ];

  const stats = {
    totalScans: 156,
    averageConfidence: 91,
    highSeverity: 23,
    pendingReview: 5,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analysis Results</h1>
            <p className="mt-2 text-gray-600">
              View and manage all cervical scan analysis results
            </p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              icon={Filter}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              Filter
            </Button>
            <Button
              variant="secondary"
              icon={FileText}
              onClick={() => {/* Implement export logic */}}
            >
              Export Report
            </Button>
          </div>
        </div>

        <ResultsStats stats={stats} />
      </div>

      {filterOpen && (
        <ResultsFilter
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
          onClose={() => setFilterOpen(false)}
        />
      )}

      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <ResultsTable results={mockResults} />
        </div>

        <DetailedPredictionResults
          predictions={mockPredictions}
          distributions={mockDistributions}
        />
      </div>
    </div>
  );
}