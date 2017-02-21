import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';


const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Please Login" />
      </Scene>

      <Scene key="main">
        <Scene 
          key="Profile" 
          component={Profile} 
          title="Profile" 
          initial
        />
      </Scene>
    </Router>
    );
};

export default RouterComponent;
