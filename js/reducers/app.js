import {objectAppend} from "../utils";

const defaultState = {
    openSidebar:false,
    activePage:'',
    menu:[
        {id:1,name:'Develop',list:[
                {id:10,name:'Authentication',icon:'team',module:'_authentication'},
                {id:11,name:'Database',icon:'database',module:'_database'},
                {id:12,name:'Storage',icon:'folder',module:'_storage'},
                {id:13,name:'Hosting',icon:'global',module:'_hosting'},
                {id:14,name:'Function',icon:'ellipsis',module:'_function'},
                {id:15,name:'ML Kit',icon:'medium',module:'_mlKit'},
            ]},
        {id:2,name:'Quality',list:[
                {id:20,name:'Crashlytics',icon:'setting',module:'_crashlytics'},
                {id:21,name:'Performance',icon:'dashboard',module:'_performance'},
                {id:22,name:'Test Lab',icon:'tablet',module:'_testLab'},
            ]},
        {id:3,name:'Analytics',list:[
                {id:30,name:'Dashboard',icon:'bar-chart',module:'_dashboard'},
                {id:31,name:'Events',icon:'deployment-unit',module:'_events'},
                {id:32,name:'Conversions',icon:'swap',module:'_conversions'},
                {id:33,name:'Audiences',icon:'global',module:'_audiences'},
                {id:34,name:'Funnels',icon:'project',module:'_funnels'},
                {id:35,name:'User Properties',icon:'user',module:'_userProperties'},
                {id:36,name:'Latest Release',icon:'rocket',module:'_latestRelease'},
                {id:37,name:'Retention',icon:'heart',module:'_retention'},
                {id:38,name:'StreamView',icon:'clock-circle',module:'_streamView'},
                {id:39,name:'DebugView',icon:'project',module:'_debugView'}
            ]}
    ]
};

export default (state,action) => {
    let newState = {};
    switch (action.type){
        case 'APP_TOGGLE_SIDEBAR':
            newState.openSidebar = action.openSidebar;
            break;
        case 'APP_SWITCH_PAGE':
            newState.activePage = action.activePage;
            break;
        default: return state||defaultState;
    }
    return objectAppend(newState,state);
}
