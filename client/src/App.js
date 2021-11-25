import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from './components/Header';
import Gallery from './components/Gallery';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import { AppContextProvider } from './AppContext';
import './App.css';

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact="true">
            <Welcome />
          </Route>
          <Route path="/claim">
            <Gallery />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </AppContextProvider>
  );
}

export default App;
