import React from 'react';
import { Text, View,Image,InteractionManager } from 'react-native';
import action from '../actions/home';
import {connect} from 'react-redux';
import ExChart from '../components/ExChart';
import {withNavigation} from 'react-navigation';

class Duration extends React.PureComponent {
    componentWillMount() {
        // this.props.init();
    }


    handleClick = (e) => {
        const appName = e.name;
        this.props.reHref(appName,e.data,this.props.navigation.navigate);
    }
    render() {
        const {fifthChartData:chartData} = this.props;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ExChart
                    opt={{ type: 'normal-bar' }}
                    chartOption={chartData.option}
                    data={chartData.data}
                    width={'100%'}
                    minHeight={350}
                    onPress={this.handleClick}
                />
            </View>
        );
    }
}
Duration = connect(state=>{
    const {fifthChartData} = state['home'];
    return {fifthChartData};
},dispatch=>({
    init(){
        dispatch(action.loadFifthChart());
    },
    reHref(appName,data,f){
        dispatch({type:'APP_SWITCH_PAGE',activePage:30});
        f('MasterPage',{activePage:'Dashboard'})
    }
}))(Duration);

export default withNavigation(Duration);
