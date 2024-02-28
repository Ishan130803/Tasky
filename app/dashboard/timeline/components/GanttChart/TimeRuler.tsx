import Reactz from "react";
import GridRow from "./GanttGrid/GridRow";

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
        ></GridRow>;
      })}
      {rows.map((value, index) => {
        return <GridRow
          key={`row-1`}
          
        ></GridRow>;
      })}
    </div>
  );
}
