import React from 'react';
import { Text, View,Image } from 'react-native';
import ExCharts from '../components/ExCharts';

class Home2 extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home2!</Text>
                {/*<ExCharts*/}
                    {/*container={'test'}*/}
                    {/*option={{ type: 'normal-bar' }}*/}
                    {/*chartOption={chartData.option}*/}
                    {/*data={chartData.data}*/}
                    {/*width={width}*/}
                    {/*minHeight={height}*/}
                    {/*onClick={this.handleClick}*/}
                {/*/>*/}
            </View>
        );
    }
}
export default Home2;
