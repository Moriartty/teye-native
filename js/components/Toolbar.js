
import {ToolbarAndroid,Switch,Text,View,StyleSheet} from 'react-native';
import {Icon,Toast} from '@ant-design/react-native';
import React from 'react';
import {connect} from 'react-redux';

class Toolbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value1: false,
            actionText:'我是标题'
        };
    }
    changValue=()=>{
        this.setState({value1:!this.state.value1})
    };
    onActionSelected=(position)=> {
        if(position===1){
            alert('我是左边第一个图标')
        }else if(position===2){
            alert('我是功能1')
        }else if(position===0){
            alert('我是菜单')
        }
    };
    toggleSidebar = () => {
        const {handleNavClick,openSidebar} = this.props;
        handleNavClick(!openSidebar);
    };

    render() {
        const {openSidebar:openState} = this.props;
        return (
            <View >
                <ToolbarAndroid
                    navIcon={require('../../img/icon_threeline_fill.png')}
                    style={styles.toolbar}
                    title={'TEYE'}
                    titleColor={'#fff'}
                    // actions={[{title: '菜单', icon: require('../../img/logo.png'), show:'never', showWithText: true},
                    //     {title: '菜单', icon: require('../../img/logo.png'), show:'ifRoom', showWithText: true},
                    //     {title: '功能1', show:'always', showWithText: true}]}
                    actions={[{title: '菜单',  show:'never', showWithText: true,style:{color:'white'}}]}
                    onIconClicked={this.toggleSidebar}
                >
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                        {/*<Text style={{color:'white'}}>TEYE</Text>*/}
                        {/*<Switch*/}
                            {/*disabled={false}*/}
                            {/*onValueChange={()=>this.changValue()}*/}
                            {/*value={this.state.value1}*/}
                            {/*onTintColor="#000"*/}
                            {/*thumbTintColor="#0f0"*/}
                            {/*tintColor="#e2e2e2"*/}
                            {/*style={styles.switchStyle}*/}
                        {/*/>*/}
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
