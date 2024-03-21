import React from "react";
import { taskObj } from "@/types/taskClass";
import GridRow from "./GridRow";
import { v4 as uuidv4 } from "uuid";

const TaskGrid = (props: { taskList: taskObj[] }) => {
  return (
    <>
      {props.taskList.map((value, index) => {
        if (value.subTasks.length == 0) {
          return <GridRow key={uuidv4()} assignedTask={value}></GridRow>;
        } else {
          return (
            <>
              <GridRow key={uuidv4()} assignedTask={value}></GridRow>
              {!value.collapsed && (
                <TaskGrid key={uuidv4()} taskList={value.subTasks} />
              )}
            </>
          );
        }
      })}
    </>
  );
};

export default TaskGrid;
