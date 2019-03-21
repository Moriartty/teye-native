import React, { Component } from 'react';
import { WebView, View } from 'react-native';
import Plugin from './plugin'

export default class App extends Component {

    setNewOption(option) {
        this.chart.setNewOption(option);
    }

    render() {
        return (
            <Container width={this.props.width}>
                <Echarts {...this.props} ref={e => this.chart = e}/>
            </Container>
        );
    }
}
