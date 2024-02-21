import React from "react";
import GridRow from "./GridRow";

export default function Timerule(props: {
  rows: number;
  columns: number;
  atom_count: number;
  atom_coloring: Array<string>;
  cell_height: string;
  cell_width: string;
  labels: Array<number | string>
}) {
  const rows = Array<Number>(1).fill(0);
  return (
    <div className="flex flex-col">
      {rows.map((value, index) => {
        return <GridRow
          key={`row-1`}
          atom_count={1}
          cardinality={props.columns}
          atom_coloring={['bg-slate-200']}
          cell_height={'2.5rem'}
          cell_width={`calc(${props.cell_width} * ${props.atom_count})`}
          labels={props.labels}
        ></GridRow>;
      })}
      {rows.map((value, index) => {
        return <GridRow
          key={`row-1`}
          atom_count={props.atom_count}
          cardinality={props.columns}
          atom_coloring={['bg-slate-200']}
          cell_height={'2.5rem'}
          cell_width={props.cell_width}
          labels={props.labels}
        ></GridRow>;
      })}
    </div>
  );
}
