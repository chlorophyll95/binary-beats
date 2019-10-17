import './ui.css';
import React, { Component } from 'react';

interface PropType {
    tempo: number;
}

export default class Ripple extends Component<PropType, {}> {
    render() {
        let tempo = this.props.tempo;
        let time = 60/tempo;
        let ripple = {
            animation: 'ripple ' + time + 's infinite'
        }
        return (
        <div className="keyframes">
            <div className="container">
              <div className="ripple" style={ripple}></div>
            </div>
          </div>
        );
    }
}
