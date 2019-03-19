import React from 'react';
import {ActivityIndicator} from '@ant-design/react-native';
import {View,Text} from 'react-native';

class LoadingScreen extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const {data} = nextProps;
        console.log('data',data,data&&data.length>0);
    }

    componentDidUpdate() {
        console.log('updated')
    }
    render(){
        const {style,data,loadingStyle} = this.props;
        // console.log('data',data,data&&data.length>0);
        // console.log('child',this.props.children)
        let comp = data&&data.length>0?
            this.props.children
            :
            this.props.children

        console.log('comp',comp)
        return (
            <View style={style}>
                {
                    // comp
                    this.props.children
                }
            </View>
        )
    }
}

export default LoadingScreen;
