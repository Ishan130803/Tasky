"use client";
import React, { Children, useContext, useState } from "react";
import { zoomView } from "../GanttGrid/GanttGrid";
import { gridStartingBoundContext } from "../../../page";

const TimeRuleRow = () => {
  const gridData = useContext(zoomView);
  const arr = Array<Number>(Number(gridData.cell_count)).fill(0);

  return (
    <>
      
      
    </>
  );
};

export default TimeRuleRow;