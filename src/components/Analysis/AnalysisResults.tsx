import { Download, FileText } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Interfaces to type the data
interface Finding {
  class_name: string;
  mean_score: number;
  max_score: number;
  min_score: number;
  count: number;
}

interface PieChartData {
  class: string;
  count: number;
}

interface AnalysisResultsProps {
  findings?: Finding[];
  pieChartData: PieChartData[];
}

export default function AnalysisResults({ findings, pieChartData }: AnalysisResultsProps) {
  // Check: Display a message if no data is available
  if (!findings || findings.length === 0) {
    return <div>Loading analysis results...</div>;
  }

  // Calculate the total count for percentages in the pie chart
  const totalCount = pieChartData.reduce((sum, data) => sum + data.count, 0);

  // Prepare data for the pie chart
  const pieData = {
    labels: pieChartData.map((data) => data.class),
    datasets: [
      {
        data: pieChartData.map((data) => data.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  // Add percentages for each class
  // const pieChartWithPercentages = pieChartData.map((data) => ({
  //   ...data,
  //   percentage: ((data.count / totalCount) * 100).toFixed(2),
  // }));

  // Function to download the report as a PDF
  const downloadPDF = async () => {
    const doc = new jsPDF();
    const element = document.getElementById('analysis-results');
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, 10, 180, 160);
      doc.save('analysis-results.pdf');
    } else {
      console.error("Element 'analysis-results' not found.");
    }
  };

  return (
    <div id="analysis-results" className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-3">Analysis Results</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Results Table */}
        <div>
          <h4 className="text-md font-semibold mb-2">Findings</h4>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-1">Class Name</th>
                <th className="border border-gray-300 px-2 py-1">Max Score</th>
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
        </div>

        {/* Pie Chart */}
        <div className="flex justify-center items-center">
          <div style={{ width: '200px', height: '200px' }}>
            <h4 className="text-md font-semibold mb-2 text-center">Pie Chart</h4>
            <Doughnut
              data={pieData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={downloadPDF}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <Download className="mr-2" /> Download PDF
        </button>
        <button className="flex items-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          <FileText className="mr-2" /> View Report
        </button>
      </div>
    </div>
  );
}
