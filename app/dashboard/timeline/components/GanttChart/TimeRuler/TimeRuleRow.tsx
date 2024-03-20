"use client";
import React, { Children, FC, useContext, useState } from "react";
import GridCell from "../GridCell";
import { gridViewData } from "../contexts/gridViewData";
import { taskObj } from "@/types/taskClass";

interface ITimeRulerProps {
  className?: string,
}

const TimeRuleRow : FC<ITimeRulerProps> = (props) => {
  const gridData = useContext(gridViewData)
  const arr = Array<Number>(Number(gridData.cell_count)).fill(0);

  return (
     <div
      className={`grid relative drop-shadow-lg z-10 ${props.className}`}
      style={{
        gridTemplateColumns: `repeat(${
          Number(gridData.cell_count) * Number(gridData.atom_count)
        }, ${gridData.atom_width}px)`,
        gridTemplateRows: `${gridData.atom_height}px`,
      }}
    >
      {arr.map((value, index) => {
        return (
          <GridCell key = {index} />
        );
      })}
    </div>
  );
};

export default TimeRuleRow;
