import React, { useState } from 'react';
import UploadActions from '../components/Upload/UploadActions';
import ImagePreview from '../components/Upload/ImagePreview';
import ImageComparison from '../components/Analysis/ImageComparison';
import AnalysisResults from '../components/Analysis/AnalysisResults';

export default function Upload() {
  const BASE_URL = 'http://127.0.0.1:8000';
  const [file, setFile] = useState<File | null>(null); // Handle a single file
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const handleFileSelect = (fileList: FileList) => {
    if (fileList.length > 0) {
      setFile(fileList[0]); // Keep only the first file
    }
  };

  const handleRemoveFile = () => {
    setFile(null); // Clear the file
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert('Please upload an image before analyzing');
      return;
    }
    setAnalyzing(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${BASE_URL}/predict/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image analysis failed');
      }

      const data = await response.json();
      setAnalysisResults({
        originalImage: `${BASE_URL}${data.data.original_image_url}`,
        segmentedImage: `${BASE_URL}${data.data.predicted_image_url}`,
        findings: data.data.metrics,
        pieChartData: data.data.pie_chart_data,
      });
    } catch (error) {
      console.error('Error during analysis:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Image Analysis</h1>
          <p className="mt-2 text-gray-600">
            Upload medical images for AI-powered cervical lesion detection and analysis.
          </p>
        </div>

        <UploadActions
          onFileSelect={handleFileSelect}
          canAnalyze={false} // Disable the analyze button in UploadActions
          onAnalyze={() => {}}
        />

        {file && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Uploaded Image</h2>
            <ImagePreview file={file} onRemove={handleRemoveFile} />

            {/* Analyze Button placed below the image preview */}
            <div className="mt-4 text-center">
              <button
                onClick={handleAnalyze}
                className={`px-6 py-2 rounded-lg font-semibold ${
                  analyzing
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-500'
                }`}
                disabled={analyzing}
              >
                {analyzing ? 'Analyzing...' : 'Analyze Image'}
              </button>
            </div>
          </div>
        )}

        {analysisResults && (
          <div className="space-y-8">
            <ImageComparison
              originalImage={analysisResults.originalImage}
              segmentedImage={analysisResults.segmentedImage}
              findings={analysisResults.findings}
            />
            <AnalysisResults
              findings={analysisResults.findings}
              pieChartData={analysisResults.pieChartData}
            />
          </div>
        )}
      </div>
    </div>
  );
}
