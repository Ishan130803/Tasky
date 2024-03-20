import dayjs, { Dayjs } from "dayjs";
import { default as dayjsDuration } from "dayjs/plugin/duration";

dayjs.extend(dayjsDuration);

export interface taskObj {
  id: string;
  title:string;
  completed: boolean;
  
  duration: dayjsDuration.Duration;
}

interface taskObj {
  id : string;
  parent_id : string;
  depth : number;
  creation_time: string;

  title : string;
  description : string;
  completed : boolean;

  collapsed: boolean;

  start_time: string | null;
  end_time: string | null;
  duration: number;
  subTasks: Array<taskObj>;
}

interface taskState



export class taskClass implements taskObj {
  public id: string;
  public title: string;
  public completed: boolean;
  public start_time: Dayjs;
  public end_time: number | null;
  public subTasks: Array<taskObj>;
  public collapsed: boolean;
  public duration: dayjsDuration.Duration;
  constructor(task: taskObj) {
    this.id = task.id;
    this.title = task.title;
    this.start_time = task.start_time;
    this.end_time = task.end_time;
    this.subTasks = task.subTasks;
    this.completed = task.completed;
    this.collapsed = task.collapsed;
    this.duration = task.duration;
  }
  // get duration(): number | null {
  //   if (this.end_time && this.start_time) {
  //     return this.end_time - this.start_time;
  //   }
  //   else return null;
  // }
}

export interface user {
  personalTasks: taskObj[];
  workTasks: taskObj[];
}
