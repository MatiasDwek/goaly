import Box from "@mui/material/Box";
import { CompletedTasks } from "../../reducers/completedTasksReducer";
import { COLOR_BY_QUANTILE } from "../../styles/theme";
import { Day, Week } from "../../types/calendar";
import { createCalendar } from "../../utils/dateUtils";

function getDayStyle(quantile: number) {
  return {
    bgcolor:
      COLOR_BY_QUANTILE[
        Math.min(quantile, Object.keys(COLOR_BY_QUANTILE).length - 1)
      ],
    borderColor: "text.primary",
    width: 12,
    height: 12,
    border: 0.5,
    borderRadius: 0.4,
    m: 0.2,
  };
}

export const CalendarDay = ({ day }: { day: Day }) => {
  return <Box sx={getDayStyle(day.quantile)} />;
};

const CalendarWeek = ({ week }: { week: Week }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {week.map((day) => {
        return <CalendarDay key={day.date.valueOf()} day={day} />;
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
