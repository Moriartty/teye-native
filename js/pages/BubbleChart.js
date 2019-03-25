import ExChart from '../components/ExChart';
import { connect } from 'react-redux';
import React from 'react';
import {View,KeyboardAvoidingView} from 'react-native';
import {Button,Provider,Toast,Flex,SearchBar} from '@ant-design/react-native';
import action from '../actions/home';
import theme from "../config/theme";

class BubbleChart extends React.PureComponent {
    render () {
        const { width, height, id, bubbleChartData: chartData,handleWebViewLoad } = this.props;
        return (
            <KeyboardAvoidingView
                style={{flex:1,justifyContent:'space-around'}}
                behavior={'padding'}
            >
                <SearchBar style={{backgroundColor:theme["primary-color"]}} placeholder='please input product name'/>
                <ExChart
                    opt={{ type: 'le-chart' }}
                    data={chartData.data}
                    // chartOption={option}
                    width={'100%'}
                    minHeight={380}
                    onPress={this.props.onClick}
                    onLoadEnd={handleWebViewLoad.bind(this,'bubbleChartData',true)}
                    backgroundColor={theme["primary-color"]}
                />
            </KeyboardAvoidingView>
        );
    }
}
BubbleChart = connect(state => {
    const { bubbleChartData } = state['home'];
    return { bubbleChartData };
}, dispatch => ({
    onClick (e) {
        // const val = e.value[3];
        // dispatch(action.loadFirstChart(val));
        // dispatch(action.loadSecondChart());
        // dispatch(action.loadThirdChart());
        // dispatch(action.loadFourthChart(val));
        // dispatch(action.loadFifthChart());
    }
}))(BubbleChart);

export default BubbleChart;
