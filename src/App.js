import './App.css';
//import jwtDecode from 'jwt-decode';
import Dashboard from './layouts/Dashboard';
import NavigationBar from './layouts/NavigationBar';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { Container } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { setAuthenticate } from './store/actions/authenticateActions';
import { useEffect, useState } from 'react';

function App() {

  const dispatch = useDispatch();

  const [render, setRender] = useState(false)

  useEffect(() => {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      var decodedJwt = jwtDecode(jwt);
      var tokenExpiredDateTime = new Date(decodedJwt.exp * 1000)
      var tokenExpired = moment(tokenExpiredDateTime)
      var now = new moment()
      var isExpired = moment(tokenExpired).isBefore(now)
      
      if (isExpired) clearAuthData();
      else dispatch(setAuthenticate(true))

    } else clearAuthData();
    
    setRender(true)
  })

  const clearAuthData = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user")
    dispatch(setAuthenticate(false))
  }

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
