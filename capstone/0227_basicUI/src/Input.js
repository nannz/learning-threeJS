/**
 * Created by zhaonan on 2018/2/14.
 */
import React, {Component} from 'react';
import './Input.css';
class Input extends Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e){
        return this.props.onChange(this.props.name, e.target.value);
    }
    render() {
        return (
            <div className="Input">
                <label>{this.props.label}</label>
                <input type = "text" onChange = {this.onChange} placeholder={this.props.placeholder}/>

            </div>
        );
    }
}

export default Input;
