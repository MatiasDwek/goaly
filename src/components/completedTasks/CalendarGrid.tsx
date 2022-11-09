import { alpha, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { CompletedTasks } from "../../types/completedTask";
import { createCalendar } from "../../utils/calendarUtils";
import { CalendarWeek } from "./CalendarWeek";

const DayLegend = ({ day }: { day: string }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      // alignItems="center"
      sx={{
        bgcolor: alpha("#ffffff", 1),
        width: 30,
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
  return (
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
        <DayLegend day="" />
        <DayLegend day="Mon" />
        <DayLegend day="" />
        <DayLegend day="Wed" />
        <DayLegend day="" />
        <DayLegend day="Fri" />
        <DayLegend day="" />
      </Box>
      {calendar.map((week, i) => {
        return <CalendarWeek key={i} week={week} />;
      })}
    </Box>
  );
};
