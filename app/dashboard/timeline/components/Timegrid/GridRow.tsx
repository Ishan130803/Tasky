"use client";
import React, { Children } from "react";
import GridCell from "./GridCell";
import { zoomView } from "./GridView";

const GridRow = (props: {
  children:React.ReactNode
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
      {arr.map((value, index) => {
        return (
          <GridCell />
        );
      })}
      {props.children}
    </div>
  );
};

export default GridRow;
