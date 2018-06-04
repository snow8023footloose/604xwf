
export function cashier60(orderMsg,printerName,number) {
  console.log('OK');
  var LODOP;
  if (!LODOP) {
      LODOP = getLodop();
  }
  var orderDishes = orderMsg.orderDishes
  //60mm
  // header
  LODOP.PRINT_INITA(0, 0, "60mm", "60mm", orderMsg.restaurantName);
  LODOP.SET_PRINT_PAGESIZE(3, "80mm", "10mm");
  LODOP.ADD_PRINT_TEXT(0, 0, 100, 20, orderMsg.restaurantName);
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
  LODOP.ADD_PRINT_TEXT(30, 0, 130, 20, orderMsg.tableInfo)
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
  LODOP.ADD_PRINT_LINE(70, 0, 70, 259, 2, 1);
  LODOP.ADD_PRINT_TEXT(75, 0, 80, 20, "订单号");
  LODOP.ADD_PRINT_TEXT(75, 100, 160, 20, orderMsg.id);
  LODOP.ADD_PRINT_TEXT(90, 0, 80, 20, "时间");
  LODOP.ADD_PRINT_TEXT(90, 70, 160, 20, orderMsg.createTime);
  LODOP.ADD_PRINT_LINE(105, 0, 105, 259, 0, 0.5);

  var hasHeight = 110;

  //body  此处循环  计算高度
  for(let i=0; i<orderDishes.length;i++){
    if(orderDishes[i].skuTagContent){
      LODOP.ADD_PRINT_TEXT(hasHeight, 0, 170, 20, orderDishes[i].dishesName);

      LODOP.ADD_PRINT_TEXT(hasHeight, 100, 35, 20, "×" + orderDishes[i].num);
      LODOP.ADD_PRINT_TEXT(hasHeight, 135, 70, 20,   orderDishes[i].totalPrice);
      hasHeight += 20;
      LODOP.ADD_PRINT_TEXT(hasHeight, 0, 170, 20, "("+orderDishes[i].skuTagContent+")");
      hasHeight += 20;
    }else{
      LODOP.ADD_PRINT_TEXT(hasHeight, 0, 170, 20, orderDishes[i].dishesName);
      LODOP.ADD_PRINT_TEXT(hasHeight, 100, 35, 20, "×" + orderDishes[i].num);
      LODOP.ADD_PRINT_TEXT(hasHeight, 135, 70, 20,   orderDishes[i].totalPrice);
      hasHeight += 20;
    }
  }

  // footer  得到最后高度
  LODOP.ADD_PRINT_LINE(hasHeight, 0, hasHeight, 259, 2, 0.5);

  LODOP.ADD_PRINT_TEXT(hasHeight, 0, 80, 20, "应付金额");
  LODOP.ADD_PRINT_TEXT(hasHeight, 125, 70, 20, '-' +  orderMsg.needPay);
  hasHeight += 20;

  if(orderMsg.discountMoney > 0){
    LODOP.ADD_PRINT_TEXT(hasHeight, 0, 80, 20, "折扣券");
    LODOP.ADD_PRINT_TEXT(hasHeight, 125, 70, 20,   orderMsg.discountMoney);
    hasHeight += 20;
  }
  if(orderMsg.voucherMoney > 0){
    LODOP.ADD_PRINT_TEXT(hasHeight, 0, 80, 20, "优惠券");
    LODOP.ADD_PRINT_TEXT(hasHeight, 125, 70, 20, '-' +  orderMsg.voucherMoney);
    hasHeight += 20;
  }
  if(orderMsg.headCouponMoney > 0){
    LODOP.ADD_PRINT_TEXT(hasHeight, 0, 80, 20, "人头券");
    LODOP.ADD_PRINT_TEXT(hasHeight, 125, 70, 20, '-' +  orderMsg.headCouponMoney);
    hasHeight += 20;
  }


  LODOP.ADD_PRINT_LINE(hasHeight, 0, hasHeight, 259, 2, 0.5);
  LODOP.ADD_PRINT_TEXT(hasHeight, 0, 120, 20, "总计（实付）");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
  LODOP.ADD_PRINT_TEXT(hasHeight, 125, 70, 20,   orderMsg.realPay.toFixed(2));
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
  if(orderMsg.remark){
    hasHeight += 20;
    LODOP.ADD_PRINT_TEXT(hasHeight, 0, 120, 20, "备注:");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
    LODOP.ADD_PRINT_TEXT(hasHeight, 30, 300, 35,   orderMsg.remark);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
  }


  LODOP.SET_PRINT_COPIES(number)

  var printNum = LODOP.GET_PRINTER_COUNT();
  for (var i = 0; i < printNum; i++) {
      if (LODOP.GET_PRINTER_NAME(i) == printerName) {
          LODOP.SET_PRINTER_INDEX(i);
          break;
      }
  }
  LODOP.PRINT();
}

export function cashier80(orderMsg,printerName,number) {
  console.log('OK');
  var LODOP;
  if (!LODOP) {
    LODOP = getLodop();
  }
  var orderDishes = orderMsg.orderDishes

  //80mm
  //header
  LODOP.PRINT_INITA(0, 0, "80mm", "60mm", orderMsg.restaurantName);
  LODOP.SET_PRINT_PAGESIZE(3, "80mm", "10mm");
  LODOP.ADD_PRINT_TEXT(0, 0, 100, 20, orderMsg.restaurantName);
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
  LODOP.ADD_PRINT_TEXT(0, 140, 130, 20, orderMsg.tableInfo)
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
  LODOP.ADD_PRINT_LINE(30, 0, 30, 259, 2, 1);
  LODOP.ADD_PRINT_TEXT(35, 0, 80, 20, "订单号");
  LODOP.ADD_PRINT_TEXT(35, 140, 160, 20, orderMsg.id);
  LODOP.ADD_PRINT_TEXT(50, 0, 80, 20, "时间");
  LODOP.ADD_PRINT_TEXT(50, 140, 160, 20, orderMsg.createTime);
  LODOP.ADD_PRINT_LINE(65, 0, 65, 259, 0, 0.5);


  var hasHeight = 70;

  //body 此处循环  计算高度
  for(let i=0; i<orderDishes.length;i++){
    if(orderDishes[i].skuTagContent){
      LODOP.ADD_PRINT_TEXT(hasHeight, 0, 210, 20, orderDishes[i].dishesName + "("+orderDishes[i].skuTagContent+")");
      LODOP.ADD_PRINT_TEXT(hasHeight, 200, 35, 20, "×" + orderDishes[i].num);
      LODOP.ADD_PRINT_TEXT(hasHeight, 230, 70, 20,   orderDishes[i].totalPrice);
      hasHeight += 20;
    }else{
      LODOP.ADD_PRINT_TEXT(hasHeight, 0, 210, 20, orderDishes[i].dishesName);
      LODOP.ADD_PRINT_TEXT(hasHeight, 200, 35, 20, "×" + orderDishes[i].num);
      LODOP.ADD_PRINT_TEXT(hasHeight, 230, 70, 20,   orderDishes[i].totalPrice);
      hasHeight += 20;
    }

  }

  //footer 得到最后高度
  LODOP.ADD_PRINT_LINE(hasHeight, 0, hasHeight, 259, 2, 0.5);

  LODOP.ADD_PRINT_TEXT(hasHeight, 0, 80, 20, "应付金额");
  LODOP.ADD_PRINT_TEXT(hasHeight, 200, 70, 20,   orderMsg.needPay);
  hasHeight += 20;

  if(orderMsg.discountMoney > 0){
    LODOP.ADD_PRINT_TEXT(hasHeight, 0, 80, 20, "折扣券");
    LODOP.ADD_PRINT_TEXT(hasHeight, 200, 70, 20,  '-' + orderMsg.discountMoney);
    hasHeight += 20;
  }
  if(orderMsg.voucherMoney > 0){
    LODOP.ADD_PRINT_TEXT(hasHeight, 0, 80, 20, "优惠券");
    LODOP.ADD_PRINT_TEXT(hasHeight, 200, 70, 20, '-' +  orderMsg.voucherMoney);
    hasHeight += 20;
  }
  if(orderMsg.headCouponMoney > 0){
    LODOP.ADD_PRINT_TEXT(hasHeight, 0, 80, 20, "人头券");
    LODOP.ADD_PRINT_TEXT(hasHeight, 200, 70, 20, '-' +  orderMsg.headCouponMoney);
    hasHeight += 20;
  }

  LODOP.ADD_PRINT_LINE(hasHeight, 0, hasHeight, 259, 2, 0.5);
  LODOP.ADD_PRINT_TEXT(hasHeight, 0, 120, 20, "总计（实付）");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
  LODOP.ADD_PRINT_TEXT(hasHeight, 200, 70, 20,   orderMsg.realPay.toFixed(2));
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
  if(orderMsg.remark){
    hasHeight += 20;
    LODOP.ADD_PRINT_TEXT(hasHeight, 0, 120, 20, "备注:");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
    LODOP.ADD_PRINT_TEXT(hasHeight, 30, 300, 35,   orderMsg.remark);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
  }

  LODOP.SET_PRINT_COPIES(number)

  var printNum = LODOP.GET_PRINTER_COUNT();
  for (var i = 0; i < printNum; i++) {
    if (LODOP.GET_PRINTER_NAME(i) == printerName) {
      LODOP.SET_PRINTER_INDEX(i);
      break;
    }
  }

  LODOP.PRINT();
}

export function kitchen60(orderMsg,printerName,number) {
  console.log('OK');
  var LODOP;
  if (!LODOP) {
    LODOP = getLodop();
  }
  var orderDishes = orderMsg.orderDishes

  // head
  LODOP.PRINT_INITA(0, 0, "60mm", "60mm", "壹点餐饮");
  LODOP.SET_PRINT_PAGESIZE(3, "80mm", "10mm");
  LODOP.ADD_PRINT_TEXT(0, 0, 130, 20, orderMsg.tableInfo)
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
  LODOP.ADD_PRINT_LINE(30, 0, 30, 259, 0, 1);

  var hasHeight = 35;
  //body
  for(let i=0; i<orderDishes.length;i++){

    if(orderDishes[i].skuTagContent){
      LODOP.ADD_PRINT_LINE(hasHeight, 0, hasHeight, 259, 2, 0.5);
      LODOP.ADD_PRINT_TEXT(hasHeight, 0, 150, 20, orderDishes[i].dishesName);
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
      LODOP.ADD_PRINT_TEXT(hasHeight, 120, 100, 20, "×" + orderDishes[i].num);
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 16)
      hasHeight += 30;
      LODOP.ADD_PRINT_TEXT(hasHeight, 0, 230, 20, "("+orderDishes[i].skuTagContent+")");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
      hasHeight += 30;
    }else{
      LODOP.ADD_PRINT_LINE(hasHeight, 0, hasHeight, 259, 2, 0.5);
      LODOP.ADD_PRINT_TEXT(hasHeight, 0, 150, 20, orderDishes[i].dishesName);
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
      LODOP.ADD_PRINT_TEXT(hasHeight, 120, 100, 20, "×" + orderDishes[i].num);
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 16)
      hasHeight += 30;
    }
  }

  let s = orderMsg.createTime
  let time = s.substring(s.indexOf('-') + 1, s.length);
  LODOP.ADD_PRINT_LINE(hasHeight, 0, hasHeight, 259, 2, 0.5);
  LODOP.ADD_PRINT_TEXT(hasHeight, 0, 300, 20, time);
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 16)
  if(orderMsg.remark){
    hasHeight += 20;
    LODOP.ADD_PRINT_TEXT(hasHeight, 0, 120, 20, "备注:");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
    LODOP.ADD_PRINT_TEXT(hasHeight, 30, 300, 35,   orderMsg.remark);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
  }

  LODOP.SET_PRINT_COPIES(number)

  var printNum = LODOP.GET_PRINTER_COUNT();
  for (var i = 0; i < printNum; i++) {
    if (LODOP.GET_PRINTER_NAME(i) == printerName) {
      LODOP.SET_PRINTER_INDEX(i);
      break;
    }
  }
  LODOP.PRINT();
}

export function kitchen80(orderMsg,printerName,number) {
  console.log('OK');
  var LODOP;
  if (!LODOP) {
    LODOP = getLodop();
  }
  var orderDishes = orderMsg.orderDishes

  // head
  LODOP.PRINT_INITA(0, 0, "60mm", "60mm", "壹点餐饮");
  LODOP.SET_PRINT_PAGESIZE(3, "80mm", "10mm");
  LODOP.ADD_PRINT_TEXT(0, 0, 130, 20, orderMsg.tableInfo)
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
  LODOP.ADD_PRINT_LINE(30, 0, 30, 259, 0, 1);

  var hasHeight = 35;
  //body
  console.log(orderDishes);
  for(let i=0; i<orderDishes.length;i++){
    if(orderDishes[i].skuTagContent){
      LODOP.ADD_PRINT_LINE(hasHeight, 0, hasHeight, 259, 2, 0.5);
      LODOP.ADD_PRINT_TEXT(hasHeight, 0, 150, 20, orderDishes[i].dishesName);
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
      LODOP.ADD_PRINT_TEXT(hasHeight, 200, 100, 20, "×" + orderDishes[i].num);
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 16)
      hasHeight += 30;
      LODOP.ADD_PRINT_TEXT(hasHeight, 0, 230, 20, "("+orderDishes[i].skuTagContent+")");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
      hasHeight += 30;
    }else{
      LODOP.ADD_PRINT_LINE(hasHeight, 0, hasHeight, 259, 2, 0.5);
      LODOP.ADD_PRINT_TEXT(hasHeight, 0, 150, 20, orderDishes[i].dishesName);
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
      LODOP.ADD_PRINT_TEXT(hasHeight, 200, 100, 20, "×" + orderDishes[i].num);
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 16)
      hasHeight += 30;
    }
  }

  let s = orderMsg.createTime
  let time = s.substring(s.indexOf('-') + 1, s.length);
  LODOP.ADD_PRINT_LINE(hasHeight, 0, hasHeight, 259, 2, 0.5);
  LODOP.ADD_PRINT_TEXT(hasHeight, 0, 300, 20, time);
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 16)
  LODOP.SET_PRINT_COPIES(number)
  if(orderMsg.remark){
    hasHeight += 20;
    LODOP.ADD_PRINT_TEXT(hasHeight, 0, 120, 20, "备注:");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
    LODOP.ADD_PRINT_TEXT(hasHeight, 30, 300, 35,   orderMsg.remark);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
  }

  var printNum = LODOP.GET_PRINTER_COUNT();
  for (var i = 0; i < printNum; i++) {
    if (LODOP.GET_PRINTER_NAME(i) == printerName) {
      LODOP.SET_PRINTER_INDEX(i);
      break;
    }
  }
  LODOP.PRINT();
}




