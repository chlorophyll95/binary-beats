import './ui.css';
import React, { Component } from 'react';

interface PropType {
    tempo: number;
}

export default class Bars extends Component<PropType, {}> {
    render() {
        let tempo = this.props.tempo;
        let time = 60/tempo;
        let delay1 = time / 4;
        let delay2 = 2*delay1;
        let delay3 = 3*delay1; 
        let bar1 = {
             animation: 'bar ' + time + 's ease-in-out infinite'
        }
        let bar2 = {
             animation: 'bar ' + time + 's ease-in-out ' + delay1 + 's infinite',
        }
        let bar3 = {
             animation: 'bar ' + time + 's ease-in-out ' + delay2 + 's infinite',
        }
        let bar4 = {
             animation: 'bar ' + time + 's ease-in-out ' + delay3 + 's infinite',
        }
        return (
        <div className="keyframes">
            <div className="container">
              <div className="bar" style={bar1}></div>
              <div className="bar" style={bar2}></div>
              <div className="bar" style={bar3}></div>
              <div className="bar" style={bar4}></div>
            </div>
          </div>
        );
    }
}
