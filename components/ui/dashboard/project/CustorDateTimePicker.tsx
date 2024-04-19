import * as React from "react";
import {
  LocalizationProvider,
  renderTimeViewClock,
  StaticDateTimePicker,
  StaticDateTimePickerProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
interface ICustomDateTimePickerProps extends StaticDateTimePickerProps<Dayjs> {
}

const CustomDateTimePicker: React.FunctionComponent<
  ICustomDateTimePickerProps
> = ({...props}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDateTimePicker
        {...props}
        // viewRenderers={{
        //   hours: renderTimeViewClock,
        //   minutes: renderTimeViewClock,
        //   seconds: renderTimeViewClock,
        // }}
      />
    </LocalizationProvider>
  );
};

export default CustomDateTimePicker;
