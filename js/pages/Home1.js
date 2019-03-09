import React from 'react';
import { Text, View,Image,Button } from 'react-native';
import {connect} from 'react-redux';

class Home1 extends React.Component {
    handleClick = () => {
        this.props.switchPage(this.props.navigation.navigate);
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
                <Button title={'to dashboard'} onPress={this.handleClick}></Button>
            </View>
        );
    }
}

Home1 = connect(null,dispatch=>({
    switchPage(f){
        dispatch({type:'APP_SWITCH_PAGE',activePage:30});
        f('MasterPage',{activePage:'Dashboard'})
    }
}))(Home1);
export default Home1;

