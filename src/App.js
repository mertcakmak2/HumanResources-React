import './App.css';
import Dashboard from './layouts/Dashboard';
import NavigationBar from './layouts/NavigationBar';
import { Container } from 'semantic-ui-react';

function App() {
  return (
    <div className="App">
      <NavigationBar></NavigationBar>
      <Container className="main">
        <Dashboard></Dashboard>
      </Container> 
    </div>
  );
}

export default App;
