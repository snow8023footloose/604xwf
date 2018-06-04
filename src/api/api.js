/* eslint-disable */
import axios from 'axios'
import qs from 'qs'

// axios.defaults.baseURL = 'http://192.168.2.189';
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
var BURL = 'http://192.168.2.189/api'
// var BURL = 'https://www.xwfwlkj.com/api'
export function _addRestaurant(obj) {
  return axios.post("/restaurant/add",  obj, {
    header:{
      'contentType':'application/json'
    }
  });
}

export function getAliyunSTSAccessToken() {
  return axios.post("/common/getAliOssSTSAccessSToken?name=zhangsan");
}

export  function urlColletion() {
  return {
    //餐厅请求接口

    // 添加账号
    restaurantWithdrawAccount: BURL + '/restaurantWithdrawAccount/add',
    restaurantWithdrawAccountComplexPageQuery: BURL + '/restaurantWithdrawAccount/complexPageQuery',

    //发送验证码
    restaurantBindAccount: BURL + '/restaurant/getSmsCode',

    //提现
    restaurantAccountWithdraw: BURL + '/restaurantAccount/withdraw',

    //统计
    getCountDishes: BURL + '/orderDishes/getCountDishes',

    //餐厅服务
    restaurantServiceAdd: BURL + '/restaurantServiceLog/add',
    restaurantServiceComplexPageQuery: BURL + '/restaurantServiceLog/complexPageQuery',
    restaurantServiceDelete: BURL + '/restaurantServiceLog/delete',
    restaurantServiceUpdate: BURL + '/restaurantServiceLog/update',

    //餐厅服务类型
    restaurantServiceTypeAdd: BURL + '/restaurantServiceType/add',
    restaurantServiceTypeComplexPageQuery: BURL + '/restaurantServiceType/complexPageQuery',
    restaurantServiceTypeDelete: BURL + '/restaurantServiceType/delete',
    restaurantServiceTypeUpdate: BURL + '/restaurantServiceType/update',

    //卡券类型
    couponType: BURL + '/couponType/complexPageQuery',

    //折扣卡券
    discountCouponAdd: BURL + '/discountCoupon/add',
    discountCouponComplexPageQuery: BURL + '/discountCoupon/complexPageQuery',
    discountCouponDelete: BURL + '/discountCoupon/delete',
    discountCouponUpdate: BURL + '/discountCoupon/update',

    //卡券设置
    couponSettingComplexPageQuery: BURL + '/restaurantCouponSetting/complexPageQuery',
    couponSettingUpdate: BURL + '/restaurantCouponSetting/update',

    memberAdd: BURL + '/xwfUserMember/add',
    memberComplexPageQuery: BURL + '/xwfUserMember/complexPageQuery',
    memberDelete: BURL + '/xwfUserMember/delete',
    memberUpdate: BURL + '/xwfUserMember/update',

    // 会员卡券
    userCouponComplexPageQuery:BURL + '/userCoupon/complexPageQuery',

    //会员设置
    memberSettingComplexPageQuery: BURL + '/restaurantMemberSetting/complexPageQuery',
    memberSettingUpdate: BURL + '/restaurantMemberSetting/update',

    //登录
    login1: BURL + '/xwfUser/login',
    loginRestaurantManager: BURL + '/restaurantManager/login',
    loginEmploy: BURL + '/xwfEmployee/login',

    //餐厅数据上传
    restaurant1: BURL + '/restaurant/add',
    restaurant2: BURL + '/restaurant/complexPageQuery',
    restaurant3: BURL + '/restaurant/delete',
    restaurant4: BURL + '/restaurant/update',

    //阿里数据上传
    ali: BURL +'/common/getAliOssSTSAccessSToken',

    //菜品
    dishes1: BURL + '/dishes/add',
    dishes2: BURL + '/dishes/complexPageQueryWithExtraData',
    dishes3: BURL + '/dishes/delete',
    dishes4: BURL + '/dishes/update',

    // 排序
    exchangeZindex1: BURL + '/dishes/exchangeZindex',



    //分类
    dishesCategory1: BURL + '/dishesCategory/add',
    dishesCategory2: BURL + '/dishesCategory/complexPageQuery',
    dishesCategory3: BURL + '/dishesCategory/delete',
    dishesCategory4: BURL + '/dishesCategory/update',

    //标签
    restaurantTag1: BURL + '/restaurantTag/add',
    restaurantTag2: BURL + '/restaurantTag/complexPageQuery',
    restaurantTag3: BURL + '/restaurantTag/delete',
    restaurantTag4: BURL + '/restaurantTag/update',

    //标签
    restaurantPopularizeTag1: BURL + '/restaurantPopularizeTag/add',
    restaurantPopularizeTag2: BURL + '/restaurantPopularizeTag/complexPageQuery',
    restaurantPopularizeTag3: BURL + '/restaurantPopularizeTag/delete',
    restaurantPopularizeTag4: BURL + '/restaurantPopularizeTag/update',

    //SKU
    sku1: BURL + '/sku/complexPageQuery',

    userOrder: BURL + '/userOrder/complexPageQuery',

    //规格
    spec1: BURL + '/restaurantSpec/add',
    spec2: BURL + '/restaurantSpec/complexPageQuery',
    spec3: BURL + '/restaurantSpec/delete',
    spec4: BURL + '/restaurantSpec/update',

    //属性
    attr1: BURL + '/restaurantSpec/attr/add',
    attr2: BURL + '/restaurantSpec/attr/complexPageQuery',
    attr3: BURL + '/restaurantSpec/attr/delete',
    attr4: BURL + '/restaurantSpec/attr/update',

    //购物车
    cartAdd: BURL + '/cart/add',
    cartComplexPageQuery: BURL + '/cart/complexPageQuery',
    cartDelete: BURL + '/cart/delete',
    cartUpdate: BURL + '/cart/update',
    cartSubmit: BURL + '/cart/updateNum',



    //pre单位
    preUnit1: BURL +'/predefineDishesUnit/add',
    preUnit2: BURL +'/predefineDishesUnit/complexPageQuery',
    preUnit3: BURL +'/predefineDishesUnit/delete',
    preUnit4: BURL +'/predefineDishesUnit/update',

    //pre推广标签
    prePopularizeTag1: BURL +'/predefinePopularizeTag/add',
    prePopularizeTag2: BURL +'/predefinePopularizeTag/complexPageQuery',
    prePopularizeTag3: BURL +'/predefinePopularizeTag/delete',
    prePopularizeTag4: BURL +'/predefinePopularizeTag/update',

    //pre服务类型
    preServiceType1: BURL +'/predefineServiceType/add',
    preServiceType2: BURL +'/predefineServiceType/complexPageQuery',
    preServiceType3: BURL +'/predefineServiceType/delete',
    preServiceType4: BURL +'/predefineServiceType/update',

    //pre分类
    preSpec1: BURL +'/predefineSpec/add',
    preSpec2: BURL +'/predefineSpec/complexPageQuery',
    preSpec3: BURL +'/predefineSpec/delete',
    preSpec4: BURL +'/predefineSpec/update',

    //pre餐桌类型
    preTableType1: BURL +'/predefineTableType/add',
    preTableType2: BURL +'/predefineTableType/complexPageQuery',
    preTableType3: BURL +'/predefineTableType/delete',
    preTableType4: BURL +'/predefineTableType/update',

    //法人
    legalPerson1: BURL +'/legalPerson/add',
    legalPerson2: BURL +'/legalPerson/complexPageQuery',
    legalPerson3: BURL +'/legalPerson/delete',
    legalPerson4: BURL +'/legalPerson/update',

    //pre标签
    preTag1: BURL +'/predefineTag/add',
    preTag2: BURL +'/predefineTag/complexPageQuery',
    preTag3: BURL +'/predefineTag/delete',
    preTag4: BURL +'/predefineTag/update',

    //购物车
    table1: BURL + '/restaurantTable/add',
    table2: BURL + '/restaurantTable/complexPageQuery',
    table3: BURL + '/restaurantTable/delete',
    table4: BURL + '/restaurantTable/update',

    //订单
    orderAdd: BURL + '/userOrder/add',
    orderComplexPageQuery: BURL + '/userOrder/complexPageQuery',
    orderDelete: BURL + '/userOrder/delete',
    orderUpdate: BURL + '/userOrder/update',
    orderComputePrepayInfo: BURL + '/userOrder/computePrepayInfo',

    //订单确认
    confirmOrder: BURL +'/userOrder/computePrepayInfo',

    //订单支付
    payOrder: BURL +'/userOrder/submit',

    //订单菜品
    orderDishes1: BURL + '/orderDishes/add',
    orderDishes2: BURL + '/orderDishes/complexPageQuery',
    orderDishes3: BURL + '/orderDishes/delete',
    orderDishes4: BURL + '/orderDishes/update',

    //打印机
    printerAdd: BURL + '/printer/add',
    printerComplexPageQuery: BURL + '/printer/complexPageQuery',
    printerDelete: BURL + '/printer/delete',
    printerUpdate: BURL + '/printer/update',

    //模板
    printerTemplateAdd: BURL + '/printerTemplate/add',
    printerTemplateComplexPageQuery: BURL + '/printerTemplate/complexPageQuery',
    printerTemplateDelete: BURL + '/printerTemplate/delete',
    printerTemplateUpdate: BURL + '/printerTemplate/update',

    //餐厅设置
    restaurantSetting:BURL + '/restaurantSetting/complexPageQuery',
    restaurantUpdate:BURL + '/restaurantSetting/update',
  }
}

export function request(url,format,data) {
  let dataFormat = '';
  if(format === 'json' ){
    dataFormat = {
      headers:{
        'Content-Type':'application/json'
      }
    }
  } else {
    data = qs.stringify(data);
    dataFormat = {
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }
  }
  return axios.post(url,data,dataFormat);
}




export function getUID() {
  // 生成32位随机数、uuid

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });

}

function handleRes(obj,res,goodsArr){
  for(let i=0;i<res.length;i++) {
    goodsArr.unshift({
      name:obj.dishesCategory[i].name,
      foods:res[i].data.data
    })
  }
}


export function goodsArr(self) {
  let _this = self
  let goodsArr = []
  let promiseArr = [];
  for(let i = 0 ; i< _this.dishesCategory.length; i++) {
    promiseArr.push(request(urlColletion().dishes2, 'json', [
      {
        feild: 'cid',
        value: _this.dishesCategory[i].id,
        joinType: 'eq'
      }
    ]))
  }
  Promise.all(promiseArr).then((res)=>{
    // console.log(res);
    handleRes(_this,res,goodsArr);
    // _this.$nextTick(()=>{
    //   _this._initScroll()
    //   _this._calculateHeight()
    // })
    _this.goods = goodsArr
  })
}







