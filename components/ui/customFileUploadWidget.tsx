import React, { useRef, useState, DragEvent } from 'react';
import { ReactQuestionFactory } from 'survey-react-ui';
import { QuestionFileModel } from 'survey-core';
import { Upload } from 'lucide-react';
import FileCard from './fileCard';

interface CustomFileUploadWidgetProps {
  question: QuestionFileModel;
}

interface FileWithUrl extends File {
  localUrl?: string;
}

const CustomFileUploadWidget: React.FC<CustomFileUploadWidgetProps> = ({ question }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileWithUrl[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles).filter(isValidFile).map(file => {
        const fileWithUrl = file as FileWithUrl;
        fileWithUrl.localUrl = URL.createObjectURL(file);
        return fileWithUrl;
      });

      if (question.allowMultiple) {
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
        question.value = [...files, ...newFiles];
      } else {
        setFiles(newFiles.slice(0, 1));
        question.value = newFiles[0] || null;
      }
    }
  };

  const isValidFile = (file: File): boolean => {
    if (!question.acceptedTypes) {
      return true;
    }
    const acceptedTypes = question.acceptedTypes.split(',');
    return acceptedTypes.some(type => file.type.match(type.trim()));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const removeFile = (fileToRemove: FileWithUrl) => {
    setFiles(prevFiles => prevFiles.filter(f => f !== fileToRemove));
    question.value = files.filter(f => f !== fileToRemove);
    if (fileToRemove.localUrl) {
      URL.revokeObjectURL(fileToRemove.localUrl);
    }
  };

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer mb-4 flex flex-col items-center justify-center transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        style={{ height: '200px' }}
        onClick={triggerFileInput}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e.target.files)}
          accept={question.acceptedTypes || '*'}
          multiple={question.allowMultiple}
          style={{ display: 'none' }}
        />
        <Upload className="h-12 w-12 text-gray-400 mb-3" />
        <p className="text-sm text-gray-600">
          {files.length > 0 ? 'Click or drag to add more files' : 'Drag and drop files here, or click to select'}
        </p>
      </div>
      {files.map((file, index) => (
        <FileCard
          key={index}
          file={file}
          onRemove={() => removeFile(file)}
        />
      ))}
    </div>
  );
};

ReactQuestionFactory.Instance.registerQuestion("file", (props: any) => {
  return <CustomFileUploadWidget question={props.question as QuestionFileModel} />;
});

export default CustomFileUploadWidget;