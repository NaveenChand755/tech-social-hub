import React ,{Fragment , useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router ,Route , Switch } from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import Landing from './components/layouts/Landing'
import EditProfile from './components/Profile_form/EditProfile'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/Profile_form/CreateProfile'
import Alert from './components/layouts/Alert'
import PrivateRoute from './components/routing/PrivateRoute'
import Experience from './components/Profile_form/Experience '
import Education from './components/Profile_form/Education'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'


//redux { provider}
import { Provider } from 'react-redux'
import store from './store'
import {loadUser} from './actions/auth'
import setAuthToken from './utils/setAuthToken'


if(localStorage.token ){
  setAuthToken(localStorage.token)
}

const App =() =>{

  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);
  
  return(
    <Provider store={store}>
    <Router>
    <Fragment>
      <Navbar></Navbar>
      <Route exact path ='/' component ={Landing}></Route>
      <section className="container">
        <Alert/>
      <Switch>
      <Route exact path ='/register' component ={Register}></Route>
      <Route exact path ='/login' component ={Login}></Route>
      <PrivateRoute exact path ='/dashboard' component ={Dashboard}></PrivateRoute>
      <PrivateRoute exact path ='/create-profile' component ={CreateProfile}></PrivateRoute>
      <PrivateRoute exact path ='/edit-profile' component ={EditProfile}></PrivateRoute>
      <PrivateRoute exact path ='/add-experience' component ={Experience}></PrivateRoute>
      <PrivateRoute exact path ='/add-education' component ={Education}></PrivateRoute>
      <PrivateRoute exact path ='/posts' component ={Posts}></PrivateRoute>
      <PrivateRoute exact path ='/posts/:id' component ={Post}></PrivateRoute>
      <Route exact path ='/profiles' component ={Profiles}></Route>
      <Route exact path ='/profile/:id' component ={Profile}></Route>
      </Switch>
      </section>
    </Fragment>
    </Router>
    </Provider>
)}

export default App;
