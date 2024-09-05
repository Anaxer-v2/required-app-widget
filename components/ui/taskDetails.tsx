import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import { customTheme } from '@/customSurveyTheme';

interface Task {
  id: string;
  title: string;
  instruction?: string;
  formJson?: any;
}

interface TaskDetailsProps {
  task: Task;
  onBack: () => void;
  onComplete: () => void; // Add this new prop
}

export default function TaskDetails({ task, onBack, onComplete }: TaskDetailsProps) {
  const survey = task.formJson ? new Model(task.formJson) : null;

  useEffect(() => {
    if (survey) {
      survey.applyTheme(customTheme);

      // Modify file upload question properties
      const fileQuestion = survey.getQuestionByName("yourFileQuestionName");
      if (fileQuestion) {
        fileQuestion.fileOrPhotoPlaceholder = "Click to upload or drag and drop";
        fileQuestion.maxSize = 5; // Set maximum number of files
      }

      // Add custom render for maximum files text
      survey.onAfterRenderQuestion.add((sender, options) => {
        if (options.question.getType() === "file") {
          const maxFilesText = document.createElement("div");
          maxFilesText.innerText = "(Maximum 5 files)";
          maxFilesText.style.color = "#888";
          maxFilesText.style.fontSize = "0.8em";
          options.htmlElement.querySelector(".sv_q_file")?.appendChild(maxFilesText);
        }
      });

      // Handle file upload
      survey.onUploadFiles.add((survey, options) => {
        console.log("Files to upload:", options.files);
        // Add your file upload logic here
      });

      // Add onComplete event handler
      survey.onComplete.add(() => {
        console.log("Survey completed");
        onComplete(); // Call the onComplete function passed from the parent
      });
    }
  }, [survey, onComplete]);

  return (
    <div className="space-y-2">
      <button
        onClick={onBack}
        className="mt-7 text-black"
        aria-label="Go back"
      >
        <ArrowLeft className="w-7 h-7" />
      </button>
      
      <h2 className="text-[20px] font-semibold text-[#1c2a3a]">{task.title}</h2>
      
      {task.instruction && task.instruction.trim() !== "" && (
        <p className="text-base font-light text-[#1C2A3A]">{task.instruction}</p>
      )}
      <br></br>
      <div className="min-h-[450px] bg-white custom-survey-container no-margin-survey">
        {survey ? (
          <div className="survey-wrapper">
            <Survey model={survey} />
          </div>
        ) : (
          <p>No form available for this task.</p>
        )}
      </div>
    </div>
  );
}