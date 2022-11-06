import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import { COLOR_BY_QUANTILE } from "../../styles/theme";
import { Day } from "../../types/calendar";

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
