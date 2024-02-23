import React from "react";
import { zoomView } from "./GridView";


export default function Hourly() {
  const gridData = React.useContext(zoomView)
  const arr = Array<React.ReactNode>(gridData.atom_count).fill(0);
  return (
    <div
      className={`grid grid-cols-subgrid grid-rows-subgrid divide-x divide-gray-800 border-black border-l-4 `}
      style={{
        gridColumn: `span ${gridData.atom_count}`,
      }}
    >
      {arr.map((value, index) => {
        let current_color = index % gridData.atom_coloring.length;
        return (
          <div
            key={index}
            className={`text-center align-bottom border-b-black border-b-2 ${gridData.atom_coloring[current_color]}`}
          >
            {/* {props.labels &&
              (props.labels[index % props.labels.length] || null)} */}
          </div>
        );
      })}
    </div>
  );
}
