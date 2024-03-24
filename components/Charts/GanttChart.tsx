

"use client";
import { FC, useMemo } from "react";
import {
  GanttComponent,
  TaskFieldsModel,
  Edit,
  Selection,
  Toolbar,
  Inject,
} from "@syncfusion/ej2-react-gantt";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import { useSession } from "next-auth/react";

const GanttData: object[] = [
  {
    task_id: "task2",
    task_name: "Task 2",
    start_time: "2024-03-23T17:49:40.681Z",
    end_time: "2024-03-29T02:30:00.681Z",
    Progress: 75,
    description: "Description for Task 3",
    completed: false,
  },
  {
    task_id: "task1",
    task_name: "Task 1",
    start_time: "2024-03-23T17:49:40.681Z",
    end_time: "2024-03-29T02:30:00.681Z",
    parent_id: "task2",
    Progress: 25,
    description: "Description for Task 3",
    completed: false,
  },
];

const userid = "65fd93e9013acedd6f51891a";

interface IGanttChartProps {
  session : Object
}
export const GanttChart: FC<IGanttChartProps> = (props) => {
  const taskFields: TaskFieldsModel = {
    id: "task_id",
    name: "task_name",
    startDate: "start_time",
    endDate: "end_time",
    duration: "duration",
    progress: "Progress",
    parentID: "parent_id",
  };

  const session = useSession()
  console.log("Session : ",session)
  // const userid = session.data?.user?.id;
  const datasource = useMemo<DataManager>(
    () =>
      new DataManager({
        url: `http://localhost:3000/api/users/GetData/${userid}`,
        updateUrl: `http://localhost:3000/api/users/GetData/${userid}`,
        removeUrl: `http://localhost:3000/api/users/DeleteData/${userid}`,
        insertUrl: `http://localhost:3000/api/users/GetData/${userid}`,
        adaptor: new WebApiAdaptor(),
        crossDomain: true,
      }),
    [userid]
  );

  const editOptions = {
    allowAdding: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
  };

  const toolbarOptions = ["Add", "Delete"];
  return (
    <GanttComponent
      dataSource={datasource}
      editSettings={editOptions}
      toolbar={toolbarOptions}
      height="450px"
      taskFields={taskFields}
      allowSelection={true}
    >
      <Inject services={[Edit, Selection, Toolbar]} />
    </GanttComponent>
  );
};
