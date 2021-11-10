import WorldMap from "./components/WorldMap";
import FlagIt from "./components/FlagIt";
import NavBar from "./components/NavBar";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const primaryColor = "#0E305D";
const secondayColor = "#03989E";
const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      contrastText: "#fff",
    },
    secondary: {
      main: secondayColor,
      contrastText: "#fff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <WorldMap color={secondayColor} />
            </Route>
            <Route path="/flagit">
              <FlagIt />
            </Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
}
export default App;
