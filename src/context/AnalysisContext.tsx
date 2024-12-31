import React, { createContext, useContext, useState } from 'react';
import { AnalysisResponse } from '../pages/Upload';

interface AnalysisContextType {
  analysisResults: AnalysisResponse | null;
  setAnalysisResults: (results: AnalysisResponse | null) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [analysisResults, setAnalysisResults] = useState<AnalysisResponse | null>(null);

  return (
    <AnalysisContext.Provider value={{ analysisResults, setAnalysisResults }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}