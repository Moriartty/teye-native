
import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import {connect} from 'react-redux';
import action from '../actions/home';
import UserPortrait from './UserPortrait';
import PainPoint from './PainPoint';
import Activation from './Activation';
import Habit from './Habit';
import Duration from './Duration';
import theme from '../config/theme';
import {Carousel} from '@ant-design/react-native';

class Others extends React.Component{
    componentWillMount() {
        this.props.init();
    }
    render(){
        return (
            <View style={styles.othersContainer}>

                <Carousel
                    style={styles.wrapper}
                    selectedIndex={0}
                    // autoplay
                >
                    <View style={styles.subWrapper}><UserPortrait/></View>
                    <View style={styles.subWrapper}><PainPoint/></View>
                    <View style={styles.subWrapper}><Activation/></View>
                    <View style={styles.subWrapper}><Habit/></View>
                    <View style={styles.subWrapper}><Duration/></View>
                </Carousel>
            </View>
        )
    }
}

Others = connect(state=>{
    const {mapType} = state['home'];
    return {mapType};
},dispatch=>({
    init(){
        dispatch(action.loadFirstChart());
        dispatch(action.loadSecondChart());
        dispatch(action.loadThirdChart());
        dispatch(action.loadFourthChart());
        dispatch(action.loadFifthChart());
    }
}))(Others);

const styles = StyleSheet.create({
    othersContainer:{
        // backgroundColor:theme["primary-color"],
        width:'100%',
        height:'100%',
        flex:1,
        justifyContent:'center'
    },
    wrapper: {

    },
    subWrapper:{
        width:'100%',
        height:'100%',
        // flex:1,
        // justifyContent:'center'
    },
    containerHorizontal: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
    },
})

export default Others;
