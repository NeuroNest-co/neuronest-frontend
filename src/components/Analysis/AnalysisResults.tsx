import React from 'react';
import { Download, FileText } from 'lucide-react';
import Button from '../common/Button';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

ChartJS.register(ArcElement, Tooltip, Legend);

interface AnalysisResultsProps {
  results: {
    lesionCount: number;
    severity: 'Low' | 'Medium' | 'High';
    confidence: number;
    date: string;
  };
}

export default function AnalysisResults({ results }: AnalysisResultsProps) {
  const chartData = {
    labels: ['Healthy Tissue', 'Lesions'],
    datasets: [
      {
        data: [100 - results.confidence, results.confidence],
        backgroundColor: ['#4ADE80', '#EF4444'],
        borderColor: ['#22C55E', '#DC2626'],
        borderWidth: 1,
      },
    ],
  };

  const generatePDF = async () => {
    const element = document.getElementById('analysis-results');
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('analysis-report.pdf');
  };

  return (
    <div id="analysis-results" className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            icon={FileText}
            onClick={generatePDF}
          >
            Export PDF
          </Button>
          <Button
            icon={Download}
            onClick={() => {/* Implement download logic */}}
          >
            Download Images
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Key Findings</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Lesions Detected:</span>
              <span className="font-semibold">{results.lesionCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Severity Level:</span>
              <span className="font-semibold">{results.severity}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Analysis Date:</span>
              <span className="font-semibold">{results.date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Confidence Score:</span>
              <span className="font-semibold">{results.confidence}%</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Tissue Analysis</h3>
          <div className="w-full max-w-xs mx-auto">
            <Doughnut data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}