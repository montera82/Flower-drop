import Header from './Components/Header';
import Gallery from './Components/Gallery';
import Footer from './Components/Footer';
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
