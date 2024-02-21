import React from "react";
import Timerule from "./components/Timerule";
import Grid from "./components/Timegrid/Grid";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function page() {
  const atom_coloring = [
    "bg-slate-400",
    "bg-slate-400",
    "bg-slate-400",
    "bg-slate-400",
    "bg-slate-400",
    "bg-slate-400",
    "bg-white",
    "bg-white",
    "bg-white",
    "bg-white",
    "bg-white",
    "bg-white",
    "bg-white",
    "bg-white",
    "bg-white",
    "bg-white",
    "bg-white",
    "bg-white",
  ];

  const zoom_views = {
    "hourly-sm": {
      rows: 3,
      columns: 2,
      atom_count: 24,
      cell_height: "60px",
      cell_width: "50px",
      atom_coloring: atom_coloring,
    },
  };

  return (
    <div className="flex flex-col ">
      <Slider
        className="w-96"
        aria-label="Temperature"
        defaultValue={30}
        valueLabelDisplay="auto"
        shiftStep={30}
        step={10}
        marks
        min={10}
        max={110}
      />
      <Timerule className="rounded-t-3xl" />
      {Grid(zoom_views["hourly-sm"])}
      {/* <Grid
        rows={3}
        columns={10}
        atom_count={24}
        cell_height="60px"
        cell_width="50px"
        atom_coloring={atom_coloring}
      ></Grid> */}
    </div>
  );
}
