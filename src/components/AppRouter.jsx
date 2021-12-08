import React from 'react'
import { BrowserRouter as Router, Route, Switch,Redirect,useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import Homepage from '../pages/Homepage'
import Loginpage from '../pages/Loginpage'
import NotfoundPage from '../pages/NotfoundPage'
import Profilepage from '../pages/Profilepage'
import ProtectedPage from '../pages/ProtectedPage'
import Registerpage from '../pages/Registerpage'
import ResetPasswordPage from '../pages/ResetPasswordPage'

export default function AppRouter(props) {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <ProtechRoute exact path='/login' component={Loginpage} />
          <ProtechRoute exact path='/register' component={Registerpage} />
          <ProtechRoute exact path='/profile' component={Profilepage} />
          <ProtechRoute exact path='/protected-page' component={ProtectedPage} />
          <ProtechRoute exact path='/forgot-password' component={ForgotPasswordPage} />
          <ProtechRoute exact path='/reset-password' component={ResetPasswordPage} />
          <Route exact path='*' component={NotfoundPage} />
        </Switch>
      </Router>
    </>
  )
}

function ProtechRoute(props){
  const {currentUser} = useAuth();
  const location = useLocation();
  const { path } = props 

  if(path === '/login' || path === '/register' || path === '/forgot-password' || path === '/reset-password') {
    return currentUser ?
    ( 
      <Redirect to={location.state?.from ?? '/profile'} />
    ) :(
      <Route {...props} />
    )  
      
  }

  return currentUser ? <Route {...props}/> : <Redirect to={{
    pathname: '/login',
    state:{'from':path},
  }}/>
}