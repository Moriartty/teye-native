// In App.js in a new project
import React from "react";
import { View, Text,Button,Image,TouchableOpacity } from "react-native";
import {connect} from 'react-redux';
import {findTargetMenu} from "../utils/index";
const theme = require('../config/theme');
import {createAppContainer, createBottomTabNavigator} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import UserPortrait from '../pages/UserPortrait';
import PainPoint from '../pages/PainPoint';
import Activation from '../pages/Activation';
import Habit from '../pages/Habit';
import Duration from '../pages/Duration';


const TabNavigator = createBottomTabNavigator({
    Portrait: UserPortrait,
    PainPoint: PainPoint,
    Activation: Activation,
    Habit: Habit,
    Duration: Duration,
},{
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent = Ionicons;
            let iconName;
            switch(routeName){
                case 'Portrait':
                    iconName = `ios-home${focused ? '' : ''}`;
                    break;
                case 'PainPoint':
                    iconName = `ios-flag${focused ? '' : ''}`;
                    break;
                case 'Activation':
                    iconName = `ios-information-circle${focused ? '' : ''}`;
                    break;
                case 'Habit':
                    iconName = `ios-heart${focused ? '' : ''}`;
                    break;
                case 'Duration':
                    iconName = `ios-search${focused ? '' : ''}`;
                    break;
            }
            return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
    }),
    tabBarOptions: {
        labelStyle: {
            fontSize: 12,
        },
    }
});


class HomeScreen extends React.Component {
    static router = TabNavigator.router;
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

    componentWillReceiveProps(nextProps) {
        if(this.props.activePage==''&&nextProps.activePage&&this.props.activePage!==nextProps.activePage){
            const {navigation,menu,activePage} = nextProps;
            const targetName = findTargetMenu(menu,activePage).name;
            navigation.navigate('MasterPage',{activePage:targetName});
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
            <View style={{width:'100%',height:'100%'}}>
                <TabNavigator navigation={this.props.navigation} />
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
    }
}))(HomeScreen);

export default HomeScreen;

