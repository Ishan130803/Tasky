import React from "react";
import { taskObj } from "@/app/types/taskClass";
import GridRow from "../Timegrid/GridRow";
import TaskContainer from "./TaskContainer";

import { zoomView } from "../Timegrid/GridView";
import { gridViewDataTypeClass } from "@/app/types/gridViewData";

const TaskGrid = (props: { taskList: taskObj[] }) => {
  const gridData = React.useContext(zoomView);
  return (
    <div className="flex flex-col">
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
    </div>
  );
};

export default TaskGrid;
