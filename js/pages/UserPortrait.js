import React from 'react';
import { Text, View,Image,Button } from 'react-native';
import {connect} from 'react-redux';
import ExChart from '../components/ExChart';
import action from '../actions/home';

class UserPortrait extends React.Component {
    componentWillMount() {
        this.props.init();
    }
    handleClick = () => {
        this.props.reHref(this.props.navigation.navigate);
    }
    render() {
        const {firstChartData:chartData} = this.props;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ExChart
                    opt={{ type: 'time-line' }}
                    chartOption={chartData.option}
                    data={['a']}
                    width={250}
                    minHeight={250}
                    onPress={this.handleClick}
                />
            </View>
        );
    }
}

UserPortrait = connect(state=>{
    const {firstChartData} = state['home'];
    return {firstChartData};
},dispatch=>({
    init(){
        dispatch(action.loadFirstChart());
    },
    reHref(f){
        dispatch({type:'APP_SWITCH_PAGE',activePage:30});
        f('MasterPage',{activePage:'Dashboard'})
    }
}))(UserPortrait);
export default UserPortrait;

