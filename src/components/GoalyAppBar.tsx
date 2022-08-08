import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const GoalyAppBar = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "background.default",
        borderBottom: 1,
        borderColor: "grey.300",
      }}
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              fontWeight: 300,
              color: "primary.main",
              fontStyle: "bold",
              textDecoration: "none",
            }}
          >
            GOALY
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default GoalyAppBar;
