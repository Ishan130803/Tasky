import React from "react";
import Grid from "./Grid";
import Timerule from "./Timerule";
import { taskObj } from "@/app/types/taskClass";
import TaskGrid from "../Container/TaskGrid";

const GridView = (props: { view: number, taskList:taskObj[]}) => {
  const view_labels = [
    // "yearly",
    // "monthly",
    // "weekly",
    "daily-1x",
    "daily-2x",
    "daily-3x",
    "daily-4x",
    "daily-5x",
    "daily-6x",
    "daily-7x",
    "daily-8x",
    "daily-9x",
    "daily-10x",
    "daily-11x",
    "daily-12x",
  ];
  const rows = 3;

  const zoom_views = {
    "daily-1x": {
      rows: rows,
      columns: 24,
      atom_count: 4,
      cell_height: "80px",
      cell_width: "40px",
      atom_coloring: ["bg-slate-300", "bg-white", "bg-white", "bg-white"],
      labels:[15,30,45,60]
    },
    "daily-2x": {
      rows: rows,
      columns: 24,
      atom_count: 4,
      cell_height: "80px",
      cell_width: "60px",
      atom_coloring: ["bg-slate-300", "bg-white", "bg-white", "bg-white"],
      labels:[15,30,45,60]
    },
    "daily-3x": {
      rows: rows,
      columns: 24,
      atom_count: 4,
      cell_height: "80px",
      cell_width: "80px",
      atom_coloring: ["bg-slate-300", "bg-white", "bg-white", "bg-white"],
      labels:[15,30,45,60]
    },
    "daily-4x": {
      rows: rows,
      columns: 24,
      atom_count: 4,
      cell_height: "80px",
      cell_width: "100px",
      atom_coloring: ["bg-slate-300", "bg-white", "bg-white", "bg-white"],
      labels:[15,30,45,60]
    },
    "daily-5x": {
      rows: rows,
      columns: 24,
      atom_count: 6,
      cell_height: "80px",
      cell_width: "80px",
      atom_coloring: [
        "bg-slate-300",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-slate-300",
      ],
      labels:[10,20,30,40,50,60]
    },
    "daily-6x": {
      rows: rows,
      columns: 24,
      atom_count: 6,
      cell_height: "80px",
      cell_width: "86px",
      atom_coloring: [
        "bg-slate-300",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-slate-300",
      ],
      labels:[10,20,30,40,50,60]
    },
    "daily-7x": {
      rows: rows,
      columns: 24,
      atom_count: 6,
      cell_height: "80px",
      cell_width: "92px",
      atom_coloring: [
        "bg-slate-300",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-slate-300",
      ],
      labels:[10,20,30,40,50,60]
    },
    "daily-8x": {
      rows: rows,
      columns: 24,
      atom_count: 12,
      cell_height: "80px",
      cell_width: "56px",
      atom_coloring: [
        "bg-slate-300",
        "bg-slate-300",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
      ],
      labels:[5,10,15,20,25,30,35,40,45,50,55,60]
    },
    "daily-9x": {
      rows: rows,
      columns: 24,
      atom_count: 12,
      cell_height: "80px",
      cell_width: "65px",
      atom_coloring: [
        "bg-slate-300",
        "bg-slate-300",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
      ],
      labels:[5,10,15,20,25,30,35,40,45,50,55,60]
    },
    "daily-10x": {
      rows: rows,
      columns: 24,
      atom_count: 12,
      cell_height: "80px",
      cell_width: "72px",
      atom_coloring: [
        "bg-slate-300",
        "bg-slate-300",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
      ],
      labels:[5,10,15,20,25,30,35,40,45,50,55,60]
    },

    "daily-11x": {
      rows: rows,
      columns: 24,
      atom_count: 12,
      cell_height: "80px",
      cell_width: "80px",
      atom_coloring: [
        "bg-slate-300",
        "bg-slate-300",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
      ],
      labels:[5,10,15,20,25,30,35,40,45,50,55,60]
    },
    "daily-12x": {
      rows: rows,
      columns: 24,
      atom_count: 12,
      cell_height: "80px",
      cell_width: "90px",
      atom_coloring: [
        "bg-slate-300",
        "bg-slate-300",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
      ],
      labels:[5,10,15,20,25,30,35,40,45,50,55,60]
    },
    yearly: {
      rows: rows,
      columns: 12,
      atom_count: 6,
      cell_height: "60px",
      cell_width: "50px",
      atom_coloring: ["bg-slate-300", "bg-slate-300", "bg-white", "bg-white"],
    },
    monthly: {
      rows: rows,
      columns: 31,
      atom_count: 4,
      cell_height: "60px",
      cell_width: "50px",
      atom_coloring: [
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
      ],
    },
  };
  return (
    <>
      {Timerule(zoom_views[view_labels[props.view]])}
      {TaskGrid({...zoom_views[view_labels[props.view]],taskList:props.taskList})}
    </>
  );
};

export default GridView;

{
  /* <Grid
        rows={3}
        columns={10}
        atom_count={24}
        cell_height="60px"
        cell_width="50px"
        atom_coloring={atom_coloring}
      ></Grid> */
}
