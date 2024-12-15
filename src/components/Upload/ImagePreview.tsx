import { X } from 'lucide-react';

interface ImagePreviewProps {
  files: File[];
  onRemove: (index: number) => void;
}

export default function ImagePreview({ files, onRemove }: ImagePreviewProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files.map((file, index) => (
        <div key={index} className="relative group">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
            <img
              src={URL.createObjectURL(file)}
              alt={`Upload ${index + 1}`}
              className="object-cover"
            />
            <button
              onClick={() => onRemove(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500 truncate">{file.name}</p>
        </div>
      ))}
    </div>
  );
}