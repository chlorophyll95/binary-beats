import React, { Component } from 'react';
import Orb from '../ui/Orb';
import Ripple from '../ui/Ripple';
import Bars from '../ui/Bars';

interface PropType {
    tempo: number;
    shape: string;
}

export default class Visualizer extends Component<PropType, {}> {
    render() {
        let display = <Orb tempo={this.props.tempo} />;
        if (this.props.shape === "ripple") {
            display = <Ripple tempo={this.props.tempo} />
        }
        else if (this.props.shape === "bars") {
            display = <Bars tempo={this.props.tempo} />
        }
        return display;
    }
}
