import { Label } from "@mui/icons-material";
import { Repeat } from "lucide-react";
import React from "react";

export default function Hourly(props: {
  cell_height: string,
  cell_width: string,
  atom_count: Number,
  atom_coloring: Array<string>,
  labels:Array<string>,
}) {
  
  const arr = Array<React.ReactNode>(Number(props.atom_count)).fill(0);
  return (
    <div
      className={`grid grid-cols-subgrid grid-rows-subgrid divide-x divide-gray-800 border-black border-l-4 `}
      style={{
        gridColumn: `span ${props.atom_count}`,
      }}
    >
      {arr.map((value, index) => {
        let current_color = index % props.atom_coloring.length;
        return (
          <div
            className={`text-center align-bottom border-b-black border-b-2 ${props.atom_coloring[current_color]}`}
          >{props.labels && (props.labels[index % props.labels.length] || null)}</div>
        );
      })}
    </div>
  );
}





