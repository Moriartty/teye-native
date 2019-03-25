import {objectAppend} from "../utils";

const defaultState = {
    openSidebar:false,
    activePage:'',
    menu:[
        {id:1,name:'Develop',display:true,list:[
                {id:10,name:'Authentication',icon:'team',module:'_authentication',display:true},
                {id:11,name:'Database',icon:'database',module:'_database',display:true},
                {id:12,name:'Storage',icon:'folder',module:'_storage',display:true},
                {id:13,name:'Hosting',icon:'global',module:'_hosting',display:true},
                {id:14,name:'Function',icon:'ellipsis',module:'_function',display:true},
                {id:15,name:'ML Kit',icon:'medium',module:'_mlKit',display:true},
            ]},
        {id:2,name:'Quality',display:true,list:[
                {id:20,name:'Crashlytics',icon:'setting',module:'_crashlytics',display:true},
                {id:21,name:'Performance',icon:'dashboard',module:'_performance',display:true},
                {id:22,name:'Test Lab',icon:'tablet',module:'_testLab',display:true},
            ]},
        {id:3,name:'Analytics',display:true,list:[
                {id:30,name:'Dashboard',icon:'bar-chart',module:'_dashboard',display:true},
                {id:31,name:'Events',icon:'deployment-unit',module:'_events',display:true},
                {id:32,name:'Conversions',icon:'swap',module:'_conversions',display:true},
                {id:33,name:'Audiences',icon:'global',module:'_audiences',display:true},
                {id:34,name:'Funnels',icon:'project',module:'_funnels',display:true},
                {id:35,name:'User Properties',icon:'user',module:'_userProperties',display:true},
                {id:36,name:'Latest Release',icon:'rocket',module:'_latestRelease',display:true},
                {id:37,name:'Retention',icon:'heart',module:'_retention',display:true},
                {id:38,name:'StreamView',icon:'clock-circle',module:'_streamView',display:true},
                {id:39,name:'DebugView',icon:'project',module:'_debugView',display:true}
            ]},
        {id:4,name:'Other',display:false,list:[
                {id:40,name:'Dashboard2',icon:'bar-chart',module:'_dashboard2',display:false},
                {id:41,name:'Dashboard3',icon:'bar-chart',module:'_dashboard3',display:false},
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
