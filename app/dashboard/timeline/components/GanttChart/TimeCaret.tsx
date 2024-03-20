"use client";
import React, { useContext } from "react";
import { gridViewData } from "./contexts/gridViewData";

import dayjs, { Dayjs } from "dayjs";
import { default as dayjsDuration } from "dayjs/plugin/duration";
dayjs.extend(dayjsDuration);

export const TimeCaret = () => {
  const gridData = React.useContext(gridViewData);

  const [currentTime, setCurrentTime] = React.useState<Dayjs>(dayjs());

  const isWithinBound = () => {
    if (currentTime.isAfter(gridData.gridStartingBound)) {
      return true;
    } else {
      return false;
    }
  };

  React.useEffect(() => {
    const timer = setInterval((params) => {
      setCurrentTime(dayjs());
    },100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const offset_from_left = () => Math.floor(
    currentTime.diff(gridData.gridStartingBound,'s') * gridData.pixel_scale  * gridData.scaling_factor
  )

  return (
    <>
      {isWithinBound() && (
        <div
          className="h-full border-dashed w-0 border-r-2 border-indigo-700 absolute z-20"
          style={{
            left: `${offset_from_left()}px`,
          }}
        ></div>
      )}
    </>
  );
};
