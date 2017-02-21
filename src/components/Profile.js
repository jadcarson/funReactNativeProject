import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { NativeModules, PropTypes } from 'react-native';
import { emailChanged, passwordChanged } from '../actions';
import { Card, CardSection, Input, Button } from './common';


  const Platform = require('react-native').Platform;

  const ImagePicker = require('react-native-image-picker');

  const options = {
    title: 'Select Avatar',
    customButtons: [
      { name: 'fb', title: 'Choose Photo from Facebook' },
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };


class Profile extends Component {

  state = { pressed: 'Login!' }
  
  componentWillMount() {
    //Need to show all profile pictures here.
    console.log('mounting!');
    axios.get(`http://10.0.2.2:3000/profile/${this.props.user_id}`)
      .then((profile) => {
        console.log(profile);
      });
    axios.get(`http://10.0.2.2:3000/profile/${this.props.user_id}/pictures`)
      .then((pictures) => {
        console.log('pics', pictures);
      });

    //send server request for profile using user_id if your profile isn't loaded
  }

  onButtonPress() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
    console.log('testing', response.data);
    // You can display the image using either data...
    const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

    // or a reference to the platform specific asset location
    // if (Platform.OS === 'ios') {
    //   const source = {uri: response.uri.replace('file://', ''), isStatic: true};
    // } else {
    //   const source = {uri: response.uri, isStatic: true};
    // }
    axios.post(`http://10.0.2.2:3000/profile/${this.props.user_id}/image`, {
      image: response.data,
      imageNumber: 1
    })
      .then((imageResponse) => {
        console.log('here now', imageResponse);
      });
    this.setState({
      avatarSource: source
    });
  }
});
  }

  render() {
      console.log(this.state.pressed);
      return (
        <Card>
          <CardSection>
            <Input
              label="New Email"
              placeHolder="email@gmail.com"
            />
          </CardSection>
          
          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeHolder="password"
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
    password: state.auth.password,
    user_id: state.auth.user_id
  };
};


export default connect(mapStateToProps, { emailChanged, passwordChanged })(Profile);
