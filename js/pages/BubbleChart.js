import ExChart from '../components/ExChart';
import { connect } from 'react-redux';
import React from 'react';
import action from '../actions/home';
import theme from "../config/theme";

class BubbleChart extends React.PureComponent {
    render () {
        const { width, height, id, bubbleChartData: chartData,handleWebViewLoad } = this.props;
        return (
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
