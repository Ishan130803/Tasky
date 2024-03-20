"use client";
import React, { Children, useContext, useState } from "react";
import GridCell from "./GridCell";
import { gridViewData } from "./contexts/gridViewData";
import { taskObj } from "@/types/taskClass";
import TaskContainer from "./TaskContainer";

const GridRow = (props: {
  assignedTask? : taskObj,
}) => {

  const gridData = useContext(gridViewData)
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
      <TaskContainer task={props.assignedTask} />
      {arr.map((value, index) => {
        return (
          <GridCell key = {index} />
        );
      })}
    </div>
  );
};

export default GridRow;
