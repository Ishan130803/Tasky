export interface taskObj {
  id: string;
  title:string;
  completed: boolean;
  start_time: number | null;
  end_time: number | null;
  collapsed: boolean;
  subTasks: Array<taskObj>;
  readonly duration: number | null;
}

export class taskClass implements taskObj {
  public id: string;
  public title:string
  public completed: boolean;
  public start_time: number | null;
  public end_time: number | null;
  public collapsed: boolean;
  public subTasks: Array<taskObj>;

  constructor(task:taskObj) {
    this.id = task.id;
    this.title = task.title;
    this.completed = task.completed;
    this.start_time = task.start_time;
    this.end_time = task.end_time;
    this.collapsed = task.collapsed;
    this.subTasks = task.subTasks;
  }
  get duration(): number | null {
    if (this.end_time && this.start_time) {
      return this.end_time - this.start_time;
    }
    else return null;
  }
}


