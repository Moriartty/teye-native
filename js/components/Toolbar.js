
import {ToolbarAndroid,Platform,NavigatorIOS,Text,View,StyleSheet} from 'react-native';
import {Icon,Toast} from '@ant-design/react-native';
import React from 'react';
import {connect} from 'react-redux';

class Toolbar extends React.Component{
    constructor(props) {
        super(props);
    }

    toggleSidebar = () => {
        const {handleNavClick,openSidebar} = this.props;
        handleNavClick(!openSidebar);
    };

    render() {
        const {openSidebar:openState} = this.props;
        return (
            <View >
                <ToolbarAndroid
                    // navIcon={require('../../img/icon_threeline_fill.png')}
                    style={styles.toolbar}
                    title={'TEYE'}
                    titleColor={'#fff'}
                    actions={[{title: '菜单',  show:'never', showWithText: true,style:{color:'white'}}]}
                    onIconClicked={this.toggleSidebar}
                >
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                    </View>
                </ToolbarAndroid>
            </View>
            )
    }
}
const styles = StyleSheet.create({
    toolbar:{
        backgroundColor:'#1890ff',
        height:50,
        width:'100%'
    },
    switchStyle:{
        borderWidth:2,
        borderColor:'#0f0'
    }
});
Toolbar = connect(state=>{
    const {openSidebar} = state['app'];
    return {openSidebar};
},dispatch=>({

}))(Toolbar);

export default Toolbar;
