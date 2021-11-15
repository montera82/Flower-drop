import Header from './components/Header';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import { AppContextProvider } from './AppContext';
import './App.css';

function App() {
  return (
    <AppContextProvider>
      <Header />
      <Gallery />
      <Footer />
    </AppContextProvider>
  );
}

export default App;
