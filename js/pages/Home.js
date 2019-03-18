
import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import {connect} from 'react-redux';
import action from '../actions/home';
import WorldMap from './WorldMap';
import BubbleChart from './BubbleChart';
import theme from '../config/theme';
import {Carousel} from '@ant-design/react-native';

class Home extends React.Component{
    componentWillMount() {
        this.props.init();
    }
    render(){
        return (
            <View style={styles.homeContainer}>
                <Carousel
                    style={styles.wrapper}
                    selectedIndex={0}
                    // infinite
                    // afterChange={this.onHorizontalSelectedIndexChange}
                >
                    <WorldMap/>
                    <BubbleChart/>
                </Carousel>
            </View>
        )
    }
}

Home = connect(state=>{
    const {mapType} = state['home'];
    return {mapType};
},dispatch=>({
    init(){
        dispatch(action.loadMap());
        dispatch(action.loadBubble());
    }
}))(Home);

const styles = StyleSheet.create({
    homeContainer:{
        backgroundColor:theme["primary-color"],
        width:'100%',
        height:'100%',
        flex:1,
        justifyContent:'center'
    },
    wrapper: {
        // backgroundColor: '#fff',
    },
    containerHorizontal: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
    },
})

export default Home;
