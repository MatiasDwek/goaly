import { alpha, Fade, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import { Fragment } from "react";
import { COLOR_BY_QUANTILE } from "../../styles/theme";
import { Day } from "../../types/calendar";
import { getHumanReadableDay } from "../../utils/dateUtils";

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
    const numberOfCompletedTasks = day.completedTasks.length;
    return (
      <Tooltip
        arrow
        title={
          <Fragment>
            <b>
              {numberOfCompletedTasks > 0 ? `${numberOfCompletedTasks}` : "No"}
              {" completed tasks on "}
            </b>
            {getHumanReadableDay(day.date)}
          </Fragment>
        }
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 0 }}
        placement="top"
        disableInteractive
      >
        <Box sx={getDayStyle(day.quantile)} />
      </Tooltip>
    );
  } else {
    // undefined days are for padding
    return <Box sx={getPadDayStyle()} />;
  }
};
