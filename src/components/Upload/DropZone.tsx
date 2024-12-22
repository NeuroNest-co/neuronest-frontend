import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

export default function DropZone({ onFileUpload }: { onFileUpload: (files: File[]) => void }) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const formData = new FormData();

    acceptedFiles.forEach((file) => {
      formData.append('file', file);
    });

    console.log('Uploading files:', acceptedFiles);
    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload files');
      }

      const result = await response.json();
      console.log(result);

      if (result.success) {
        onFileUpload(result.data); // Pass the data from the response upward
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.tiff'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive
          ? 'Drop the files here...'
          : 'Drag & drop medical images here, or click to select files'}
      </p>
      <p className="mt-1 text-xs text-gray-500">
        Supported formats: JPEG, PNG, TIFF
      </p>
    </div>
  );
}
