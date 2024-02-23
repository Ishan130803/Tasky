import React, { useContext } from "react";
import { taskObj } from "@/app/types/taskClass";
import { gridStartingBoundContext } from "../../page";
import dayjs, { Dayjs } from "dayjs";
import { default as dayjsDuration } from "dayjs/plugin/duration";
dayjs.extend(dayjsDuration);

export default function TaskContainer(props: { task: taskObj; gridData: any }) {
  const gridStartingBound = useContext(gridStartingBoundContext);
  const span_length =
    props.task.duration.asSeconds() / props.gridData.atom_scale.asSeconds();

  const span_offset =
    dayjs.duration(props.task.start_time.diff(gridStartingBound)).asSeconds() /
    props.gridData.atom_scale.asSeconds();
  console.log(gridStartingBound);
  return (
    <div
      className={`box-border ${
        props.task.collapsed ? "bg-blue-400" : "bg-blue-100"
      } border-2 border-blue-900 w-full p-2 shadow-lg absolute z-10 rounded-2xl hover:bg-blue-300 overflow-clip`}
      style={{
        display: "block",
        height: "90%",
        width: `${Math.floor(span_length * props.gridData.atom_width)}px`,
        top: "5%",
        left: `${Math.floor(span_offset * props.gridData.atom_width)}px`,
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
