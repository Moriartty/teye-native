import React from 'react';
import { Text, View,Image,Button } from 'react-native';

class Home1 extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
                <Button title={'to dashboard'} onPress={()=>{
                    console.log('navigation',this.props.navigation);
                    return this.props.navigation.navigate('MasterPage')
                }}></Button>
            </View>
        );
    }
}
export default Home1;

