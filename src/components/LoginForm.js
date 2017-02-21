import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { NativeModules, PropTypes } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, userID } from '../actions';
import { Card, CardSection, Input, Button } from './common';

class LoginForm extends Component {

  state = { pressed: 'Login!' }

  onButtonPress() {
    console.log('Here now!', this.props.email, this.props.password);

    axios.post('http://10.0.2.2:3000/signIn', {
      email: this.props.email,
      password: this.props.password
    }) 
    .then(response => {
      console.log('response', response);
      if (response.data === false) {
        console.log('bad username or password');
      } else {
        this.props.userID(response.data);
        Actions.main();
      }
    })
    .catch(error => {
      console.log('error', error);
    });  

    
    // axios.get('http://10.0.2.2:3000/')
    //   .then(response => console.log(response))
    //   .catch(error => console.log(error));
    // this.setState({ pressed: 'Did it!' });
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  render() {
    console.log(this.state.pressed);
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeHolder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>
        
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeHolder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            { this.state.pressed }
          </Button>
        </CardSection>
      </Card>
      );
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password
  };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, userID })(LoginForm);
