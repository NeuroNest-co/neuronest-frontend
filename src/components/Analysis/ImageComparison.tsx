import React from 'react';

interface ImageComparisonProps {
  originalImage: string;
  segmentedImage: string | null;
  findings: {
    lesionCount: number;
    severity: 'Low' | 'Medium' | 'High';
    confidence: number;
  } | null;
}

export default function ImageComparison({ 
  originalImage, 
  segmentedImage, 
  findings 
}: ImageComparisonProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original Image */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Original Image</h3>
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={originalImage}
              alt="Original medical image"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Segmented Image */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Segmented Analysis</h3>
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100">
            {segmentedImage ? (
              <img
                src={segmentedImage}
                alt="Segmented analysis"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Analysis in progress...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Findings */}
      {findings && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold mb-3">Analysis Findings</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white rounded-lg shadow">
              <p className="text-sm text-gray-600">Lesions Detected</p>
              <p className="text-2xl font-bold text-indigo-600">{findings.lesionCount}</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow">
              <p className="text-sm text-gray-600">Severity Level</p>
              <p className="text-2xl font-bold text-indigo-600">{findings.severity}</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow">
              <p className="text-sm text-gray-600">Confidence</p>
              <p className="text-2xl font-bold text-indigo-600">{findings.confidence}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}