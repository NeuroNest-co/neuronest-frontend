import React, { useState } from 'react';
import DropZone from '../components/Upload/DropZone';
import ImagePreview from '../components/Upload/ImagePreview';
import UploadActions from '../components/Upload/UploadActions';
import ImageComparison from '../components/Analysis/ImageComparison';
import AnalysisResults from '../components/Analysis/AnalysisResults';

export default function Upload() {
  const [files, setFiles] = useState<File[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<{
    segmentedImage: string;
    findings: {
      lesionCount: number;
      severity: 'Low' | 'Medium' | 'High';
      confidence: number;
      date: string;
    };
  } | null>(null);

  const handleFileUpload = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleFileSelect = (fileList: FileList) => {
    const newFiles = Array.from(fileList);
    handleFileUpload(newFiles);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setAnalysisResults({
        segmentedImage: URL.createObjectURL(files[0]), // In real app, this would be the processed image
        findings: {
          lesionCount: 3,
          severity: 'Medium',
          confidence: 89,
          date: new Date().toLocaleDateString(),
        },
      });
      setAnalyzing(false);
    }, 2000);
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
          canAnalyze={files.length > 0 && !analyzing}
          onAnalyze={handleAnalyze}
        />

        <DropZone onFileUpload={handleFileUpload} />

        {files.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Uploaded Images</h2>
            <ImagePreview files={files} onRemove={handleRemoveFile} />
          </div>
        )}

        {analyzing && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Analyzing images...</p>
          </div>
        )}

        {analysisResults && (
          <div className="space-y-8">
            <ImageComparison
              originalImage={URL.createObjectURL(files[0])}
              segmentedImage={analysisResults.segmentedImage}
              findings={analysisResults.findings}
            />
            <AnalysisResults results={analysisResults.findings} />
          </div>
        )}
      </div>
    </div>
  );
}