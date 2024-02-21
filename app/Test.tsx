"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import "@fontsource/inter";

import {
  FormHelperText,
  Checkbox,
  Button,
  Switch,
  Textarea,
  Input,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,  
} from "@mui/joy/";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import "dayjs/locale/en-gb";
import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

import { CssVarsProvider } from "@mui/joy/styles";

import "@/app/globals.css";

// dayjs.extend(require('dayjs/plugin/duration'))

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function Test() {

  return (
    <>
      <CssVarsProvider defaultMode="dark">
        <div className="bg-slate-800 h-screen w-screen flex flex-col gap-2">
          <FormControl>
            <FormLabel>Variants</FormLabel>
              <Radio value ="Outlined" name ="style"   label="Outlined" defaultChecked  />
              <Radio value ="Soft" name ="style"  label="Soft"  />
              <Radio value ="Solid" name ="style"   label="Solid"  />
              <Radio value ="Plain" name ="style"   label="Plain"  />
          </FormControl>
        </div>
      </CssVarsProvider>
    </>
  );
}
