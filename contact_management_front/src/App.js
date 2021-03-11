import logo from './logo.svg';
import './App.css';
import AppBar from './components/AppBar';
import ContactsGrid from './containers/ContactsGrid';
import {ThemeProvider} from '@material-ui/core/styles';

function App() {
  return (
    <ThemeProvider>
      <AppBar/>
      <ContactsGrid/>
    </ThemeProvider>
  );
}

export default App;
