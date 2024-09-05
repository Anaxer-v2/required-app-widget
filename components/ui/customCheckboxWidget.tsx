import React from 'react';
import { ReactQuestionFactory } from 'survey-react-ui';
import { QuestionCheckboxModel } from 'survey-core';
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface CustomCheckboxWidgetProps {
  question: QuestionCheckboxModel;
}

const CustomCheckboxWidget: React.FC<CustomCheckboxWidgetProps> = ({ question }) => {
  const handleChange = (checked: boolean, value: string) => {
    const currentValue = Array.isArray(question.value) ? question.value : [];
    if (checked) {
      question.value = [...currentValue, value];
    } else {
      question.value = currentValue.filter((v: string) => v !== value);
    }
    // Prevent event propagation
    event?.stopPropagation();
  };

  return (
    <div className="flex flex-col space-y-2">
      {question.choices.map((choice) => (
        <div key={choice.value} className="flex items-center h-8">
          <Checkbox
            id={`checkbox-${question.name}-${choice.value}`}
            checked={(question.value || []).includes(choice.value)}
            onCheckedChange={(checked) => handleChange(checked as boolean, choice.value)}
            className="h-6 w-6 mr-2"
          />
          <Label 
            htmlFor={`checkbox-${question.name}-${choice.value}`} 
            className="text-base"
          >
            {choice.text}
          </Label>
        </div>
      ))}
    </div>
  );
};

ReactQuestionFactory.Instance.registerQuestion("checkbox", (props: any) => {
  return <CustomCheckboxWidget question={props.question} />;
});

export default CustomCheckboxWidget;
