import React from 'react';
import {ActivityIndicator} from '@ant-design/react-native';
import {View,Text} from 'react-native';
import theme from '../config/theme';

class LoadingScreen extends React.PureComponent{
    constructor(props){
        super(props);

    }

    // componentWillReceiveProps(nextProps) {
    //     const {data} = nextProps;
    //     console.log('data',data,data&&data.length>0);
    // }

    render(){
        const {style,show,loadingStyle} = this.props;
        return (
            <View style={style}>
                <ActivityIndicator
                    size={loadingStyle?loadingStyle.size:'large'}
                    color={loadingStyle?loadingStyle.color:theme["primary-color"]}
                    animating={show}
                />
                {this.props.children}
            </View>
        )
    }
}

export default LoadingScreen;
