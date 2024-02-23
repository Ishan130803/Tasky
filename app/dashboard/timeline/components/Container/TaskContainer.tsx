import React,{useContext} from "react";
import { taskObj } from "@/app/types/taskClass";

export default function TaskContainer(props: { task: taskObj, gridData:any }) {

  return (
    <div
      className={`box-border ${props.task.collapsed? "bg-blue-400" :"bg-blue-100" } border-2 border-blue-900 w-full p-2 shadow-lg absolute z-10 rounded-2xl hover:bg-blue-300`}
      style={{
        display: "block",
        height: "90%",
        top: "5%",
        left: "1px",
        gridRow: `1/2`,
        gridColumn: `${props.task.start_time} / span ${Math.ceil(props.task.duration.asSeconds()/props.gridData.atom_scale.asSeconds())}`,
      }}
    >
      <span className={`sticky ${props.task.completed ? "line-through" : ""}`}>
        {props.task.title}
      </span>
    </div>
  );
}
