import './App.css';

import ScrollToTop from './components/ScrollToTop';
import GlobalProvider from './context';
import Router from './routes/router';
import ThemeProvider from './theme';

function App() {
  return (
    <GlobalProvider>
      <ThemeProvider>
        <ScrollToTop />
        <Router />
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default App;
