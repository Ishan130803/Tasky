import { rulerLabelProps,levelData } from "./rulerLabelProp";
import { zoomView } from "../GanttGrid/GanttGrid";
import { gridViewDataTypeClass } from "@/types/gridViewData";

import React, { useContext } from 'react'

import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const TimeRuler = () => {
  const gridData = React.useContext(zoomView)
  return (
    <>
      <div className="flex flex-col">

      </div>
    </>
  )
}
export default TimeRuler


const TimeRulerRow = (props:{gridData: gridViewDataTypeClass, levelData:levelData, level: number }) => {
  const totalDuration = props.gridData.atom_scale.asSeconds()
  if (props.level == 1) {
    
  }
  return (
    <>
    </>
  )
}


