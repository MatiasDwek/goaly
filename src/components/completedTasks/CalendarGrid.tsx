import Box from "@mui/material/Box";
import { CompletedTasks } from "../../types/completedTask";
import { createCalendar } from "../../utils/dateUtils";
import { CalendarWeek } from "./CalendarWeek";

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
