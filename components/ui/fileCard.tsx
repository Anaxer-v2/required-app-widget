import React from 'react';
import { Trash2, ExternalLink } from 'lucide-react';

interface FileWithUrl extends File {
  localUrl?: string;
}

interface FileCardProps {
  file: FileWithUrl;
  onRemove: (file: FileWithUrl) => void;
}

const FileCard: React.FC<FileCardProps> = ({ file, onRemove }) => {
  if (!file || !(file instanceof File)) {
    console.error('Invalid file object:', file);
    console.error('File type:', typeof file);
    console.error('File properties:', Object.keys(file));
    return null;
  }

  console.log('Rendering FileCard for:', file.name);

  const getFileIcon = (file: File) => {
    if (!file.name) return null;
    
    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <span className="text-red-500 font-bold mr-2">PDF</span>;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        return <span className="text-green-500 font-bold mr-2">IMG</span>;
      default:
        return <span className="text-gray-500 font-bold mr-2">FILE</span>;
    }
  };

  const handleFileClick = () => {
    if (file.localUrl) {
      window.open(file.localUrl, '_blank');
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg mb-2">
      <div className="flex items-center cursor-pointer" onClick={handleFileClick}>
        {getFileIcon(file)}
        <span className="text-sm text-gray-700">{file.name || 'Unnamed File'}</span>
        <ExternalLink size={16} className="ml-2 text-gray-500" />
      </div>
      <div className="flex items-center">
        <svg className="w-5 h-5 text-black mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
        <button
          onClick={() => onRemove(file)}
          className="text-gray-500 hover:text-red-700"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default FileCard;
