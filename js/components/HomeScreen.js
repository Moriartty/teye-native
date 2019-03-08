// In App.js in a new project
import React from "react";
import { View, Text,Button,Image,TouchableOpacity } from "react-native";
import {connect} from 'react-redux';
import {findTargetMenu} from "../utils/index";
const theme = require('../theme');
import {createAppContainer, createBottomTabNavigator} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home1 from '../pages/Home1';
import Home2 from '../pages/Home2';
import Home3 from '../pages/Home3';
import Home4 from '../pages/Home4';
import Home5 from '../pages/Home5';


const TabNavigator = createBottomTabNavigator({
    Home1: Home1,
    Home2: Home2,
    Home3: Home3,
    Home4: Home4,
    Home5: Home5,
},{
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent = Ionicons;
            let iconName;
            switch(routeName){
                case 'Home1':
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                    break;
                case 'Home2':
                    iconName = `ios-options${focused ? '' : '-outline'}`;
                    break;
                case 'Home3':
                    iconName = `ios-options${focused ? '' : '-outline'}`;
                    break;
                case 'Home4':
                    iconName = `ios-options${focused ? '' : '-outline'}`;
                    break;
                case 'Home5':
                    iconName = `ios-options${focused ? '' : '-outline'}`;
                    break;
            }
            return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
    }),
    tabBarOptions: {
        labelStyle: {
            fontSize: 13,
        },
    }
});

const HomeContainer = createAppContainer(TabNavigator);




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
            <HomeContainer/>
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

