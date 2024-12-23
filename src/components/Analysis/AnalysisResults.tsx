import { Download, FileText } from 'lucide-react';
import Button from '../common/Button';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Finding {
  class_name: string;
  mean_score: number;
  max_score: number;
  min_score: number;
  count: number;
}

interface AnalysisResultsProps {
  findings?: Finding[];
  pieChartData: {
    class: string;
    count: number;
  }[];
}

export default function AnalysisResults({ findings, pieChartData }: AnalysisResultsProps) {
  if (!findings || findings.length === 0) {
    return <div>Loading analysis results...</div>;
  }

  const totalCount = pieChartData.reduce((sum, data) => sum + data.count, 0);
  const pieData = {
    labels: pieChartData.map((data) => data.class),
    datasets: [
      {
        data: pieChartData.map((data) => data.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const pieChartWithPercentages = pieChartData.map((data) => ({
    ...data,
    percentage: ((data.count / totalCount) * 100).toFixed(2), // Round to 2 decimal places
  }));

  const downloadPDF = async () => {
    const doc = new jsPDF();
    const element = document.getElementById('analysis-results');
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, 10, 180, 160);
      doc.save('analysis-results.pdf');
    }
  };

  return (
    <div id="analysis-results" className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-3">Analysis Results</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Findings Table */}
        {/* <div>
          <h4 className="text-md font-semibold mb-2">Findings</h4>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-1">Class Name</th>
                <th className="border border-gray-300 px-2 py-1">Confidence</th>
                <th className="border border-gray-300 px-2 py-1">Count</th>
              </tr>
            </thead>
            <tbody>
              {findings.map((finding, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-2 py-1">{finding.class_name}</td>
                  <td className="border border-gray-300 px-2 py-1">{finding.max_score}</td>
                  <td className="border border-gray-300 px-2 py-1">{finding.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}

        {/* Pie Chart */}
        <div>
          <h4 className="text-md font-semibold mb-2">Pie Chart</h4>
          <Doughnut data={pieData} />
        </div>
        
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {pieChartWithPercentages.map((dist) => (
          <div key={dist.class} className="text-center">
            <p className="text-lg font-medium text-gray-600">{dist.class}</p>
            <p className="text-2xl font-bold text-indigo-600">{dist.percentage}%</p>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end space-x-4">
        <Button onClick={downloadPDF} icon={Download}>
          Download PDF
        </Button>
        <Button icon={FileText}>View Report</Button>
      </div>
    </div>
  );
}
