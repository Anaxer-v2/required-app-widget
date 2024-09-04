import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Task {
  id: string;
  title: string;
  instruction?: string;
  metadata?: {
    download_link?: string;
    acknowledgement_type?: string;
    acknowledgement_description?: string;
  };
}

interface TaskDetailsProps {
  task: Task;
  onBack: () => void;
}

export default function TaskDetails({ task, onBack }: TaskDetailsProps) {
  return (
    <div className="space-y-2"> {/* Changed from space-y-6 to space-y-2 */}
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
      
      <div className="h-[350px]"></div> {/* Added 450px div */}
      
      <Button className="w-full">Continue</Button>
    </div>
  );
}