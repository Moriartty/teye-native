import ExChart from '../components/ExChart';
import { connect } from 'react-redux';
import React from 'react';
import action from '../actions/home';

class BubbleChart extends React.PureComponent {
    render () {
        const { width, height, id, bubbleChartData: chartData } = this.props;
        return (
            <ExChart
                opt={{ type: 'le-chart' }}
                data={chartData.data}
                // chartOption={option}
                width={'100%'}
                minHeight={450}
                onClick={this.props.onClick}
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
