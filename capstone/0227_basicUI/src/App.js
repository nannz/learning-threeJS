
// import ReactTHREE from 'react-three';
// import THREE from 'three';

import React, {Component} from 'react';
import './App.css';
import Input from './Input'
import Poster from './Poster'
import Selector from './Selector'
import * as THREE from 'three';

class App extends Component {
    constructor(props) {
        super(props);

        this.changeShape = this.changeShape.bind(this);
        this.onInputChange = this.onInputChange.bind(this);

        this.state = {
            urName: "Name",
            birthday: "03/08/1996",
            eventLocation: "Where is it?",
            eventTime:"Wheeeeen?",
            shape:"none",
            shapeGeo: new THREE.BoxGeometry(0, 0, 0),

        }
    }

    onInputChange(name, value){
        this.setState({
            [name]:value
        })
    }

    changeShape(shape, shapeGeo){
        this.setState({
            shape: shape,
            shapeGeo: shapeGeo
        });
    }

    render() {

        return (
            <div className="App">
                <div className="form">
                    <Input label="Your Name" name = "urName" onChange={this.onInputChange} placeholder={this.state.urName}/>
                    <Input label = "Your Birthday" name = "birthday" onChange={this.onInputChange} placeholder={this.state.birthday}/>
                    {/*<Input label="Location" name = "eventLocation" onChange={this.onInputChange} placeholder={this.state.eventLocation}/>*/}
                    {/*<Input label="Time" name = "eventTime" onChange={this.onInputChange} placeholder={this.state.eventTime}/>*/}



                    <Selector label = "Shape" onChange = {this.changeShape}/>
                </div>
                <Poster className="Poster" urName={this.state.urName} birthday = {this.state.birthday} shape = {this.state.shape} shapeGeo = {this.state.shapeGeo}/>
            </div>
        );
    }
}

export default App;
