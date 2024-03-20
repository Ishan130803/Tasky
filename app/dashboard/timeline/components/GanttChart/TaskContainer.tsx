import React, { useContext } from "react";
import dayjs, { Dayjs } from "dayjs";
import { default as dayjsDuration } from "dayjs/plugin/duration";
dayjs.extend(dayjsDuration);
import { gridViewData } from "./contexts/gridViewData";
import { taskObj } from "@/types/taskClass";

export default function TaskContainer(props: { task: taskObj }) {
  const gridData = useContext(gridViewData);
  const start_time = dayjs(props.task.start_time)
  const end_time = dayjs(props.task.end_time)
  const span_length =
    props.task.duration *
    gridData.pixel_scale *
    gridData.scaling_factor;

  const offset_from_left = () =>
    Math.floor(
      start_time.diff(gridData.gridStartingBound, "s") *
        gridData.pixel_scale *
        gridData.scaling_factor
    );

  const span_from_left = () => Math.floor(
    props.task.duration * gridData.pixel_scale * gridData.scaling_factor
  )

  // console.log(props.task.start_time.diff(gridData.gridStartingBound))
  return (
    <div
      className={`box-border ${
        props.task.collapsed ? "bg-blue-400" : "bg-blue-100"
      } border border-blue-600 w-full p-2 shadow-lg absolute z-10 rounded-lg hover:bg-blue-300 overflow-clip`}
      style={{
        display: "block",
        height: "90%",
        width: `${span_from_left()}px`,
        top: "5%",
        left: `${offset_from_left()}px`,
        gridRow: `1/2`,
        // gridColumn: `${Math.floor(
        //   dayjs
        //     .duration(props.task.start_time.diff(gridStartingBound))
        //     .asSeconds() / props.gridData.atom_scale.asSeconds()
        // )} / span ${Math.ceil(
        //   props.task.duration.asSeconds() /
        //     props.gridData.atom_scale.asSeconds()
        // )}`,
      }}
    >
      <span className={`sticky ${props.task.completed ? "line-through" : ""}`}>
        {props.task.title}
      </span>
    </div>
  );
}
