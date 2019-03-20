import React, { Component } from 'react';
import { WebView, View, StyleSheet, Platform ,Text} from 'react-native';
import renderChart from './renderChart';
// import echarts from './echarts.min';
// import echarts from 'echarts';

const iosPlatform = Platform.OS === 'ios'?true:false;
const maskBgColor = 'rgba(0, 0, 0, 0.1)'
export default class App extends Component {

  constructor(props) {
    super(props);
    this.setNewOption = this.setNewOption.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.option !== this.props.option) {
      this.refs.chart.reload();
    }
  }

  setNewOption(option) {
    this.refs.chart.postMessage(JSON.stringify(option));
  }

  render() {
    return (
      <View style={{flex: 1, height: this.props.height || 400,}}>
        <WebView
          ref="chart"
          scrollEnabled = {false}
          injectedJavaScript = {renderChart(this.props)}
          style={{
            height: this.props.height || 400,
            // backgroundColor: this.props.backgroundColor || 'transparent'
            backgroundColor:'transparent'
          }}
          renderLoading={()=>{return <View style={{backgroundColor:this.props.backgroundColor||'white'}}></View>}}
          scalesPageToFit={Platform.OS !== 'ios'}
          originWhitelist={['*']}
          onLoadEnd={this.props.onLoadEnd}
          source={iosPlatform?require('./tpl.html'):{uri:'file:///android_asset/tpl.html'}}
          onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
        />
      </View>
    );
  }
}
