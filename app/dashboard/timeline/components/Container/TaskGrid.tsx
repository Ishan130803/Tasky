import React from "react";
import { taskObj } from "@/app/types/taskClass";
import GridRow from "../Timegrid/GridRow";
import TaskContainer from "./TaskContainer";

const TaskGrid = (props: {
  taskList: taskObj[];
  rows: Number;
  columns: Number;
  atom_count: Number;
  atom_coloring: Array<string>;
  cell_height: string;
  cell_width: string;
}) => {
  return (
    <div className="flex flex-col">
      {props.taskList.map((value, index) => {
        if (value.subTasks.length == 0) {
          return (
            <GridRow
              key={`row-${index}`}
              atom_count={props.atom_count}
              cardinality={props.columns}
              atom_coloring={props.atom_coloring}
              cell_height={props.cell_height}
              cell_width={props.cell_width}
            >
              {TaskContainer({ task: value })}
            </GridRow>
          );
        } else {
          return (
            <>
              <GridRow
                key={`row-${index}`}
                atom_count={props.atom_count}
                cardinality={props.columns}
                atom_coloring={props.atom_coloring}
                cell_height={props.cell_height}
                cell_width={props.cell_width}
              >
                {TaskContainer({ task: value })}
              </GridRow>
              {TaskGrid({ ...props, taskList: value.subTasks })}
            </>
          );
        }
      })}
    </div>
  );
};

export default TaskGrid;
