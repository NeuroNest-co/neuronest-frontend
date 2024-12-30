import { useState } from 'react';
import { Filter, FileText } from 'lucide-react';
import Button from '../components/common/Button';
import ResultsTable from '../components/Results/ResultsTable';
import ResultsFilter from '../components/Results/ResultsFilter';
import ResultsStats from '../components/Results/ResultsStats';
import DetailedPredictionResults from '../components/Analysis/DetailedPredictionResults';
import { useAnalysis } from '../context/AnalysisContext';



export default function Results() {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const { analysisResults } = useAnalysis();

  
  if (!analysisResults) {
    return <div>No analysis results available.</div>;
  }
const {data} = analysisResults;
const {patientId, age, doctor_comment, date, original_image_url, predicted_image_url, metrics, pie_chart_data} = data;

const totalScans = parseInt(patientId.split('-').pop() || '0', 10); 
const pendingReview = 0;
const addressed = totalScans - pendingReview;
const highSeverity = metrics.filter((metric) => metric.class_name === 'lesion' && metric.count > 3).length;
const severity = metrics.reduce((acc, metric) => {
  if (metric.count >= 6) return 'High';
  if (metric.count >= 3) return 'Medium';
  return acc;
}, 'Low');

const lesionCount = metrics.filter(metric => metric.class_name === 'lesion').reduce((total, metric) => total + metric.count, 0);

  const dataVisualization = [
    {
      patientId: patientId,
      age : age,
      count: pie_chart_data.some(data => data.class === 'lesion') ? pie_chart_data.reduce((acc, data) => data.class === 'lesion' ? acc + data.count : acc, 0) : 0
    }
  ];

  const distribution = [{
    patientId: patientId,
    age: age,
    count: pie_chart_data.some(data => data.class === 'lesion') ? pie_chart_data.reduce((acc, data) => data.class === 'lesion' ? acc + data.count : acc, 0) : 0
  }];

  // Rest of the existing mock data
  const tableRecords = 
    {
      patientId: patientId,
      date: date,
      lesionCount: lesionCount,
      severity: severity,
      age: age,
      status: doctor_comment,
    }
  ;

  const stats = {
    totalScans: totalScans,
    addressed: addressed,
    highSeverity: highSeverity,
    pendingReview: pendingReview,
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
          <ResultsTable results={[tableRecords]} />
        </div>

        <DetailedPredictionResults
          predictions={dataVisualization}
          distributions={distribution}
        />
      </div>
    </div>
  );
}