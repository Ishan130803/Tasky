"use client";
import React, { useContext } from "react";
import { zoomView } from "./GridView";
import { gridStartingBoundContext } from "../../page";

import dayjs, { Dayjs } from "dayjs";
import { default as dayjsDuration } from "dayjs/plugin/duration";
dayjs.extend(dayjsDuration);

export const TimeCaret = () => {
  const gridData = React.useContext(zoomView);
  const gridStartingBound = useContext(gridStartingBoundContext);

  const [currentTime, setCurrentTime] = React.useState<Dayjs>(dayjs());

  const isWithinBound = () => {
    if (currentTime.isAfter(gridStartingBound)) {
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

  return (
    <>
      {isWithinBound() && (
        <div
          className="h-full border-dashed w-0 border-r-4 border-indigo-700 absolute z-20"
          style={{
            left: `${Math.floor(
              (dayjs.duration(currentTime.diff(gridStartingBound)).asSeconds() /
                gridData.atom_scale.asSeconds()) *
                gridData.atom_width
            )}px`,
          }}
        ></div>
      )}
    </>
  );
};
