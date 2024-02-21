"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import "@fontsource/inter";

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Checkbox,
  Button,
  Switch,
  Radio,
  Textarea,
  Input,
} from "@mui/joy/";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import "dayjs/locale/en-gb";
import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

import { CssVarsProvider } from "@mui/joy/styles";

import "@/app/globals.css";
import { RadioGroup } from "@mui/material";

// dayjs.extend(require('dayjs/plugin/duration'))

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function TaskForm() {
  let refs = {
    startDateSelector: useRef(null),
    endDateSelector: useRef(null),
  };

  const [periodic, setPeriodic] = useState(false);

  const [taskObj, setTaskObj] = useState({
    task_name: "",
    task_desc: "",
    task_start_time: null,
    task_end_date: null,
    task_duration: {
      DD: 0,
      hh: 0,
      mm: 0,
    },
    task_isPeriodic: false,
    task_period: {
      YY: 0,
      MM: 0,
      DD: 0,
      hh: 0,
    },
  });

  const setTimePeriod = (task_period) => {
    setTaskObj({ ...taskObj, task_period: task_period });
  };

  const updateDuration = (
    startDate = taskObj.task_start_time,
    endDate = taskObj.task_end_date
  ) => {
    let duration = { DD: 0, hh: 0, mm: 0 };
    if (endDate) {
      const diff_milli = endDate.diff(startDate);
      console.log(diff_milli, startDate, endDate);
      if (dayjs.duration(diff_milli).minutes() > 0) {
        duration.DD = Math.floor(dayjs.duration(diff_milli).asDays());
        duration.hh = Math.floor(dayjs.duration(diff_milli).asHours()) % 24;
        duration.mm = Math.floor(dayjs.duration(diff_milli).asMinutes()) % 60;
        setTaskObj({
          ...taskObj,
          task_start_time: startDate,
          task_end_date: endDate,
          task_duration: { ...duration },
        });
      } else {
        setTaskObj({
          ...taskObj,
          task_start_time: startDate,
          task_end_date: null,
          task_duration: { ...duration },
        });
      }
    } else {
      setTaskObj({
        ...taskObj,
        task_start_time: startDate,
        task_end_date: endDate,
        task_duration: duration,
      });
    }
  };

  const increment_time = (duration) => {
    duration.hh += Math.floor(duration.mm / 60);
    duration.mm %= 60;
    duration.DD += Math.floor(duration.hh / 24);
    duration.hh %= 24;
    if (taskObj.task_start_time) {
      let end_date;
      if (duration.DD || duration.hh || duration.mm) {
        end_date = taskObj.task_start_time
          .add(duration.DD, "day")
          .add(duration.hh, "h")
          .add(duration.mm, "m");
      } else {
        end_date = null;
      }
      setTaskObj({
        ...taskObj,
        task_end_date: end_date,
        task_duration: { ...duration },
      });
    } else {
      setTaskObj({ ...taskObj, task_duration: duration });
    }
  };

  const end_date_change_handle = (date) => {
    const task_start_time = dayjs();
    const task_end_date = date;
    console.log(task_start_time);
    updateDuration(task_start_time, task_end_date);
  };

  const start_date_change_handle = (date) => {
    if (taskObj.task_end_date && taskObj.task_end_date.isAfter(date)) {
      updateDuration(date);
    } else {
      updateDuration(date, null);
    }
  };

  const onSubmitHandler = (ev) => {
    ev.preventDefault();
    console.log(taskObj);
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     updateDuration(dayjs(), taskObj.task_end_date);
  //   }, 1000 * 60 * 5);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // });

  return (
    <>
      <CssVarsProvider defaultMode="dark">
        <div className="flex min-w-[88rem] flex-col gap-4 bg-slate-800 p-10 rounded-3xl w-96">
          {/* <div>
            <div className="mb-2 block">
              <FormLabel>Task Name</FormLabel>
            </div>
            <Input
              value={taskObj.task_name}
              onChange={(ev) => {
                setTaskObj({ ...taskObj, task_name: ev.target.value });
              }}
              placeholder="my-Task-name...."
              required
            />
          </div> */}
          {/* <div>
            <div className="mb-2 block">
              <FormLabel>Description</FormLabel>
            </div>
            <Textarea
              value={taskObj.task_desc}
              onChange={(ev) => {
                setTaskObj({ ...taskObj, task_desc: ev.target.value });
              }}
              placeholder="Leave a comment..."
              minRows={4}
              className="p-2"
            />
          </div> */}

          {/* <Date_picker_with_FormLabel
            label="Start Date And Time"
            theme={darkTheme}
            value={taskObj.task_start_time}
            onChange={(date) => {
              start_date_change_handle(date);
            }}
            key={"DatePicker1"}
            ref={refs.startDateSelector}
          /> */}

          {/* <div className="flex flex-col justify-between gap-9">
            <Date_picker_with_FormLabel
              label="End Date and Time"
              value={taskObj.task_end_date}
              theme={darkTheme}
              key={"DatePicker2"}
              minDateTime={taskObj.task_start_time}
              onChange={(date) => {
                end_date_change_handle(date);
              }}
            />

            <div className="flex gap-4">
              <NumberInput
                onChange={(ev) => {
                  increment_time({
                    ...taskObj.task_duration,
                    DD: Number(ev.target.value),
                  });
                }}
                value={taskObj.task_duration.DD}
                min={0}
                label="DD"
                placeholder={"DD"}
                key={"3"}
                className="w-16 mt-2"
              />
              <NumberInput
                onChange={(ev) => {
                  increment_time({
                    ...taskObj.task_duration,
                    hh: Number(ev.target.value),
                  });
                }}
                value={taskObj.task_duration.hh}
                min={0}
                label="hh"
                placeholder={"hh"}
                key={"4"}
                className="w-16 mt-2"
              />
              <NumberInput
                onChange={(ev) => {
                  increment_time({
                    ...taskObj.task_duration,
                    mm: Number(ev.target.value),
                  });
                }}
                value={taskObj.task_duration.mm}
                min={0}
                label="mm"
                placeholder={"mm"}
                key={"5"}
                className="w-16 mt-2"
              />
            </div>
          </div> */}
          <div className="flex items-center gap-2">
            <Checkbox
              onChange={(ev) => {
                setPeriodic(ev.target.checked);
                console.log(taskObj);
              }}
              label="Make this Task Periodic?"
            />
          </div>

          {periodic && (
            <FormControl>
              <RadioGroup
                name="periodicity"
                className="ml-6"
                defaultValue="Hourly"
              >
                {[
                  {
                    label: "Hourly",
                    timePeriod: { YY: 0, DD: 0, MM: 0, hh: 1 },
                  },
                  {
                    label: "Daily",
                    timePeriod: { YY: 0, DD: 0, MM: 0, hh: 1 },
                  },
                  {
                    label: "Monthly",
                    timePeriod: { YY: 0, DD: 0, MM: 0, hh: 1 },
                  },
                  {
                    label: "Yearly",
                    timePeriod: { YY: 0, DD: 0, MM: 0, hh: 1 },
                  },
                ].map((value, index) => {
                  <Radio label={value.label} key = {`Radio-${index}`} />;
                })}
              </RadioGroup>
            </FormControl>
          )}
          <Button type="submit">Submit</Button>
        </div>
      </CssVarsProvider>
    </>
  );
}

function PeriodicityRadio({ label, timePeriod, setTimePeriod }) {
  return (
    <Radio
      // disabled={timePeriod.custom}
      // id={value}
      label={label}
      value={label}
      onChange={(ev) => {
        console.log(ev);
        if (ev.target.checked) {
          setTimePeriod(timePeriod);
        }
      }}
    />
  );
}

function NumberInput({
  label,
  placeholder,
  min,
  max,
  value,
  readOnly,
  onChange,
  className,
}) {
  return (
    <div className="flex flex-col">
      <span>{placeholder}</span>
      <Input
        // className={className}
        // type="number"
        placeholder={placeholder}
        max={max}
        min={min}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
      />
    </div>
  );
}

const Date_picker_with_FormLabel = React.forwardRef(
  ({ label, value, onChange, theme, disabled, readOnly, minDateTime }, ref) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <ThemeProvider theme={theme}>
          <div className="flex flex-col gap-2 grow">
            <FormLabel>label</FormLabel>
            <DateTimePicker
              ref={ref}
              value={value}
              onChange={onChange}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              disabled={disabled}
              readOnly={readOnly}
              minDateTime={minDateTime}
            />
          </div>
        </ThemeProvider>
      </LocalizationProvider>
    );
  }
);
