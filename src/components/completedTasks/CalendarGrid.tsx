import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import { CompletedTasks } from "../../reducers/completedTasksReducer";
import { COLOR_BY_QUANTILE } from "../../styles/theme";
import { Day, Week } from "../../types/calendar";
import { prepend } from "../../utils/commonUtils";
import { createCalendar } from "../../utils/dateUtils";

function getDayStyle(quantile: number) {
  return {
    bgcolor:
      COLOR_BY_QUANTILE[
        Math.min(quantile, Object.keys(COLOR_BY_QUANTILE).length - 1)
      ],
    width: 12,
    height: 12,
    border: 0.5,
    borderRadius: 0.4,
    borderColor: "grey.500",
    m: 0.2,
  };
}

function getPadDayStyle() {
  return {
    ...getDayStyle(0),
    bgcolor: alpha("#ffffff", 1),
    borderColor: alpha("#ffffff", 1),
  };
}

export const CalendarDay = ({ day }: { day: Day | undefined }) => {
  if (day !== undefined) {
    return <Box sx={getDayStyle(day.quantile)} />;
  } else {
    // undefined days are for padding
    return <Box sx={getPadDayStyle()} />;
  }
};

const CalendarWeek = ({ week }: { week: Week }) => {
  const paddedWeek = [...week]; // padded week with dummy values to make grid pretty
  if (week.length < 7 && week.length > 0) {
    const firstDay = week[0].date.getDay();
    if (firstDay !== 0) {
      for (let i = 0; i < firstDay; i++) {
        prepend(paddedWeek, undefined);
      }
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {paddedWeek.map((day, i) => {
        return <CalendarDay key={i} day={day} />;
      })}
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
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {calendar.map((week, i) => {
        return <CalendarWeek key={i} week={week} />;
      })}
    </Box>
  );
};
