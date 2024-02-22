import React from "react";
import { taskObj } from "@/app/types/taskClass";

export default function TaskContainer(props: { task: taskObj }) {
  return (
    <div
      className="box-border bg-blue-100 border border-2 border-blue-900 w-full p-2 shadow-lg absolute z-10 rounded-2xl hover:bg-blue-300"
      style={{
        display: "block",
        height: "90%",
        top: "5%",
        left: "1px",
        gridRow: `1/2`,
        gridColumn: `${props.task.start_time} / ${props.task.end_time}`,
      }}
    >
      <span className="sticky">{props.task.title}</span>
    </div>
  );
}
