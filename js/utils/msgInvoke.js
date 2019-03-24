let MsgInvoker = {};

/**
 * Hybrid中webview常用的通信方案：command+payload
 * const message = {
 *  command:'example',
 *  payload:{
 *      arg1:1,
 *      arg2:'',
 *  }
 * }
 */

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};


const transactions = {};

function addTransaction(command,fn){
    const id = generateUUID();
    transactions[`${command}(${id})`] = fn;
    return id;
}
function executeTransaction(command,id,data){
    if(transactions[`${command}(${id})`]){
        transactions[`${command}(${id})`](data);
        delete transactions[`${command}(${id})`];
    }
}

MsgInvoker.send = (command,data,cb) => {
    const payload = {
        command,data,
        idReply:false,
        id:addTransaction(cb)
    }
    //发送message
};

let callbacks = {};
//这个接口的作用实际记录下收到某种命令请求的时候的执行函数，因此我们也需要
//新建一个map来存下所有命令对应的处理函数
MsgInvoker.listen = (command,fn) => {
    callbacks[command] = fn;
};

function reply(command,id){
    return function(data){
        const payload = {
            command,id,data,
            isReply:true
        }
        //发送message,环境无关
    }
}

MsgInvoker.listener = (message) => {
    const payload = JSON.parse(message);
    const {command,id,isReply,data} = payload;
    if(isReply){
        //如果是自己请求的回复，则调取之前存下的回调函数
        executeTransaction(command,id,data);
    }else{
        //如果是请求，则得到结果后回复
        if(callbacks[command])
            callbacks[command](data,reply(command.id))
    }
}

export default MsgInvoker;
