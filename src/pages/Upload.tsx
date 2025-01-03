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
  const BASE_URL = 'https://cancer-detect.onrender.com';
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
          <h1 className="text-4xl font-bold text-gray-900">AI-Powered Image Analysis</h1>
          <p className="mt-2 text-lg text-gray-600">
            Upload medical images for AI-powered cervical lesion detection and analysis. Get comprehensive results instantly.
          </p>
        </div>

        {/* Patient Information Form */}
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Patient Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Age Input */}
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Patient Age
              </label>
              <input
                id="age"
                type="number"
                value={age ?? ''}
                onChange={(e) => setAge(parseInt(e.target.value))}
                placeholder="Enter patient's age"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Doctor's Comment Input */}
            <div>
              <label
                htmlFor="doctor-comment"
                className="block text-sm font-medium text-gray-700"
              >
                Comment
              </label>
              <textarea
                id="doctor-comment"
                value={doctorComment ?? ''}
                onChange={(e) => setDoctorComment(e.target.value)}
                placeholder="Enter doctor's comment"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows={1}
              ></textarea>
            </div>
          </div>

          <div className="flex justify-center items-center mt-8">
  <UploadActions
    onFileSelect={handleFileSelect}
    canAnalyze={!!file && !analyzing} 
    onAnalyze={handleAnalyze}
  />
</div>

        </div>

        {/* Image Preview Section */}
        {file && (
  <div className="mt-8 flex flex-col items-center">
    <h2 className="text-xl font-semibold mb-4">Uploaded Image</h2>
    <ImagePreview file={file} onRemove={handleRemoveFile} />

    <div className="mt-6">
      <button
        onClick={handleAnalyze}
        className={`px-6 py-2 rounded-lg font-semibold text-center ${
          analyzing
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : 'bg-indigo-600 text-white hover:bg-indigo-500'
        }`}
        disabled={analyzing}
      >
        {analyzing ? (
          <>
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/200/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Analyzing...
          </>
        ) : (
          'Analyze Image'
        )}
      </button>
    </div>
  </div>
)}


        {/* Display Results after Analysis */}
        {analysisResults && (
          <div className="space-y-8 mt-8">
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
