"use client";
import React from "react";
import GridCell from "./GridCell";

const GridRow = (props: {
  cardinality: Number;
  cell_height: string;
  cell_width: string;
  atom_count: Number;
  atom_coloring: Array<string>;
  labels: Array<string>;
}) => {
  const arr = Array<Number>(Number(props.cardinality)).fill(0);
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${
          Number(props.cardinality) * Number(props.atom_count)
        }, ${props.cell_width})`,
        gridTemplateRows: `${props.cell_height}`,
      }}
    >
      {arr.map((value, index) => {
        return (
          <GridCell
            cell_height={props.cell_height}
            cell_width={props.cell_width}
            atom_coloring={props.atom_coloring}
            atom_count={props.atom_count}
            labels={props.labels}
          />
        );
      })}
    </div>
  );
};

export default GridRow;
