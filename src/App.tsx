import './App.css';

import ScrollToTop from './components/ScrollToTop';
import Router from './routes/router';
import ThemeProvider from './theme';

function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Router />
    </ThemeProvider>
  );
}

export default App;
