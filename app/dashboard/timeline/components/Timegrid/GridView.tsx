import React from "react";
import Grid from "./Grid";
import Timerule from "./Timerule";
import { taskObj } from "@/app/types/taskClass";
import TaskGrid from "../Container/TaskGrid";
import { gridViewDataTypeClass } from "@/app/types/gridViewData";
import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import { TimeCaret } from "./TimeCaret";
dayjs.extend(duration);

const zoom_views = {
  daily: {
    div_3: {
      atom_count: 3,
      atom_coloring: ["bg-slate-300", "bg-white", "bg-white", "bg-white"],
      atom_scale: dayjs.duration(20, "m"),
      cell_count: 24,
      atom_height: 60,
    },
    div_6: {
      atom_count: 6,
      atom_coloring: [
        "bg-slate-300",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
      ],
      atom_scale: dayjs.duration(10, "m"),
      cell_count: 24,
      atom_height: 60,
    },
    div_12: {
      atom_count: 12,
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
      atom_scale: dayjs.duration(5, "m"),
      cell_count: 24,
      atom_height: 60,
    },
  },
};
const zoom_view_selector = (view: number) => {
  if (view <= 33) {
    return new gridViewDataTypeClass({
      ...zoom_views.daily.div_3,
      pixel_scale: view,
    });
  } else if (view <= 66) {
    return new gridViewDataTypeClass({
      ...zoom_views.daily.div_6,
      pixel_scale: view,
    });
  } else {
    return new gridViewDataTypeClass({
      ...zoom_views.daily.div_12,
      pixel_scale: view,
    });
  }
};

export let zoomView = React.createContext<gridViewDataTypeClass>(
  zoom_view_selector(100)
);

const GridView = (props: { view: number; taskList: taskObj[] }) => {
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

  const a = {
    "daily-1x": new gridViewDataTypeClass({
      pixel_scale: 24,
      atom_count: 4,
      atom_coloring: ["bg-slate-300", "bg-white", "bg-white", "bg-white"],
      atom_scale: dayjs.duration(15, "m"),
      cell_count: 4,
      atom_height: 60,
    }),
    "daily-2x": {
      rows: rows,
      columns: 24,
      atom_count: 4,
      atom_height: "80px",
      cell_width: "60px",
      atom_coloring: ["bg-slate-300", "bg-white", "bg-white", "bg-white"],
      labels: [15, 30, 45, 60],
    },
    "daily-3x": {
      rows: rows,
      columns: 24,
      atom_count: 4,
      atom_height: "80px",
      cell_width: "80px",
      atom_coloring: ["bg-slate-300", "bg-white", "bg-white", "bg-white"],
      labels: [15, 30, 45, 60],
    },
    "daily-4x": {
      rows: rows,
      columns: 24,
      atom_count: 4,
      atom_height: "80px",
      cell_width: "100px",
      atom_coloring: ["bg-slate-300", "bg-white", "bg-white", "bg-white"],
      labels: [15, 30, 45, 60],
    },
    "daily-5x": {
      rows: rows,
      columns: 24,
      atom_count: 6,
      atom_height: "80px",
      cell_width: "80px",
      atom_coloring: [
        "bg-slate-300",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-slate-300",
      ],
      labels: [10, 20, 30, 40, 50, 60],
    },
    "daily-6x": {
      rows: rows,
      columns: 24,
      atom_count: 6,
      atom_height: "80px",
      cell_width: "86px",
      atom_coloring: [
        "bg-slate-300",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-slate-300",
      ],
      labels: [10, 20, 30, 40, 50, 60],
    },
    "daily-7x": {
      rows: rows,
      columns: 24,
      atom_count: 6,
      atom_height: "80px",
      cell_width: "92px",
      atom_coloring: [
        "bg-slate-300",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-white",
        "bg-slate-300",
      ],
      labels: [10, 20, 30, 40, 50, 60],
    },
    "daily-8x": {
      rows: rows,
      columns: 24,
      atom_count: 12,
      atom_height: "80px",
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
      labels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
    },
    "daily-9x": {
      rows: rows,
      columns: 24,
      atom_count: 12,
      atom_height: "80px",
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
      labels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
    },
    "daily-10x": {
      rows: rows,
      columns: 24,
      atom_count: 12,
      atom_height: "80px",
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
      labels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
    },

    "daily-11x": {
      rows: rows,
      columns: 24,
      atom_count: 12,
      atom_height: "80px",
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
      labels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
    },
    "daily-12x": {
      rows: rows,
      columns: 24,
      atom_count: 12,
      atom_height: "80px",
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
      labels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
    },
    yearly: {
      rows: rows,
      columns: 12,
      atom_count: 6,
      atom_height: "60px",
      cell_width: "50px",
      atom_coloring: ["bg-slate-300", "bg-slate-300", "bg-white", "bg-white"],
    },
    monthly: {
      rows: rows,
      columns: 31,
      atom_count: 4,
      atom_height: "60px",
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
      <zoomView.Provider value={zoom_view_selector(props.view)}>
        {/* {Timerule(zoom_views[view_labels[props.view]])} */}
        <div className="flex flex-col relative overflow-hidden">
          <TimeCaret />
          {TaskGrid({ taskList: props.taskList })}
        </div>
      </zoomView.Provider>
    </>
  );
};

export default GridView;

{
  /* <Grid
        rows={3}
        columns={10}
        atom_count={24}
        atom_height="60px"
        cell_width="50px"
        atom_coloring={atom_coloring}
      ></Grid> */
}
