import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import Button from '../common/Button';

interface UploadActionsProps {
  onFileSelect: (files: FileList) => void;
  canAnalyze: boolean;
  onAnalyze: () => void;
}

export default function UploadActions({ onFileSelect, canAnalyze }: UploadActionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      onFileSelect(files);
    }
    // Reset input value to allow selecting the same file again
    event.target.value = '';
  };

  return (
    <div className="flex space-x-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/tiff"
        className="hidden"
      />
      <Button
        icon={Upload}
        variant="secondary"
        onClick={handleFileSelect}
      >
        Select File
      </Button>
      {canAnalyze}
    </div>
  );
}
