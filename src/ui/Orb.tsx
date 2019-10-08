import './Orb.css';
import React, { Component } from 'react';

interface PropType {
    tempo: number;
}

export default class Orb extends Component<PropType, {}> {
    constructor(props: PropType) {
        super(props);
    }
    render() {
        let tempo = this.props.tempo;
        let time = 60/tempo;
        let circleStyles = {
            animation: 'pulse ' + time + 's ease-in-out infinite'
        }
        return (
        <div className="keyframes">
            <div className="container">
              <div className="circle" style={circleStyles}></div>  
            </div>  
          </div>
        );
    }
}