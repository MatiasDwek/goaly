import Box from "@mui/material/Box";
import { Week } from "../../types/calendar";
import { prepend } from "../../utils/commonUtils";
import { CalendarDay } from "./CalendarDay";

export const CalendarWeek = ({ week }: { week: Week }) => {
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
