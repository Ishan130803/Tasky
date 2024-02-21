"use client";
import React, { useState } from "react";
import Timerule from "./components/Timegrid/Timerule";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import GridView from "./components/Timegrid/GridView";

export default function page() {
  const [view, setView] = useState(0);

  return (
    <div className="flex flex-col ">
      <Slider
        value={view}
        onChange={(event, num) => {
          if (typeof num === "number") {
            setView(num);
          }
        }}
        className="w-80"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={11}
      />
      {/* <Timerule className="rounded-t-3xl" /> */}
      <GridView view={view}></GridView>
    </div>
  );
}
