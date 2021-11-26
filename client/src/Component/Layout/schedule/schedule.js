import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core/styles";
import Axios from "axios";
import moment from "moment";
//import makeTodayAppointment from "./today-appointments";

const useStyles = makeStyles((theme) => ({
  todayCell: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.14),
    },
    "&:focus": {
      backgroundColor: alpha(theme.palette.primary.main, 0.16),
    },
  },
  weekendCell: {
    backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    "&:hover": {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    },
    "&:focus": {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    },
  },
  today: {
    backgroundColor: alpha(theme.palette.primary.main, 0.16),
  },
  weekend: {
    backgroundColor: alpha(theme.palette.action.disabledBackground, 0.06),
  },
}));

const TimeTableCell = (props) => {
  const classes = useStyles();
  const { startDate } = props;
  const date = new Date(startDate);

  if (date.getDate() === new Date().getDate()) {
    return <WeekView.TimeTableCell {...props} className={classes.todayCell} />;
  }
  if (date.getDay() === 0 || date.getDay() === 6) {
    return (
      <WeekView.TimeTableCell {...props} className={classes.weekendCell} />
    );
  }
  return <WeekView.TimeTableCell {...props} />;
};

const DayScaleCell = (props) => {
  const classes = useStyles();
  const { startDate, today } = props;

  if (today) {
    return <WeekView.DayScaleCell {...props} className={classes.today} />;
  }
  if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return <WeekView.DayScaleCell {...props} className={classes.weekend} />;
  }
  return <WeekView.DayScaleCell {...props} />;
};

const Schedule = () => {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const currentDate = moment();
    Axios.get("http://localhost:1337/api/get/schedule").then((response) => {
      const makeTodayAppointment = (startDate, endDate) => {
        const nextStartDate = moment(startDate)
          .year(currentDate.year())
          .month(currentDate.month());

        const nextEndDate = moment(endDate)
          .year(currentDate.year())
          .month(currentDate.month());

        return {
          startDate: nextStartDate.toDate(),
          endDate: nextEndDate.toDate(),
        };
      };
      const result = response.data.map(
        ({ startDate, endDate, ...restArgs }) => {
          const data = {
            ...makeTodayAppointment(startDate, endDate),
            ...restArgs,
          };

          return data;
        }
      );
      setAppointments(result);
    });
  });
  console.log(appointments);
  return (
    <Paper>
      <Scheduler data={appointments}>
        <ViewState />
        <WeekView
          startDayHour={7}
          endDayHour={18}
          timeTableCellComponent={TimeTableCell}
          dayScaleCellComponent={DayScaleCell}
        />
        <Appointments />
      </Scheduler>
    </Paper>
  );
};

export default Schedule;
