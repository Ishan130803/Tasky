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
  Resize,
  EventMarkersDirective,
  EventMarkerDirective,
  DayMarkers,
  
} from "@syncfusion/ej2-react-gantt";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import { useSession } from "next-auth/react";
import { SyncfusionWrapper } from "../ui/wrappers/SyncfusionWrapper";
import { useActiveProject } from "@/context/ActiveProjectContextProvider";
import dayjs, { Dayjs } from "dayjs";

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
  projectid?: string;
}
export const GanttChart: FC<IGanttChartProps> = (props) => {
  let session = useSession();
  const activeProject = useActiveProject()

  const projectId = props.projectid ?? "1338";

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
    durationUnit: "durationUnit",
  };

  const baseUrl = global.window?.location?.origin;

  const datasource = useMemo<DataManager>(
    () =>
      new DataManager({
        url: `${baseUrl}/api/users/GetData/${props.userid}/${projectId}`,
        adaptor: new WebApiAdaptor(),
        crossDomain: true,
      }),
    [props.userid]
  );
  const editOptions: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    mode: "Dialog",
  };
  const selectionSettings: SelectionSettingsModel = {
    type: "Multiple",
  };

  const labelSettings: LabelSettingsModel = {
    rightLabel: "${taskData.task_name}",
    taskLabel: "${Progress}%",
  };

  const dayWorkingTime = [{ from: 6, to: 22 }];

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
    "ZoomIn",
    "ZoomOut",
    "ZoomToFit",
  ];


  function dataBound() {
    let labeltop = 100;
    let rightarrow = 110;
    const eventMarkerLabels = document.getElementsByClassName("e-span-label");
    const eventMarkerArrows = document.getElementsByClassName("e-gantt-right-arrow");
    for (let i = 0; i < eventMarkerLabels.length; i++) {
      const label = eventMarkerLabels[i] as HTMLElement;
      const arrow = eventMarkerArrows[i] as HTMLElement;
      if (label && arrow) {
        label.style.top = labeltop + "px";
        arrow.style.top = rightarrow + "px";
      }
      labeltop += 35;
      rightarrow += 35;
    }
  };
  const eventMarkerDay1 = dayjs(activeProject?.project.startDate ?? new Date()).toDate();
  const eventMarkerDay2 = dayjs(activeProject?.project.dueDate ?? new Date()).toDate() 

  return (
    <SyncfusionWrapper>
      {props.userid && (
        <div className="rounded-xl w-full ">
          <GanttComponent
            height="800px"
            dataSource={datasource}
            style={{
              height: "900px",
            }}
            dataBound={dataBound}
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
                minWidth={150}
              ></ColumnDirective>
              <ColumnDirective
                headerText="Task Name"
                field="task_name"
                minWidth={150}
              ></ColumnDirective>
              <ColumnDirective
                headerText="Start Time"
                field="start_time"
                minWidth={100}
              ></ColumnDirective>
              <ColumnDirective
                headerText="End Time"
                field="end_time"
                minWidth={100}
              ></ColumnDirective>
              <ColumnDirective
                headerText="Progress"
                field="Progress"
                minWidth={100}
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
            <EventMarkersDirective>
              <EventMarkerDirective day={eventMarkerDay1} cssClass='e-custom-event-marker'  label='Project Start Date' ></EventMarkerDirective>
              <EventMarkerDirective day={eventMarkerDay2} cssClass=''  label='Project End Date' ></EventMarkerDirective>
        </EventMarkersDirective>
            <Inject
              services={[DayMarkers ,RowDD, Edit, Selection, Toolbar, ContextMenu, Resize]}
            />
          </GanttComponent>
        </div>
      )}
    </SyncfusionWrapper>
  );
};
