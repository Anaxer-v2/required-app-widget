import React, { useState, useRef, useEffect } from 'react';
import { ReactQuestionFactory } from 'survey-react-ui';
import { QuestionTagboxModel } from 'survey-core';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

interface CustomTagBoxWidgetProps {
  question: QuestionTagboxModel;
}

const CustomTagBoxWidget: React.FC<CustomTagBoxWidgetProps> = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleValueChange = (value: string) => {
    const currentValue = Array.isArray(question.value) ? question.value : [];
    if (currentValue.includes(value)) {
      question.value = currentValue.filter(v => v !== value);
    } else {
      question.value = [...currentValue, value];
    }
  };

  const handleRemove = (valueToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    question.value = (question.value || []).filter((v: string) => v !== valueToRemove);
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

  const unselectedChoices = question.visibleChoices.filter(
    choice => !(question.value || []).includes(choice.value)
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="w-full min-h-[46px] text-base flex flex-wrap items-center border rounded-md p-2 cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex flex-wrap gap-2 items-center flex-grow">
          {(question.value || []).map((value: string) => (
            <div key={value} className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
              {question.visibleChoices.find(c => c.value === value)?.text}
              <button 
                onClick={(e) => handleRemove(value, e)} 
                className="ml-2 focus:outline-none"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          {(!question.value || question.value.length === 0) && (
            <span className="text-gray-500">Select options</span>
          )}
        </div>
        <div className="ml-auto">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
      {isOpen && unselectedChoices.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-[300px] overflow-y-auto">
          {unselectedChoices.map((choice) => (
            <div
              key={choice.value}
              className="p-2 hover:bg-gray-100 cursor-pointer"
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

ReactQuestionFactory.Instance.registerQuestion("tagbox", (props: any) => {
  return <CustomTagBoxWidget question={props.question} />;
});

export default CustomTagBoxWidget;