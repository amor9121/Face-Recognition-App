import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import 'tachyons';
import './App.css';

const app = new Clarifai.App({apiKey: 'cd4351975ebb4aeca88f70a0cf0c9a9c'});

const particleOptions = {
  particles: {
    number:{
      value: 30,
      density: {
        enable:true,
        value_area:800
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box:{},
      route: 'signin',
      isSignIn: false
    }
  }
  calculateFaceLocation = (data) =>{
    
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width,height);
    return{
      leftCol:clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }  
  }

  displayFaceBox = (box) =>{
    console.log(box);
    this.setState({box:box});
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () =>{
    console.log('click');
    this.setState({imageUrl: this.state.input})
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));   
  }

  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState({isSignIn:false})
    }else if(route === 'home'){
      this.setState({isSignIn:true})
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className = "App">
      <Particles 
        className = 'particles'
        params = {{
          particleOptions
        }}
      />
      <Navigation isSignIn = {this.state.isSignIn} onRouteChange={this.onRouteChange}/>
      {this.state.route ==='home'
      ?
      <div>
        <Logo/>
        <Rank/>
        <ImageLinkForm 
        onInputChange = {this.onInputChange} 
        onButtonSubmit = {this.onButtonSubmit}
        />
        <FaceRecognition box = {this.state.box} imageUrl = {this.state.imageUrl}/> 
      </div>
      : (
        this.state.route ==='signin'
        ?<SignIn onRouteChange={this.onRouteChange}/>
        :<Register onRouteChange={this.onRouteChange}/>
        )
      }
      </div>
    );
  }
}

export default App;
