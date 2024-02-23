"use client";
import React, { Children } from "react";
import GridCell from "./GridCell";
import { zoomView } from "./GridView";
import { taskObj } from "@/app/types/taskClass";
import TaskContainer from "../Container/TaskContainer";

const GridRow = (props: {
  assignedTask : taskObj,
}) => {

  const gridData = React.useContext(zoomView)
  const arr = Array<Number>(Number(gridData.cell_count)).fill(0);

  return (
    <div
      className="grid relative"
      style={{
        gridTemplateColumns: `repeat(${
          Number(gridData.cell_count) * Number(gridData.atom_count)
        }, ${gridData.atom_width}px)`,
        gridTemplateRows: `${gridData.atom_height}px`,
      }}
    >
      <TaskContainer task={props.assignedTask} gridData={gridData} />
      {arr.map((value, index) => {
        return (
          <GridCell key = {index} />
        );
      })}
    </div>
  );
};

export default GridRow;
