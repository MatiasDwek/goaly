import { alpha, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Fragment } from "react";
import { Calendar } from "../../types/calendar";
import { CompletedTasks } from "../../types/completedTask";
import { createCalendar } from "../../utils/calendarUtils";
import { MONTH_SHORT_NAMES } from "../../utils/dateUtils";
import { CalendarWeek } from "./CalendarWeek";

const DAY_LEGEND_WIDTH = 30;
const DAY_WIDTH_WITH_MARGINS = 15.2;

const MonthLegend = ({
  name,
  numberOfWeeks,
}: {
  name?: string;
  numberOfWeeks?: number;
}) => {
  let width;
  if (name === undefined || numberOfWeeks === undefined) {
    width = DAY_LEGEND_WIDTH + 1;
  } else {
    // A little bit hacky, could be done better, good enough for now
    width = numberOfWeeks * DAY_WIDTH_WITH_MARGINS;
  }

  return (
    <Box
      display="flex"
      justifyContent="flex-bottom"
      sx={{
        width: width,
        bgcolor: alpha("#ffffff", 1),
        flexGrow: 0,
        flexShrink: 0,
      }}
    >
      <Typography sx={{ fontSize: "0.725rem" }} variant="caption">
        {name && name}
      </Typography>
    </Box>
  );
};

const DayLegend = ({ day }: { day?: string }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      sx={{
        bgcolor: alpha("#ffffff", 1),
        width: DAY_LEGEND_WIDTH,
        height: 12,
        border: 0.5,
        borderRadius: 0.4,
        borderColor: alpha("#ffffff", 1),
        m: 0.2,
        p: 0,
        mx: "auto",
      }}
    >
      <Typography sx={{ m: 0, fontSize: "0.725rem" }} variant="caption">
        {day}
      </Typography>
    </Box>
  );
};

export const CalendarGrid = ({
  startDay,
  endDay,
  completedTasks,
}: {
  startDay: Date;
  endDay: Date;
  completedTasks: CompletedTasks;
}) => {
  const calendar = createCalendar(startDay, endDay, completedTasks);
  const monthArray = createMonthArray(calendar);
  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          position: "relative",
        }}
      >
        <MonthLegend />
        {monthArray.map((month, i) => {
          return (
            <MonthLegend
              name={month.name}
              numberOfWeeks={month.numberOfWeeks}
              key={i}
            />
          );
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DayLegend />
          <DayLegend day="Mon" />
          <DayLegend />
          <DayLegend day="Wed" />
          <DayLegend />
          <DayLegend day="Fri" />
          <DayLegend />
        </Box>
        {calendar.map((week, i) => {
          return <CalendarWeek key={i} week={week} />;
        })}
      </Box>
    </Fragment>
  );
};

function createMonthArray(calendar: Calendar): {
  name: string;
  numberOfWeeks: number;
}[] {
  let previousMonth = calendar[0][0].date.getMonth();
  let numberOfWeeks = 0;
  const monthArray = [];
  for (let i = 0; i < calendar.length; i++) {
    const currentMonth = calendar[i][0].date.getMonth();
    if (currentMonth !== previousMonth || i === calendar.length - 1) {
      if (i === calendar.length - 1) {
        previousMonth = calendar[i][0].date.getMonth();
      }
      monthArray.push({
        name: MONTH_SHORT_NAMES[previousMonth],
        numberOfWeeks,
      });
      previousMonth = calendar[i][0].date.getMonth();
      numberOfWeeks = 1;
    } else {
      numberOfWeeks++;
    }
  }
  return monthArray;
}
