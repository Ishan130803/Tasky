import React from "react";
import GridRow from "./GridRow";

export default function Grid(props: {
  rows: Number;
  columns: Number;
  atom_count: Number;
  atom_coloring: Array<string>;
  cell_height: string;
  cell_width: string;
}) {
  const rows = Array<Number>(props.rows).fill(0);
  return (
    <div className="flex flex-col">
      {rows.map((value, index) => {
        return <GridRow
          key={`row-${index}`}
          atom_count={props.atom_count}
          cardinality={props.columns}
          atom_coloring={props.atom_coloring}
          cell_height={props.cell_height}
          cell_width={props.cell_width}
        ></GridRow>;
      })}
    </div>
  );
}
