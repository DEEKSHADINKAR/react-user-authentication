import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Cookies from 'js-cookie';

import AuthApi from "./AuthApi";
function App() {
  const [auth,setAuth] = React.useState (false);

  const readCookie = () =>{
    const user = Cookies.get("user");
    if (user){
      setAuth(true);
    }
  }
  React.useEffect(() => {
    readCookie();
  })

  return (
    <div>
       <AuthApi.Provider value={(auth,setAuth)}>
         <Router>
          <Routes/>
        </Router>
        </AuthApi.Provider> 
        
      </div>
      //<header className="App-header">
       // <img src={logo} className="App-logo" alt="logo" />
        //<p>
          //Edit <code>src/App.js</code> and save to reload.
        //</p>
        //<a
        //  className="App-link"
        //  href="https://reactjs.org"
        //  target="_blank"
         // rel="noopener noreferrer"
        //>
         // Learn React
        //</a>
      //</header>
    //</div>
  );
}

//LOGIN
const Login = () =>{
  const Auth = React.useContext(AuthApi)
  const handleOnClick = () =>{
    Auth.setAuth(true);
    Cookies.set('user', 'loginTrue')
  }
  return(
    <div1>
      <h1>SIGNUP PAGE</h1>
      <button onClick={handleOnClick}>Login</button>
    </div1>
  )
}

//DASHBOARD
const Dashboard = () =>{
  const Auth = React.useContext(AuthApi)
  const handleOnClick = () =>{
    Auth.setAuth(false);
    Cookies.remove('user');
  }
  return(
    <div1>
      <h1>Dashboard</h1>
      <button onClick={handleOnClick}>Logout</button>
    </div1>
  )
}

//ROUTES
const Routes = () =>{
  const Auth = React.useContext(AuthApi)
  return(
    <Switch>
      <ProtectedLogin path="/login" component={Login} auth={Auth.auth}/>
      <ProtectedRoute path="/Dashboard" auth={Auth.auth}component={Dashboard}/>
    </Switch>
  )
}


const ProtectedRoute = ({auth,component:Component,...rest}) =>{
  return(
    <Route
    {...rest}
    render ={()=>auth? (
      <Component/>
    ):
    (
      <Redirect to="/login"/>
    )
  }
    />
  )
}

const ProtectedLogin = ({auth,component:Component,...rest}) =>{
  return(
    <Route
    {...rest}
    render ={()=>!auth? (
      <Component/>
    ):
    (
      <Redirect to="/dashboard"/>
    )
  }
    />
  )
}

export default App;
