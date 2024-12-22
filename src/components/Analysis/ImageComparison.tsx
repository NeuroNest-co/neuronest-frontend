import React from 'react';

interface Finding {
  class_name: string;
  mean_score: number;
  max_score: number;
  min_score: number;
  count: number;
}

interface ImageComparisonProps {
  originalImage: string;
  segmentedImage: string;
  findings: Finding[];
}

export default function ImageComparison({ 
  originalImage, 
  segmentedImage, 
  findings 
}: ImageComparisonProps) {
  // Determine severity level based on mean_score
  const getSeverityLevel = (mean_score: number) => {
    if (mean_score < 0.3) return 'Low';
    if (mean_score < 0.7) return 'Medium';
    return 'High';
  };

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
          <h3 className="text-lg font-semibold mb-3">Segmented Image</h3>
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={segmentedImage}
              alt="Segmented medical image"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Findings */}
      {findings && findings.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold mb-3">Analysis Findings</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {findings.map((finding, index) => (
              <div key={index} className="p-3 bg-white rounded-lg shadow">
                <h5 className="text-sm font-semibold text-gray-700">{finding.class_name}</h5>
                <p className="text-sm text-gray-600">Lesions Detected: {finding.count}</p>
                <p className="text-sm text-gray-600">Severity Level: {getSeverityLevel(finding.mean_score)}</p>
                <p className="text-sm text-gray-600">Confidence: {(finding.max_score * 100).toFixed(2)}%</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
