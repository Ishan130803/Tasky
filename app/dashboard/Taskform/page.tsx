import { FC } from "react";
import { taskObj } from "@/types/taskClass";
import { TaskInputLayout } from "./TaskInput";
interface ITaskFormProps extends taskObj {
  newTask:boolean;
};

const TaskForm: FC<ITaskFormProps> = () => {
    return (
        <>
            <TaskInputLayout></TaskInputLayout>
        </>
    );
} 
export default TaskForm
