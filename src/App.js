import './App.css';
//import jwtDecode from 'jwt-decode';
import Dashboard from './layouts/Dashboard';
import NavigationBar from './layouts/NavigationBar';
import { Container } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { setAuthenticate } from './store/actions/authenticateActions';
import { useEffect, useState } from 'react';

function App() {

  const dispatch = useDispatch();

  const [render, setRender] = useState(false)

  useEffect(() => {
    var jwt = localStorage.getItem("jwt");
    //var decodedJwt = jwtDecode(jwt);
    if (jwt) dispatch(setAuthenticate(true))
    setRender(true)
  }, [])

  return (
    <div className="App">
      {render
        ? <>
          <NavigationBar></NavigationBar>
          <Container className="main">
            <Dashboard></Dashboard>
          </Container>
        </>
        : null
      }
    </div>
  );
}

export default App;
