import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import Popper from "@mui/material/Popper";
import { Fragment, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { completeTask } from "../reducers/completedTasksReducer";
import { CheckInDay } from "../types/completedTask";
import { getFormattedDate } from "../utils/dateUtils";

interface CheckInFormProps {
  id: string;
  completedYesterday: boolean;
  completedToday: boolean;
  initDay: CheckInDay;
}

const options: Record<CheckInDay, string> = {
  today: "Check-in today",
  yesterday: "Check-in yesterday",
};

export function SplitButton({
  id,
  completedToday,
  completedYesterday,
  initDay,
}: CheckInFormProps) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState(initDay);

  useEffect(() => {
    setSelectedDay(initDay);
  }, [completedToday, completedYesterday]);

  const loading = useAppSelector((state) => state.loading);
  if (loading.completedTasks) {
    // TODO create a real loading component
    return <div>Loading...</div>;
  }

  const handleClick = async () => {
    const newCompletedTask = {
      date: getFormattedDate(selectedDay),
      taskId: id,
    };
    setSelectedDay(selectedDay === "today" ? "yesterday" : "today");
    dispatch(completeTask(newCompletedTask));
  };

  const handleMenuItemClick = (
    _event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    optionDay: CheckInDay
  ) => {
    setSelectedDay(optionDay);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    // Prevents clicks on the button when dropdown is open
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button
          disabled={completedToday && completedYesterday}
          onClick={handleClick}
        >
          {options[selectedDay]}
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          disabled={completedToday && completedYesterday}
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {Object.entries(options)
                    .sort()
                    .map((option) => {
                      const optionDay = option[0] as CheckInDay;
                      const optionValue = option[1];
                      return (
                        <MenuItem
                          key={optionDay}
                          disabled={
                            (optionDay === "today" && completedToday) ||
                            (optionDay === "yesterday" && completedYesterday)
                          }
                          selected={optionDay === selectedDay}
                          onClick={(event) =>
                            handleMenuItemClick(event, optionDay)
                          }
                        >
                          {optionValue}
                        </MenuItem>
                      );
                    })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
}

export default SplitButton;
