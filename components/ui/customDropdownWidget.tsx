import React, { useState, useRef, useEffect } from 'react';
import { ReactQuestionFactory } from 'survey-react-ui';
import { QuestionDropdownModel } from 'survey-core';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CustomDropdownWidgetProps {
  question: QuestionDropdownModel;
}

const CustomDropdownWidget: React.FC<CustomDropdownWidgetProps> = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleValueChange = (value: string) => {
    question.value = value;
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="w-full h-[46px] text-base flex items-center border rounded-md px-3 cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex-grow truncate">
          {question.value ? (
            <span>{question.choices.find(c => c.value === question.value)?.text}</span>
          ) : (
            <span className="text-gray-500">Select an option</span>
          )}
        </div>
        <div className="ml-auto">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-[300px] overflow-y-auto">
          {question.choices.map((choice) => (
            <div
              key={choice.value}
              className={`p-2 hover:bg-gray-100 cursor-pointer ${
                question.value === choice.value ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleValueChange(choice.value)}
            >
              {choice.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ReactQuestionFactory.Instance.registerQuestion("dropdown", (props: any) => {
  return <CustomDropdownWidget question={props.question} />;
});

export default CustomDropdownWidget;
