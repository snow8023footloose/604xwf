

var serviceStatus
var tableStatus
var orderStatus

export function goeasy(msgType) {

  let goEasy = new GoEasy({
    appkey: 'BS-f7859ab35ae6453d8cca76020ece4d7c'
  });
  goEasy.subscribe({
    channel: 'WEB:PUSH:' + restaurantId,
    onMessage: function (message) {
      message = $.parseJSON(message.content);
      console.log(message);
      var curType = message.type
      var curMsg = message.Message;
      switch (curType) {
        case 1: // 服务消息
          updateServiceNews(curMsg);
          break;
        case 2: // 餐桌类型
          var tableId = message.Message.id;
          // var targetTable = $("#table_box").find("#" + tableId);
          // 根据餐桌下的订单改变餐桌状态
          updateTableStatus(tableId,message.Message);
          break;
        case 3: // 订单消息
          var orderId = curMsg.id;
          updateOrderMsg(orderId, curMsg);
          break;
      }
    }
  });
  if(msgType === 'service'){
    return {
      serviceStatus
    }
  }else if(msgType === 'table'){
    return {
      tableStatus
    }
  }else if(msgType === 'order'){
    return {
      orderStatus
    }
  }

}

function updateServiceNews(item){
  serviceStatus = item
}

function updateTableStatus (id,msg){
  tableStatus = {id,msg}
}

function updateOrderMsg (id,msg){
  orderStatus = {id,msg}
}
