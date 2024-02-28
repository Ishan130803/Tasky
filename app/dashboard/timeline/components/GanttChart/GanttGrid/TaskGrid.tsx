import React from "react";
import { taskObj } from "@/app/types/taskClass";
import GridRow from "./GridRow";
import TaskContainer from "./TaskContainer";

import { zoomView } from "./GanttGrid";
import { gridViewDataTypeClass } from "@/app/types/gridViewData";
import { TimeCaret } from "../TimeCaret";

const TaskGrid = (props: { taskList: taskObj[] }) => {
  const gridData = React.useContext(zoomView);
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
