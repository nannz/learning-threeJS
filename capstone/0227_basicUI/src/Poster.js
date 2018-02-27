/**
 * Created by zhaonan on 2018/2/14.
 */
import React, {Component} from 'react';
import Shape from './Shape'
import './Poster.css';
import * as THREE from 'three';

class Poster extends Component {

    render() {
        return (
            <div className="Poster">
                <h1>{this.props.urName}</h1>
                <div>
                    {/*<p >{this.props.birthday}</p>*/}
                    <time>{this.props.birthday}</time>
                </div>
                <div id="shape">
                    <Shape shapeGeo = {this.props.shapeGeo} shapeText = {this.props.shape}/>
                    {/*<p>{this.props.shape}</p>*/}
                </div>

            </div>
        );
    }
}

export default Poster;
