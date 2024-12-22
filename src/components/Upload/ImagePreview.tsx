import { X } from 'lucide-react';

interface ImagePreviewProps {
  file: File;
  onRemove: () => void;
}

export default function ImagePreview({ file, onRemove }: ImagePreviewProps) {
  if (!file) return null;

  return (
    <div className="relative group w-full max-w-xs mx-auto">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
        <img
          src={URL.createObjectURL(file)}
          alt="Uploaded"
          className="object-contain max-h-full max-w-full" // Ensures the image is contained within the div and centered
        />
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-500 truncate text-center">{file.name}</p>
    </div>
  );
}
