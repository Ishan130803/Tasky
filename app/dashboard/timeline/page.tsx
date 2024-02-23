"use client";
import React, { useState ,useContext } from "react";
import Timerule from "./components/Timegrid/Timerule";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import GridView from "./components/Timegrid/GridView";

import dayjs,{Dayjs} from "dayjs";
import {default as dayjsDuration} from "dayjs/plugin/duration" ;
dayjs.extend(dayjsDuration);

import { taskClass, user } from "@/app/types/taskClass";


const taskList:taskClass[] = [
  new taskClass({collapsed:false,completed:true,start_time:2,end_time:11,id:'1',subTasks:[],title:'Task1',duration:dayjs.duration(30,'m')}),
  new taskClass({collapsed:false,completed:false,start_time:3,end_time:10,id:'1',subTasks:[],title:'Task2',duration:dayjs.duration(30,'m')}),
  new taskClass({collapsed:false,completed:false,start_time:1,end_time:10,id:'1',subTasks:[],title:'Task3',duration:dayjs.duration(30,'m')}),
  new taskClass({collapsed:false,completed:false,start_time:5,end_time:15,id:'1',subTasks:[],title:'Task4',duration:dayjs.duration(30,'m')}),
  new taskClass({collapsed:false,completed:false,start_time:6,end_time:10,id:'1',subTasks:[],title:'Task5',duration:dayjs.duration(30,'m')}),
  new taskClass({collapsed:false,completed:false,start_time:9,end_time:16,id:'1',subTasks:[],title:'Task6',duration:dayjs.duration(30,'m')}),
  new taskClass({collapsed:false,completed:false,start_time:1,end_time:19,id:'1',subTasks:[
    new taskClass({collapsed:false,completed:false,start_time:6,end_time:10,id:'1',subTasks:[],title:'SubTask-7-1',duration:dayjs.duration(30,'m')}),
    new taskClass({collapsed:false,completed:false,start_time:6,end_time:10,id:'1',subTasks:[],title:'SubTask-7-2',duration:dayjs.duration(30,'m')}),
    new taskClass({collapsed:false,completed:false,start_time:6,end_time:10,id:'1',subTasks:[
      new taskClass({collapsed:false,completed:false,start_time:9,end_time:99,id:'1',subTasks:[],title:'SubTask-7-3-1',duration:dayjs.duration(30,'m')}),
      new taskClass({collapsed:false,completed:false,start_time:6,end_time:10,id:'1',subTasks:[],title:'SubTask-7-3-2',duration:dayjs.duration(30,'m')}),
      new taskClass({collapsed:false,completed:false,start_time:6,end_time:10,id:'1',subTasks:[],title:'SubTask-7-3-3',duration:dayjs.duration(30,'m')}),
    ],title:'SubTask-7-3',duration:dayjs.duration(30,'m')}),
  ],title:'Task7',duration:dayjs.duration(30,'m')}),
  new taskClass({collapsed:false,completed:false,start_time:6,end_time:10,id:'1',subTasks:[],title:'Task5',duration:dayjs.duration(30,'m')}),
]


const scalingFactor = React.createContext<number>(1)

export default function page() {
  const userTask:user = {
    personalTasks:taskList,
    workTasks:[],
  }

  const [view, setView] = useState(1);

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
        min={1}
        max={100}
      />
      {/* <Timerule className="rounded-t-3xl" /> */}

      {GridView({view:view,taskList:taskList})}
    </div>
  );
}
