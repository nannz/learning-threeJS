/**
 * Created by zhaonan on 2018/2/14.
 */
import React, {Component} from 'react';
import './Selector.css';
import * as THREE from 'three';

class Selector extends Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            value : "none"
            // shapeGeo: new THREE.BoxGeometry(1, 1, 1)
        }
    }
    onChange(e){
        this.setState({
            value: e.target.value
        });
        if(e.target.value === "box"){
            //this.setState({shapeGeo:new THREE.BoxGeometry(20, 20, 20) });
            return this.props.onChange( e.target.value,new THREE.BoxGeometry(20, 20, 20));
        }else if (e.target.value === "sphere"){
            //this.setState({shapeGeo:new THREE.SphereGeometry(15, 20, 20)});
            return this.props.onChange( e.target.value,new THREE.SphereGeometry(15, 20, 20));
        }else{
            //this.setState({shapeGeo:new THREE.BoxGeometry(1, 1, 1) });
            return this.props.onChange( e.target.value,new THREE.BoxGeometry(0, 0, 0));
        }
        //return this.props.onChange( e.target.value,this.state.shapeGeo);
    }

    render() {
        return (
            <div className="Selector">
                <label>{this.props.label}</label>
                <select value = {this.state.value} onChange = {this.onChange}>
                    <option value="none" >None</option>
                    <option value="sphere">Sphere</option>
                    <option value="box">Box</option>
                </select>
            </div>
        );
    }
}

export default Selector;