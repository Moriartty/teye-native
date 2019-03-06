// In App.js in a new project
import React from "react";
import { View, Text,Button,Image } from "react-native";
import {connect} from 'react-redux';
import {findTargetMenu} from "../utils";
const theme = require('../theme');

class HomeScreen extends React.Component {
    static navigationOptions = {
        title:'Home',
        drawerIcon:<Image source={require('../../img/icon_threeline_fill.png')} style={{marginLeft:10}} onPress={}/>,
        headerStyle:{
            backgroundColor:theme['header-background']
        },
        headerTintColor:theme["header-tint-color"]
    }
    render() {
        const {navigation,activePage,menu} = this.props
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Button onPress={()=>navigation.navigate('MasterPage',{activePage:findTargetMenu(menu,activePage).name})} title={'navigation'}></Button>
                <Button title={'other home'} onPress={()=>navigation.push('Home')}></Button>
                <Text>Home Screen</Text>
            </View>
        );
    }
}
HomeScreen = connect(state=>{
    const {activePage,menu} = state['app'];
    return {activePage,menu};
},null)(HomeScreen);

export default HomeScreen;

