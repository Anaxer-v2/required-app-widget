import React from 'react';
import { ReactQuestionFactory } from 'survey-react-ui';
import { QuestionRadiogroupModel } from 'survey-core';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface CustomRadioGroupWidgetProps {
  question: QuestionRadiogroupModel;
}

const CustomRadioGroupWidget: React.FC<CustomRadioGroupWidgetProps> = ({ question }) => {
  return (
    <RadioGroup
      value={question.value}
      onValueChange={(value) => question.value = value}
      className="flex flex-col space-y-2"
    >
      {question.choices.map((choice) => (
        <div key={choice.value} className="flex items-center">
          <RadioGroupItem 
            value={choice.value} 
            id={`radio-${question.name}-${choice.value}`}
            className="h-6 w-6 mr-2"
          />
          <Label htmlFor={`radio-${question.name}-${choice.value}`} className="text-base">
            {choice.text}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

ReactQuestionFactory.Instance.registerQuestion("radiogroup", (props: any) => {
  return <CustomRadioGroupWidget question={props.question} />;
});

export default CustomRadioGroupWidget;