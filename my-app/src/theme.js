import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#266798",
    },
    type: "dark",
    background: {
      default: "#23282A",
      menu: "#171B1E",
      selected: "#72A1B8",
      border: "#454A4D",
      button: "#266798",
    },
    text: {
      primary: "#E0E0E0",
      secondary: "white",
      fontSize: 14,
    },
  },
  typography: {
    htmlFontSize: 20,
  },
});

theme.props = {
  MuiButton: {
    variant: "outlined",
  },
  MuiAppBar: {
    elevation: 0,
  },
};

theme.overrides = {};

export default theme;
