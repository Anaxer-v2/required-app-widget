import React from 'react';
import { ReactQuestionFactory } from 'survey-react-ui';
import { QuestionBooleanModel } from 'survey-core';

interface CustomBooleanWidgetProps {
  question: QuestionBooleanModel;
}

const CustomBooleanWidget: React.FC<CustomBooleanWidgetProps> = ({ question }) => {
  return (
    <div className="w-full inline-flex rounded-md shadow-sm h-[46px]" role="group">
      <button
        type="button"
        className={`flex-1 px-4 text-sm font-medium border rounded-l-lg ${
          question.value === true
            ? 'bg-black text-white'
            : 'bg-white text-black hover:bg-gray-100'
        }`}
        onClick={() => question.value = true}
      >
        Yes
      </button>
      <button
        type="button"
        className={`flex-1 px-4 text-sm font-medium border-t border-b border-r rounded-r-lg ${
          question.value === false
            ? 'bg-black text-white'
            : 'bg-white text-black hover:bg-gray-100'
        }`}
        onClick={() => question.value = false}
      >
        No
      </button>
    </div>
  );
};

ReactQuestionFactory.Instance.registerQuestion("boolean", (props: any) => {
  return <CustomBooleanWidget question={props.question} />;
});

export default CustomBooleanWidget;
