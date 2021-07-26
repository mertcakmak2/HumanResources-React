import './App.css';
//import jwtDecode from 'jwt-decode';
import Dashboard from './layouts/Dashboard';
import NavigationBar from './layouts/NavigationBar';
import { Container } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { setAuthenticate } from './store/actions/authenticateActions';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    var jwt = localStorage.getItem("jwt");
    //var decodedJwt = jwtDecode(jwt);
    if (jwt) dispatch(setAuthenticate(true))
  }, [])

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
