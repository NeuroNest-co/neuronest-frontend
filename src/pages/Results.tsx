import { useEffect, useState } from 'react';
import { Filter, FileText } from 'lucide-react';
import Button from '../components/common/Button';
import ResultsTable from '../components/Results/ResultsTable';
import ResultsFilter from '../components/Results/ResultsFilter';
import ResultsStats from '../components/Results/ResultsStats';
import DetailedPredictionResults from '../components/Analysis/DetailedPredictionResults';

export default function Results() {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [allResponses, setAllResponses] = useState<ResponseData[]>([]);
  const [loading, setLoading] = useState(true);

  // Type definitions
  interface Metric {
    class_name: string;
    count: number;
  }

  interface PieChartData {
    class: string;
    count: number;
  }

  interface ResponseData {
    metrics: Metric[];
    pie_chart_data: PieChartData[];
    patientId: string;
    date: string;
    age: number;
    doctor_comment: string;
  }

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/all_data/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setAllResponses(result.data || []);
        } else {
          console.error('Error in API response:', result.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!allResponses.length) {
    return <div>No analysis results available.</div>;
  }

  // Helper function to calculate stats
  const calculateStats = (responses: ResponseData[]) => {
    const allMetrics = responses.flatMap((response) => response.metrics, []);
    const allDoctorComments = responses.map((response) => response.doctor_comment || '');
  
    const totalScans = responses.length;
  
    const pendingReview = allDoctorComments.filter((comment) => comment.includes('Pending')).length;
    const addressed = totalScans - pendingReview;
  
    const highSeverity = allMetrics.filter((metric) => metric.class_name === 'lesion' && metric.count > 3).length;
  
    return {
      totalScans,
      addressed,
      highSeverity,
      pendingReview,
    };
  };
  
  // Calculate stats
  const stats = calculateStats(allResponses);

  const dataVisualization = allResponses.flatMap((response) =>
    (response.pie_chart_data || []).map((data) => ({
      patientId: response.patientId,
      age: response.age,
      count: data.class === 'lesion' ? data.count : 0,
    }))
  );
  

  const resultsTableData = allResponses.map((response) => {
    const metrics = response.metrics || [];
  
    const lesionMetrics = metrics?.filter((metric) => metric.class_name === 'lesion') || [];
  
    const lesionCount = lesionMetrics.reduce((acc, metric) => acc + (metric?.count || 0), 0);
  
    const severity = lesionCount >= 3
      ? 'High'
      : lesionCount >= 2
      ? 'Medium'
      : 'Low';
  
    return {
      patientId: response.patientId,
      date: response.date,
      lesionCount,
      severity,
      age: response.age,
      status: response.doctor_comment,
    };
  });
  
  

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analysis Results</h1>
            <p className="mt-2 text-gray-600">View and manage all cervical scan analysis results</p>
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
              onClick={() => {
                // Export report logic (to be implemented)
              }}
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
          <ResultsTable results={resultsTableData} />
        </div>

        <DetailedPredictionResults
          distributions={dataVisualization}
        />
      </div>
    </div>
  );
}
