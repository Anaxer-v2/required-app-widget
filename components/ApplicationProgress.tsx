'use client';

import React, { useEffect, useState, useCallback } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Circle, Loader2, ArrowLeft } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'
import TaskDetails from '@/components/ui/taskDetails'
import '../fonts.css';

interface Task {
  id: string;
  title: string;
  instruction?: string;
  formJson?: any;
  completed: boolean;
}

interface ApplicationProgressProps {
  clientId: string;
}

export default function ApplicationProgress() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const calculateProgress = useCallback(() => {
    const completedCount = tasks.filter(task => task.completed).length;
    return tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);
  }, [tasks]);

  useEffect(() => {
    const fetchTasks = async () => {
      const clientId = '6900b86b-c29c-46a4-85cd-df0fc91eb2f2'; // Hardcoded client ID
      try {
        const response = await fetch(`https://api.required.app/api:35hUIBHe/widget/requirements/${clientId}`, {
          method: 'GET',
          headers: {
            'X-Data-Source': 'test'
          }
        });
        const data = await response.json();
        setTasks(data.map((item: any) => ({ 
          id: item.id, 
          title: item.title,
          instruction: item.instruction,
          formJson: item.metadata?.form_json,
          completed: false
        })));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskComplete = useCallback(() => {
    if (selectedTask) {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === selectedTask.id ? { ...task, completed: true } : task
        )
      );
      setSelectedTask(null);
    }
  }, [selectedTask]);

  const handleTaskClick = useCallback((task: Task) => {
    if (!task.completed) {
      setSelectedTask(task);
    }
  }, []);

  const isTaskCompleted = useCallback((taskId: string) => 
    tasks.find(task => task.id === taskId)?.completed || false
  , [tasks]);

  return (
    <div className="min-h-screen w-full bg-white sm:bg-gray-100 p-0">
      <Header />
      <div className="w-full max-w-[700px] mx-auto mt-10 px-0 sm:px-4">
        <Card className="shadow-none border-none sm:shadow-lg sm:border">
          <CardContent className="px-5 sm:px-10 py-6 space-y-10">
            {selectedTask ? (
              <TaskDetails 
                task={selectedTask} 
                onBack={() => setSelectedTask(null)} 
                onComplete={handleTaskComplete} 
              />
            ) : (
              <>
                <Progress 
                  value={calculateProgress()} 
                  max={100}
                  className="w-full h-2 mt-7" 
                />
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-[20px] font-semibold text-[#1c2a3a]">Almost there!</h2>
                    <p className="text-base font-light text-[#1C2A3A]">
                      We just need a few more details to finalise your rental property application.
                    </p>
                  </div>
                  
                  {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                      <Loader2 className="w-12 h-12 animate-spin text-black" />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {tasks.map((task) => (
                        <div 
                          key={task.id}
                          onClick={() => handleTaskClick(task)}
                          className={`flex items-center space-x-3 p-4 border rounded-lg 
                                     ${task.completed 
                                       ? 'bg-[#e9fcd4] cursor-default' 
                                       : 'cursor-pointer hover:border-black hover:bg-gray-50'} 
                                     transition-all duration-200 shadow-sm`}
                        >
                          {task.completed 
                            ? <Image src="https://required-widget.s3.amazonaws.com/check.svg" alt="Completed" width={16} height={16} />
                            : <Circle className="w-4 h-4 text-gray-400" />
                          }
                          <span className={`text-base font-medium ${task.completed ? 'text-[#08660d]' : 'text-[#1C2A3A]'}`}>
                            {task.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="p-6 flex justify-center">
            <p className="text-sm text-gray-500 flex items-center">
              Powered by
              <Link href="https://required.app" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Image
                  src="https://required-widget.s3.amazonaws.com/requiredLogoBlack.svg"
                  alt="Required Logo"
                  width={72}
                  height={18}
                  className="ml-1"
                />
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="w-full bg-black shadow-[0_2px_4px_-1px_rgba(0,0,0,0.3)]">
      <div className="w-full mx-auto px-4">
        <Image
          src="https://required-widget.s3.amazonaws.com/requiredLogo.svg"
          alt="Required Logo"
          width={108}
          height={28}
          className="py-4"
        />
      </div>
    </header>
  )
}