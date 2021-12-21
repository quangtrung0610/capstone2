import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { alpha, makeStyles } from "@material-ui/core/styles";
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
  const currentDate = moment().startOf("week").add(1, "day");
  let date = currentDate.date();
  let lastDate;

  useEffect(() => {
    Axios.get("http://localhost:1337/api/get/schedule", {
      withCredentials: true,
    }).then((response) => {
      //get data from API and return to appointments
      setAppointments(response.data.result);
    });
  }, []);

  //
  const makeTodayAppointment = (startDate, endDate) => {
    const days = moment(startDate).diff(endDate, "days");
    const nextStartDate = moment(startDate)
      .year(currentDate.year())
      .month(currentDate.month())
      .date(date);
    const nextEndDate = moment(endDate)
      .year(currentDate.year())
      .month(currentDate.month())
      .date(date + days);
    return {
      startDate: nextStartDate.toDate(),
      endDate: nextEndDate.toDate(),
    };
  };
  const result = appointments.map((appointment) => {
    const { startDate, endDate, ...restArgs } = appointment;
    const comparedDate = new Date(startDate);
    if (lastDate && lastDate.getDate() !== comparedDate.getDate()) {
      date += 1;
      if (date > 31) date = 1;
    }
    lastDate = comparedDate;
    const data = {
      ...makeTodayAppointment(startDate, endDate),
      ...restArgs,
      //title: ,
    };
    return data;
  });

  const Appointment = ({ children, style, ...restProps }) => (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: "#0044ff",
        borderRadius: "8px",
        fontSize: "15px",
      }}
    >
      {children}
    </Appointments.Appointment>
  );
  //console.log(appointments);
  return (
    <Paper>
      <Scheduler data={result}>
        <ViewState />
        <WeekView
          startDayHour={7}
          endDayHour={17}
          timeTableCellComponent={TimeTableCell}
          dayScaleCellComponent={DayScaleCell}
        />
        <Appointments appointmentComponent={Appointment} />
      </Scheduler>
    </Paper>
  );
};

export default Schedule;
