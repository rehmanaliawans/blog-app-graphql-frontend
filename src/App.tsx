import "./App.css";
import ThemeProvider from "./theme";
import ScrollToTop from "./components/ScrollToTop";
import Router from "./routes/router";

function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Router />
    </ThemeProvider>
  );
}

export default App;
