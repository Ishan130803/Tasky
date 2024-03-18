import React, { useContext } from "react";
import { taskObj } from "@/types/taskClass";
import TaskGrid from "./TaskGrid";
import {
  gridViewDataType,
  gridViewDataTypeClass,
  zoomViewsMetaData,
} from "@/types/gridViewData";
import { gridViewData } from "./contexts/gridViewData";
import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import { TimeCaret } from "../TimeCaret";
dayjs.extend(duration);

const zoom_views: Array<zoomViewsMetaData> = [
  {
    grid_span: dayjs.duration(1, "D"),
    cell_count: 24,
    atom_count: 3,
    atom_coloring: ["bg-slate-300", "bg-white", "bg-white", "bg-white"],
  },
  {
    grid_span: dayjs.duration(1, "D"),
    cell_count: 24,
    atom_count: 6,
    atom_coloring: [
      "bg-slate-300",
      "bg-white",
      "bg-white",
      "bg-white",
      "bg-white",
    ],
  },
  {
    grid_span: dayjs.duration(1, "D"),
    cell_count: 24,
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
  },
];


const get_atom_width = (viewData : zoomViewsMetaData, pixel_scale : number, scaling_factor : number) => {
  const actual_pixel_scale = pixel_scale * scaling_factor // number pixels per second
  const atom_duration = viewData.grid_span.asSeconds() / (viewData.cell_count  * viewData.atom_count)
  const atom_width = Math.floor(actual_pixel_scale * atom_duration)
  return atom_width
}

const get_grid_division_params = (viewSliderValue:number) => {
  if (viewSliderValue < 33) {
    return zoom_views[2];
  }
  else if (viewSliderValue < 66) {
    return zoom_views[1];
  }
  else {
    return zoom_views[0];
  }
}

const zoom_view_selector = (
  viewSliderValue: number,
  gridStartingBound: Dayjs,
  scaling_factor: number,
  atom_height:number,
) => {
  const grid_division_params = get_grid_division_params(viewSliderValue)
  let viewData: gridViewDataType = {
    ...grid_division_params,
    atom_height : atom_height,
    gridStartingBound : gridStartingBound,
    atom_width : get_atom_width(grid_division_params, viewSliderValue, scaling_factor),
    scaling_factor : scaling_factor,
    pixel_scale : viewSliderValue,
  };
  return viewData
};

const GridView = (props: {
  view: number;
  taskList: taskObj[];
  gridStartingBound: Dayjs;
}) => {
  const gridData = zoom_view_selector(props.view, props.gridStartingBound, 1, 60);

  return (
    <>
      <gridViewData.Provider value={gridData}>
        {/* {Timerule(zoom_views[view_labels[props.view]])} */}
        <div className="flex flex-col relative overflow-hidden">
          <TimeCaret />
          <TaskGrid taskList={props.taskList} />
        </div>
      </gridViewData.Provider>
    </>
  );
};

export default GridView;
