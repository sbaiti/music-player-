import React, { useEffect } from 'react';
import jwtDecode from "jwt-decode"
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes/index'
import Header from './components/header/header'
import store, { history } from './store'
import loginActions from './redux/login/signin'

function App() {
  /* hookes */

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("appToken");
      const userDecoded = jwtDecode(jwt);
      if (userDecoded && (userDecoded.exp > (Date.now() / 1000))) {
        store.dispatch(loginActions.loginSuccess({ user: userDecoded }));
      }
    } catch (ex) {
      return null;
    }
  }, []);

  return (
    <div>
      <Router histoty={history}>
        <div className="containerAp">
          <Header />
          <div className="container">
            {Routes}
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
