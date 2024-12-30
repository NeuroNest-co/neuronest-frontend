import { useState } from 'react';
import UploadActions from '../components/Upload/UploadActions';
import ImagePreview from '../components/Upload/ImagePreview';
import ImageComparison from '../components/Analysis/ImageComparison';
import AnalysisResults from '../components/Analysis/AnalysisResults';
import { useAnalysis } from '../context/AnalysisContext';

export interface Metric {
  class_name: string;
  mean_score: number;
  max_score: number;
  min_score: number;
  count: number;
}

export interface PieChartData {
  class: string;
  count: number;
}

export interface AnalysisResponse {
  success: boolean;
  message: string;
  data: {
    patientId: string;
    age: number;
    doctor_comment: string;
    date: string;
    original_image_url: string;
    predicted_image_url: string;
    metrics: Metric[];
    pie_chart_data: PieChartData[];
  };
}

export default function Upload() {
  const BASE_URL = 'http://127.0.0.1:8000';
  const [file, setFile] = useState<File | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [doctorComment, setDoctorComment] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const { analysisResults, setAnalysisResults } = useAnalysis();

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
    formData.append('age', String(age));
    formData.append('doctor_comment', doctorComment || '');

    try {
      const response = await fetch(`${BASE_URL}/predict/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image analysis failed');
      }

      const data: AnalysisResponse = await response.json();
      setAnalysisResults(data);
      
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

        <input 
        type="number" 
        value={age ?? ''}
        onChange={(e) => setAge(parseInt(e.target.value))}
        placeholder="Patient Age"
      />
      <textarea
        value={doctorComment ?? ''}
        onChange={(e) => setDoctorComment(e.target.value)}
        placeholder="Doctor's Comment"
      />
        <UploadActions
          onFileSelect={handleFileSelect}
          canAnalyze={!!file && !analyzing} // Enable the analyze button if file is selected and not analyzing
          onAnalyze={handleAnalyze}
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
              originalImage={`${BASE_URL}${analysisResults.data.original_image_url}`}
              segmentedImage={`${BASE_URL}${analysisResults.data.predicted_image_url}`}
              findings={analysisResults.data.metrics}
            />
            <AnalysisResults
              findings={analysisResults.data.metrics}
              pieChartData={analysisResults.data.pie_chart_data}
            />
          </div>
        )}
      </div>
    </div>
  );
}