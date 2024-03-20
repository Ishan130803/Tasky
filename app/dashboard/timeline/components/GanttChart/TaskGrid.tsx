import React from "react";
import { taskObj } from "@/types/taskClass";
import GridRow from "./GridRow";

const TaskGrid = (props: { taskList: taskObj[] }) => {
  return (
    <>
      {props.taskList.map((value, index) => {
        if (value.subTasks.length == 0) {
          return <GridRow key={`row-${index}`} assignedTask={value}></GridRow>;
        } else {
          return (
            <>
              <GridRow key={`row-${index}`} assignedTask={value}></GridRow>
              {!value.collapsed && TaskGrid({ taskList: value.subTasks })}
            </>
          );
        }
      })}
    </>
  );
};

export default TaskGrid;
