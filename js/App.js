/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,WebView,ScrollView,Image} from 'react-native';
import {Button,Provider,Toast,Drawer, List,Accordion,Icon,Flex} from '@ant-design/react-native';
import Toolbar from "./components/Toolbar";
import {connect} from 'react-redux';
import MasterPage from './components/MasterPage';
import HomeScreen from './components/HomeScreen';
import {createAppContainer, createStackNavigator} from "react-navigation";

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        MasterPage:MasterPage
    },
    {
        initialRouteName:'Home',
        defaultNavigationOptions:{//配置导航栏默认样式

        }
    }
);
const AppContainer = createAppContainer(AppNavigator);

type Props = {};
class App extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            activeSections:[0,1,2]
        };
        this.onChange = activeSections => {
            // console.log('sections',activeSections)
            // this.setState({ activeSections });
            return false;
        };
    }

    render() {
        const {openSidebar:openState,toggleSidebar,switchPage,menu,activePage} = this.props;
        const sidebar = (
            <ScrollView style={styles.sidebar}>
                <View style={styles.sidebarHeader}>
                    <Flex justify={'between'}>
                        <Flex.Item>
                            <Image style={{width:50,height:50}}
                               source={{uri:'https://avatars0.githubusercontent.com/u/15435074?s=460&v=4'}}/>
                        </Flex.Item>
                        <Flex.Item>
                            <Flex>
                                <Flex.Item><Icon name={'mail'} style={{color:'white'}}/></Flex.Item>
                                <Flex.Item><Icon name={'user'} style={{color:'white'}}/></Flex.Item>
                                <Flex.Item><Icon name={'key'} style={{color:'white'}}/></Flex.Item>
                                <Flex.Item><Icon name={'logout'} style={{color:'white'}}/></Flex.Item>
                            </Flex>
                        </Flex.Item>
                    </Flex>
                    <Text style={{color:'white',fontSize:16,fontWeight:'bold',marginTop:10}}>Admin</Text>
                </View>
                <Accordion
                    onChange={this.onChange}
                    activeSections={this.state.activeSections}
                    style={styles.sidebarContent}>
                    {
                        menu.map((o,i)=>{
                            return (
                                <Accordion.Panel header={o.name} key={o.id}>
                                    <List>
                                        {
                                            o.list.map(item=>{
                                                return (
                                                    <List.Item key={item.id} style={styles.listItem} onPress={switchPage.bind(this,item.module)}>
                                                        <Flex direction={'row'}>
                                                            <Flex.Item flex={1}><Icon name={item.icon} style={{color:item.id===activePage?'#1890ff':'#595959'}}/></Flex.Item>
                                                            <Flex.Item flex={4}><Text style={{color:item.id===activePage?'#1890ff':'#595959'}}>{item.name}</Text></Flex.Item>
                                                        </Flex>
                                                    </List.Item>
                                                )
                                            })
                                        }
                                    </List>
                                </Accordion.Panel>
                            )
                        })
                    }
                </Accordion>
            </ScrollView>
        );
        return (
            <Provider>
                <View style={styles.containers}>
                    {/*<Drawer*/}
                        {/*sidebar={sidebar}*/}
                        {/*position="left"*/}
                        {/*open={openState}*/}
                        {/*drawerRef={el => (this.drawer = el)}*/}
                        {/*drawerWidth={300}*/}
                        {/*onOpenChange={toggleSidebar}*/}
                        {/*drawerBackgroundColor="#ccc"*/}
                    {/*>*/}
                        {/*<View style={{ flex: 1 }}>*/}
                            {/*<Toolbar handleNavClick={toggleSidebar}/>*/}
                            {/*<MasterPage/>*/}
                        {/*</View>*/}
                    {/*</Drawer>*/}
                    <AppContainer/>
                </View>
            </Provider>
        );
    }
}

App = connect(state=>{
    const {openSidebar,menu,activePage} = state['app'];
    return {openSidebar,menu,activePage};
},dispatch=>({
    toggleSidebar(openState){
        dispatch({type:'APP_TOGGLE_SIDEBAR',openSidebar:openState})
    },
    switchPage(module){
        dispatch({type:'APP_TOGGLE_SIDEBAR',openSidebar:false})
        dispatch({type:'APP_SWITCH_PAGE',activePage:module})
        // console.log('args',module)
    }
}))(App);

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        margin:0
    },
    sidebar:{
        flex:1,
    },
    sidebarHeader:{
        width:'100%',
        // width:200,
        height:130,
        padding:20,
        backgroundColor:'#1890ff'
    },
    sidebarContent:{
        backgroundColor:'white'
    },
    listItem:{
        flex:1,
        flexDirection:'row',
        color:'black'
    }
});

export default App;
