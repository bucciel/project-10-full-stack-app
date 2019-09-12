import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* import routes for components */
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Header from './components/Header';

import Error from './components/Error';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';

// import withContext from './Context';
// import PrivateRoute from './PrivateRoute';

// const HeaderWithContext = withContext(Header);
// const UserSignUpWithContext = withContext(UserSignUp);
// const UserSignInWithContext = withContext(UserSignIn);
// const UserSignOutWithContext = withContext(UserSignOut);

class App extends Component {     // renders application components and routes

}

export default App;
