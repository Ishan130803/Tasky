"use client";
import { FC, useMemo, useEffect, useState } from "react";
import {
  GanttComponent,
  TaskFieldsModel,
  Edit,
  Selection,
  Toolbar,
  Inject,
  EditSettingsModel,
  ContextMenu,
  RowDD,
  SelectionSettingsModel,
  LabelSettingsModel,
  TimelineSettingsModel,
  ColumnsDirective,
  ColumnDirective,
  AddDialogFieldsDirective,
  AddDialogFieldDirective,
  AddDialogFieldSettings,
  EditDialogFieldsDirective,
  EditDialogFieldDirective,
  AddDialogFieldSettingsModel,
  Sort,
} from "@syncfusion/ej2-react-gantt";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import { useSession } from "next-auth/react";
import { SyncfusionWrapper } from "../ui/wrappers/SyncfusionWrapper";

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

// let userid = "65fd93e9013acedd6f51891a";

interface IGanttChartProps {
  userid?: string;
  projectid?: string|null;
}
export const GanttChart: FC<IGanttChartProps> = (props) => {
  let session = useSession();
  const userid = session.data?.user?.id;
  
  const projectId = props.projectid ?? "1338"

  console.log(projectId);
  
  const taskFields: TaskFieldsModel = {
    id: "task_id",
    name: "task_name",
    startDate: "start_time",
    endDate: "end_time",
    duration: "duration",
    progress: "Progress",
    parentID: "parent_id",
    dependency: "Predecessor",
    expandState: "isExpanded",
    notes: "Notes",
  };

  const baseUrl = global.window?.location?.origin;
  console.log(baseUrl);

  const datasource = useMemo<DataManager>(
    () =>
      new DataManager({
        url: `${baseUrl}/api/users/GetData/${userid}/${projectId}`,
        adaptor: new WebApiAdaptor(),
        crossDomain: true,
      }),
    [userid]
  );
  const editOptions: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
  };
  const selectionSettings: SelectionSettingsModel = {
    type: "Multiple",
  };

  const labelSettings: LabelSettingsModel = {
    rightLabel: "${taskData.task_name}",
    taskLabel: "${Progress}%",
  };

  const dayWorkingTime = [{ from: 9, to: 18 }];

  let timelineSettings: TimelineSettingsModel = {
    updateTimescaleView: true,
  };

  const splitterSettings: any = {
    position: "20%",
  };

  const toolbarOptions = [
    "Add",
    "Delete",
    "Indent",
    "Outdent",
    "ExpandAll",
    "CollapseAll",
  ];
  return (
    <SyncfusionWrapper>
      {userid && (
        <div className="rounded-xl w-full ">
          <GanttComponent
            height="800px"
            dataSource={datasource}
            style={{
              height: "900px",
            }}
            dateFormat="d MMM yy hh:mm"
            durationUnit="Hour"
            editSettings={editOptions}
            toolbar={toolbarOptions}
            includeWeekend={true}
            dayWorkingTime={dayWorkingTime}
            taskFields={taskFields}
            timelineSettings={timelineSettings}
            allowSelection={true}
            allowSorting={true}
            allowResizing={true}
            enableContextMenu={true}
            allowRowDragAndDrop={true}
            selectionSettings={selectionSettings}
            allowTaskbarDragAndDrop={true}
            labelSettings={labelSettings}
            baselineColor="#000000"
            showInlineNotes={true}
          >
            <ColumnsDirective>
              <ColumnDirective
                headerText="S.No."
                field="task_id"
                width="150"
              ></ColumnDirective>
              <ColumnDirective
                headerText="Task Name"
                field="task_name"
                width="250"
              ></ColumnDirective>
            </ColumnsDirective>

            <AddDialogFieldsDirective>
              <AddDialogFieldDirective
                type="General"
                headerText="General"
                fields={[
                  "task_id",
                  "task_name",
                  "start_time",
                  "end_time",
                  "duration",
                ]}
              ></AddDialogFieldDirective>
              <AddDialogFieldDirective type="Dependency"></AddDialogFieldDirective>
              <AddDialogFieldDirective type="Notes"></AddDialogFieldDirective>
            </AddDialogFieldsDirective>

            <EditDialogFieldsDirective>
              <EditDialogFieldDirective
                type="General"
                headerText="General"
                fields={[
                  "task_id",
                  "task_name",
                  "start_time",
                  "end_time",
                  "duration",
                ]}
              ></EditDialogFieldDirective>
              <EditDialogFieldDirective type="Dependency"></EditDialogFieldDirective>
              <EditDialogFieldDirective type="Notes"></EditDialogFieldDirective>
            </EditDialogFieldsDirective>
            <Inject
              services={[RowDD, Edit, Selection, Toolbar, ContextMenu, Sort]}
            />
          </GanttComponent>
        </div>
      )}
    </SyncfusionWrapper>
  );
};
