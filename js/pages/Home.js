
import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import {connect} from 'react-redux';
import action from '../actions/home';
import WorldMap from './WorldMap';
import BubbleChart from './BubbleChart';
import theme from '../config/theme';
import {Carousel} from '@ant-design/react-native';
import LoadingScreen from '../components/LoadingScreen';

class Home extends React.Component{
    componentWillMount() {
        // this.props.init();
    }
    render(){
        const {mapChartData} = this.props;
        return (
            <View style={styles.homeContainer}>
                <Carousel
                    style={styles.wrapper}
                    selectedIndex={0}
                    // infinite
                    // afterChange={this.onHorizontalSelectedIndexChange}
                >
                    <View style={styles.subWrapper}>
                        <WorldMap/>
                    </View>
                    {/*<LoadingScreen*/}
                        {/*style={styles.subWrapper}*/}
                        {/*data={mapChartData.data}*/}
                        {/*loadingStyle={{size:'large',color:'white'}}*/}
                    {/*>*/}
                        {/*<WorldMap/>*/}
                    {/*</LoadingScreen>*/}
                    <View style={styles.subWrapper}>
                        <BubbleChart/>
                    </View>
                </Carousel>
            </View>
        )
    }
}

Home = connect(state=>{
    const {mapType,mapChartData} = state['home'];
    return {mapType,mapChartData};
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
        // width:'100%',
        // height:400
    },
    subWrapper:{
        width:'100%',
        height:'100%',
        // flex:1,
        justifyContent:'center'
    },
    containerHorizontal: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
    },
})

export default Home;
