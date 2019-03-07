// In App.js in a new project
import React from "react";
import { View, Text,Button,Image,TouchableOpacity } from "react-native";
import {connect} from 'react-redux';
import {findTargetMenu} from "../utils/index";
const theme = require('../theme');

class HomeScreen extends React.Component {
    static navigationOptions = ({navigation})=>{
        return {
            title:'Home',
            headerLeft:
                <TouchableOpacity onPress={navigation.getParam('handleNavClick',null)}>
                    <Image
                        style={{marginLeft:10,width:24,height:24}}
                        source={require('../../img/icon_threeline_fill.png')}
                    />
                </TouchableOpacity>,
            headerStyle:{
                backgroundColor:theme['header-background']
            },
            headerTintColor:theme["header-tint-color"]
        }
    }

    handleNavClick = () => {
        const {toggleSidebar,openSidebar} = this.props;
        toggleSidebar(!openSidebar);
    }

    componentWillMount() {
        this.props.navigation.setParams({handleNavClick:this.handleNavClick})
    }

    render() {
        const {navigation,activePage,menu} = this.props;
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Button onPress={()=>navigation.navigate('MasterPage',{activePage:findTargetMenu(menu,activePage).name})} title={'to dashboard'}></Button>
            </View>
        );
    }
}
HomeScreen = connect(state=>{
    const {activePage,menu,openSidebar} = state['app'];
    return {activePage,menu,openSidebar};
},dispatch=>({
    toggleSidebar(openState){
        dispatch({type:'APP_TOGGLE_SIDEBAR',openSidebar:openState})
    },
}))(HomeScreen);

export default HomeScreen;

