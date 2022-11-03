import Box from "@mui/material/Box";
import { CompletedTasks } from "../../reducers/completedTasksReducer";
import { Week } from "../../types/calendar";
import { createCalendar } from "../../utils/dateUtils";

const commonStyles = {
  bgcolor: "background.paper",
  m: 1,
  border: 1,
  width: "5rem",
  height: "5rem",
};

const shapeStyles = {
  bgcolor: "primary.main",
  borderColor: "text.primary",
  width: 12,
  height: 12,
  border: 0.5,
  borderRadius: 0.4,
  m: 0.2,
};

export const CalendarDay = () => {
  return <Box sx={shapeStyles} />;
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
        return <CalendarDay key={day.date.valueOf()} />;
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
