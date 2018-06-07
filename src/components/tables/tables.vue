<template>
  <div class="tables">
    <!--table模块-->
    <el-tabs v-model="activeName" @tab-click="handleShowTable">

      <!--餐桌方格-->
      <el-tab-pane :label="'餐桌信息:'+countTable+'个—共'+tableList.length+'个'" name="first" @click.native="toCountTable">
        <el-row :guter="0">
          <div class="table-container" id="table-container" ref="container">
            <!--餐桌按分类展示-->

            <transition name="el-zoom-in-left"  v-for="(item,index) in tableList" :key="item.num" v-if="selectedTable === item.tid && item.status === tableStatus">
              <div v-show="showTable" class="transition-box">
                <el-tooltip :content="item.description" placement="top">
                  <div class="box-header disable-table" v-if="item.status === 'disable'">
                    桌号：{{item.num}}
                    人数：{{item.seatNum}}
                  </div>
                  <div class="box-header" v-else-if="item.status === 'pre-clear'">
                    桌号：{{item.num}}
                    人数：{{item.seatNum}}
                  </div>
                  <div class="box-header" v-else-if="item.status === 'pre-order'">
                    桌号：{{item.num}}
                    人数：{{item.seatNum}}
                  </div>
                  <div class="box-header" v-else-if="item.status === 'enable'">
                    桌号：{{item.num}}
                    人数：{{item.seatNum}}
                  </div>
                  <div class="box-header" style="background: rgba(255,82,91,0.78)" v-else-if="item.status === 'not-payed'">
                    桌号：{{item.num}}
                    人数：{{item.seatNum}}
                  </div>
                </el-tooltip>
                <!--总：{{item.recommend.length}}项-->
                <div class="box-content"  @click="selectTable(item,index)">
                  <p class="pre-clear" v-if="item.status === 'pre-clear'">未清台</p>
                  <p class="pre-order" v-if="item.status === 'pre-order'">未下单</p>
                  <p class="name" >{{item.name}}</p>
                </div>
              </div>
            </transition>
            <transition name="el-zoom-in-left"  v-for="(item,index) in tableList" :key="item.num" v-if="selectedTable === item.tid && tableStatus === ''">
              <div v-show="showTable" class="transition-box">
                <el-tooltip :content="item.description" placement="top">
                  <div class="box-header disable-table" style="background: #909399" v-if="item.status === 'disable'">
                    桌号：{{item.num}}
                    人数：{{item.seatNum}}
                  </div>
                  <div class="box-header" v-else-if="item.status === 'pre-clear'">
                    桌号：{{item.num}}
                    人数：{{item.seatNum}}
                  </div>
                  <div class="box-header" v-else-if="item.status === 'pre-order'">
                    桌号：{{item.num}}
                    人数：{{item.seatNum}}
                  </div>
                  <div class="box-header" v-else-if="item.status === 'enable'">
                    桌号：{{item.num}}
                    人数：{{item.seatNum}}
                  </div>
                  <div class="box-header" style="background: rgba(255,82,91,0.78)" v-else-if="item.status === 'not-payed'">
                    桌号：{{item.num}}
                    人数：{{item.seatNum}}
                  </div>
                </el-tooltip>
                <!--总：{{item.recommend.length}}项-->
                <div class="box-content"  @click="selectTable(item,index)">
                  <p class="pre-clear" v-if="item.status === 'pre-clear'">未清台</p>
                  <p class="pre-order" v-if="item.status === 'pre-order'">未下单</p>
                  <p class="name" >{{item.name}}</p>
                </div>
              </div>
            </transition>

            <!--餐桌全部展示-->
            <transition name="el-zoom-in-left"  v-for="(item,index) in tableList" :key="item.num" v-if="selectedTable === 0 && item.status === tableStatus">
              <div v-show="showTable" class="transition-box">
                <el-tooltip :content="item.description" placement="top">
                  <div class="box-header disable-table" v-if="item.status === 'disable'">
                    桌号：{{item.num}}
                    人数：{{item.seatNum}}
                  </div>
                  <div class="box-header" v-else-if="item.status === 'pre-clear'">
                    桌号：{{item.num}}
                    人数：{{item.seatNum}}
                  </div>
                  <div class="box-header" v-else-if="item.status === 'pre-order'">
                    桌号：{{item.num}}
                    人数：{{item.seatNum}}
                  </div>
                  <div class="box-header" v-else-if="item.status === 'enable'">
                    桌号：{{item.num}}
                    人数：{{item.seatNum}}
                  </div>
                  <div class="box-header" style="background: rgba(255,82,91,0.78)" v-else-if="item.status === 'not-payed'">
                    桌号：{{item.num}}
                    人数：{{item.seatNum}}
                  </div>
                </el-tooltip>
                <!--总：{{item.recommend.length}}项-->
                <div class="box-content"  @click="selectTable(item,index)">
                  <p class="pre-clear" v-if="item.status === 'pre-clear'">未清台</p>
                  <p class="pre-order" v-if="item.status === 'pre-order'">未下单</p>
                  <p class="name" >{{item.name}}</p>
                </div>
              </div>
            </transition>
            <transition name="el-zoom-in-left"  v-for="(item,index) in tableList" :key="item.num" v-if="selectedTable === 0 && tableStatus === ''">
              <div v-show="showTable" class="transition-box">
                <el-tooltip :content="item.description" placement="top">
                  <div class="box-header disable-table" v-if="item.status === 'disable'">
                    桌号：{{item.num}}
                    人数：{{item.seatNum}}
                  </div>
                  <div class="box-header" v-else-if="item.status === 'pre-clear'">
                    桌号：{{item.num}}
                    人数：{{item.seatNum}}
                  </div>
                  <div class="box-header" v-else-if="item.status === 'pre-order'">
                    桌号：{{item.num}}
                    人数：{{item.seatNum}}
                  </div>
                  <div class="box-header" v-else-if="item.status === 'enable'">
                    桌号：{{item.num}}
                    人数：{{item.seatNum}}
                  </div>
                  <div class="box-header" style="background: rgba(255,82,91,0.78)" v-else-if="item.status === 'not-payed'">
                    桌号：{{item.num}}
                    人数：{{item.seatNum}}
                  </div>
                </el-tooltip>
                <!--总：{{item.recommend.length}}项-->
                <div class="box-content"  @click="selectTable(item,index)">
                  <p class="pre-clear" v-if="item.status === 'pre-clear'">未清台</p>
                  <p class="pre-order" v-if="item.status === 'pre-order'">未下单</p>
                  <p class="name" >{{item.name}}</p>
                </div>
              </div>
            </transition>

            <transition name="el-zoom-in-left" v-if="countTable === 0">
              <div v-show="showTable" class="transition-box">
                <div class="box-content">
                  <p style="font-size: 36px;color: rgba(0,0,0,0.2);text-align: center;font-weight: bolder">空</p>
                  <p class="pre-clear">用下方控件</p>
                  <p class="pre-clear">筛选餐桌</p>
                </div>
              </div>
            </transition>

          </div>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <!--table遮罩-->
    <div class="mask-black" v-if="tableShow === 1"></div>

    <!--选择餐桌类型-->
    <el-select class="selectTab" v-model="selectedTable" @change="toCountTable" placeholder="请选择餐桌类型" style="width: 230px;padding-top: 10px">
      <el-option
        v-for="(item,index) in tableTypeSelect"
        :key="index"
        :label="item.typeName"
        :value="item.typeIndex">
      </el-option>
    </el-select>
    <div class="table-status-type" style="display: inline-block;margin-left: 20px" @click="toCountTable">
      <el-button size="mini" type="success" plain round @click="tableStatus = ''">全部</el-button>
      <el-button size="mini" type="primary" plain round @click="tableStatus = 'pre-order'">未下单</el-button>
      <el-button size="mini" type="danger" plain round @click="tableStatus = 'not-payed'">未支付</el-button>
      <el-button size="mini" type="warning" plain round @click="tableStatus = 'pre-clear'">未清台</el-button>
      <el-button size="mini" type="info" plain round @click="tableStatus = 'disable'">未开启</el-button>
    </div>

    <!--table操作按钮-->
    <div class="tableButtonGroup" v-if="tableShow === 1" v-show="true">
      <el-button type="danger" @click="deleteTable" icon="el-icon-delete" circle></el-button>
      <el-button @click="stopTableService" type="warning" icon="el-icon-time" circle></el-button>
      <el-button @click="editTable" icon="el-icon-edit" circle></el-button>
      <el-button @click="_pullTable" v-loading.fullscreen.lock="fullscreenLoading" icon="el-icon-refresh" circle></el-button>
      <el-button @click="closeTable" class="closeTable" icon="el-icon-close" circle></el-button>
    </div>

    <!--table订单按钮：个人订单详请-->
    <div class="tableButtonGroup1" v-if="tableShow === 1" v-show="true">
      <span class="singleContainer">
        <el-radio-group v-model="selectSingleOrder">
          <span v-for="(item,index,key) in tableOrderList" :key="index">
            <el-popover
              placement="bottom"
              title="个人账单详情"
              width="300"
              trigger="hover"
              class="popover"
              :visible-arrow= "true"
            >
              <p v-if="item.status === 'not-payed'">未支付</p>
              <div style="text-align: right; margin: 0">
                <div class="shopcart-list">
                  <div class="list-header" @click.stop="toggleList">
                  </div>
                  <div class="single-list-content">
                    <ul style="padding: 0px">
                      <li
                        style="display: flex;align-items:center; justify-content: space-around"
                        class="food"
                        v-for="(food,key) in item.orderDishes"
                        :key="key">
                        <span style="display:block;text-align: left;font-weight: lighter; width: 50%;margin: 5px 0px" class="name">
                          {{food.dishes.name}}</span>
                        <span style="display: block;width: 20%"><i class="el-icon-close"></i>
                          {{food.num}}</span>
                        <div class="price" style="width: 20%">
                          <span class="dollar">￥</span>{{food.totalPrice}}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <span class="price"
                      style="font-size: 20px;font-weight: bolder">
                  总计 <span class="dollar">￥</span>{{item.needPay.toFixed(2)}}</span>
                <span style="margin-left: 50px"><el-button type="text" @click="printerOrder(item,$event)">打印</el-button></span>
                <span><el-button type="success" size="small" @click="singleAccounts">结账</el-button></span>
              </div>
              <el-button
                v-if="item.status === 'not-payed'"
                style="border-radius: 10px"
                slot="reference"
                type="primary" plain
                icon="el-icon-document"
                @click="selectOrder(item,$event)"
                :label="index">订单{{index+1}}</el-button>
              <!--<el-button class="singleButton" slot="reference" @click="selectCustomer(item,$event)" type="primary" size="small" icon="el-icon-document" round>订单{{item}}</el-button>-->
            </el-popover>
            <el-badge v-if="item.status === 'not-payed' && item.orderDishes != null" :value="item.orderDishes.length" class="item">
            </el-badge>
            <!--<el-badge v-if="item.status === 'not-payed'" :value="item.orderDishes.length" class="item">-->
            <!--</el-badge>-->
          </span>
        </el-radio-group>
      </span>
      <el-button
        id="splusOrder"
        @click="prepayInfo"
        type="success"
        icon="el-icon-plus"
      >立即下单</el-button>
    </div>

    <!--table弹框：整个餐桌详细信息，餐桌点餐，餐桌订单详情-->
    <transition>
        <div class="goodse" id="goods" ref="goods-top" v-if="tableShow === 1">
        <el-popover
          placement="top"
          title="餐桌详情"
          width="200"
          trigger="hover"
        >
          <div v-model="tableForm" ></div>
          <div slot="reference" class="tableNumber">{{tableTitle}}</div>
        </el-popover>
        <!--分类-->
        <transition enter-active-class="bounceInUp" leave-active-class="bounceOutDown">
          <div class="menu-wrapper animated" ref="menu-wrapper" v-show="showMenu">
            <ul class="menu-ul">
              <li
                v-for="(item,index) in goods"
                :key="item.zindex"
                class="menu-item"
                :class="{'current':currentIndex===index}"
                @click="selectMenu(index,$event)">
                <span class="text border-1px">
                  <!-- <span v-showMenu="item.type>0" class="icon" :class="classMap[item.type]"></span> -->
                  {{item.name }}
                </span>
              </li>
            </ul>
          </div>
        </transition>
        <div @click="showMenu=!showMenu" class="menu-button">
        </div>
        <!--菜品展示-->
        <div class="foods-wrapper" id="foods-wrapper" ref="foods-wrapper">
          <ul class="foods-ul">
            <li v-for="item in goods" :key="item.zindex" class="food-list food-list-hook">
              <h1 class="goods-title">{{item.name}}</h1>
              <ul class="goodsUl">
                <li ref="food-li" v-for="food in item.foods" :key="item.zindex" class="food-item border-1px">
                  <div class="icon">
                      <img width="100px" height="100px" class="previewImg" :src="'https://order-online.oss-cn-shenzhen.aliyuncs.com' + food.thumb" alt="点击查看原图">
                  </div>
                  <div class="goods-content">
                    <h3 class="goods-name">{{food.name}}</h3>
                    <p class="desc">{{food.description}}</p>
                    <div class="extra">
                      <span class="count">月售{{food.stock}}份</span><span>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                      <span class="now"><span class="dollar">￥</span>{{food.normalPrice}}</span>
                      <span class="old" v-show="food.oldPrice"><span class="dollar">￥</span>{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper" id="cartcontrol-wrapper">
                      <cartcontrol
                        :food="food"
                        @incrementmi="incrementTotalDecre"
                        @increment="incrementTotalAdd"
                        @updateShopcart="updateShopcart"
                      >
                      </cartcontrol>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <shopcart
          ref="shop-cart"
          @updateShopcart="updateShopcart"
          :select-foods="tableCartList"
          :goods1="goods"
          :needPay="needPay"></shopcart>
      </div>
      </transition>

    <!--订单确认-->
    <el-dialog
      lock-scroll
      fullscreen
      close-on-press-escape
      append-to-body
      title="订单确认" :visible.sync="dialogConfirmOrder">
      <div class="shopcart-list animated" v-show="dialogConfirmOrder">
        <div class="list-content" ref="list-content" style="width: 70%;margin: 0px auto">
          <ul>
            <li class="orderList info-item" v-for="(item,index) in cartList" :key="index">
              <span> {{item.dishes.name}} </span>
              <span><i class="el-icon-close"></i>{{item.num}} </span>
              <span>
                <span style="display: inline;" class="dollar">￥</span>
                {{item.totalPrice}}
              </span>
            </li>
          </ul>
        </div>
        <!--<div class="list-header" @click.stop="toggleList" style="display: flex;justify-content: flex-end;padding: 0px 6px;margin-bottom: 20px">-->
          <!--<span class="empty" @click="empty">清空</span>-->
        <!--</div>-->
        <div style="
        width: 50%;
        color: #67c23a;
        background: #f0f9eb;
        border-color: #c2e7b0;
        border-radius: 10px;
        margin: 5px auto;
        padding: 10px">
          <div class="price" style="font-size: 20px;text-align: center;display: flex;justify-content: space-around" v-if="discountMoney > 0">
            打折券 <span style="width: 100px;display: inline-block">
            <span class="dollar" >￥</span>-{{discountMoney.toFixed(2)}}</span></div>
          <div class="price" style="font-size: 20px;text-align: center;display: flex;justify-content: space-around" v-if="voucherMoney > 0">
            优惠券 <span style="width: 100px;display: inline-block">
            <span class="dollar" >￥</span>-{{voucherMoney.toFixed(2)}}</span></div>
          <div class="price" style="font-size: 20px;text-align: center;display: flex;justify-content: space-around" v-if="headCouponMoney > 0">
            人头券 <span style="width: 100px;display: inline-block">
            <span class="dollar" >￥</span>-{{headCouponMoney.toFixed(2)}}</span></div>
          <div class="price" style="font-size: 20px;text-align: center;display: flex;justify-content: space-around">
            需付
            <span style="width: 100px;display: inline-block">
              <span class="dollar">￥</span>{{needPay.toFixed(2)}}
            </span>
          </div>
          <div class="price" style="font-size: 20px;font-weight: bolder;text-align: center;display: flex;justify-content: space-around">
            总计
            <span style="width: 100px;display: inline-block">
              <span class="dollar">￥</span>{{realPay.toFixed(2)}}
            </span>
          </div>
          <el-button-group style="position: fixed;bottom: 30px;left: 50%;width: 246;margin-left: -123px" >
            <el-button type="success" round @click="delayOrderPay" plain icon="el-icon-download">稍后支付</el-button>
            <el-button type="success" round @click="orderPay" icon="el-icon-d-arrow-right">直接结账</el-button>
          </el-button-group>
        </div>
      </div>
      <!--<el-table :data="selectFoods">-->
      <!--<el-table-column property="name" label="菜品" width="150"></el-table-column>-->
      <!--<el-table-column property="normalPrice" label="价格" width="200"></el-table-column>-->
      <!--<el-table-column property="address" label="地址"></el-table-column>-->
      <!--</el-table>-->
    </el-dialog>

    <!--添加/修改餐桌弹框-->
    <el-dialog title="添加餐桌" :visible.sync="showFormTableAdd" top="7vh">
      <el-form :model="tableForm" :label-width="formLabelWidth" ref="confirmTableData">
        <el-form-item
          label="名称"
          prop="name"
          :rules="[{ required: true, message: '请输入名称', trigger: 'blur' },]"
        >
          <el-input
            autofocus="true"
            v-model="tableForm.name"
            auto-complete="off"
            @keyup="onkeyup(e)"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="num"
          :rules="[{ required: true, message: '请输入桌号', trigger: 'blur' },]"
          label="桌号">
          <el-input
            v-model.number="tableForm.num"
            auto-complete="off"
            placeholder="请输入桌号"></el-input>
        </el-form-item>
        <el-form-item
          prop="seatNum"
          :rules="[{ required: true, message: '请输入人数', trigger: 'blur' },]"
          label="容纳人数">
          <el-input
            v-model.number="tableForm.seatNum"
            auto-complete="off" placeholder="请输入容纳人数"></el-input>
        </el-form-item>
        <el-form-item
          label="餐桌类型"
          style="text-align: left"
          prop="tid"
          :rules="[{ required: true, message: '请输入餐桌类型', trigger: 'change' },]"
        >
          <el-select
            style="display: inline-block"
            v-model="tableForm.tid"
            placeholder="请选择餐桌类型">
            <el-option
              v-for="(item,index) in tableType"
              :key="index"
              :label="item.typeName"
              :value="item.typeIndex"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="订单类型"
          style="text-align: left"
          prop="orderType"
          :rules="[{ required: true, message: '请选择订单类型', trigger: 'change' },]"
        >
          <el-select style="display: inline-block" v-model="tableForm.orderType" placeholder="请选择收费类型">
            <el-option label="单人" value="single"></el-option>
            <el-option label="多人" value="multi"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="收费类型"
          style="text-align: left"
          prop="chargeType"
          :rules="[{ required: true, message: '请选择收费类型', trigger: 'change' },]"
        >
          <el-select
            style="display: inline-block"
            v-model="tableForm.chargeType"
            placeholder="请选择收费类型">
            <el-option
              v-for="(item,index) in chargeType"
              :key="index"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="tableForm.chargeType === 'charge'" label="价格">
          <el-input v-model.number="tableForm.money" auto-complete="off" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model.number="tableForm.description" auto-complete="off" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="editOrAdd === 2">
        <el-button size="large" @click="updateTableDelay('confirmTableData','1')" icon="el-icon-time">暂停</el-button>
        <el-button @click="showFormTableChange = false; tableForm = {}">取 消</el-button>
        <el-button type="primary" @click="updateTable('confirmTableData','1')">修改并开启</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-if="editOrAdd === 1">
        <el-button size="large" @click="addTableDelay('confirmTableData','1')" icon="el-icon-time">暂不开台</el-button>
        <el-button @click="showFormTableAdd = false; tableForm = {}">取 消</el-button>
        <el-button type="primary" @click="addTable('confirmTableData','1')">立即开台</el-button>
      </div>
    </el-dialog>

    <!--添加餐桌按钮-->
    <el-button size="large" type="primary" icon="el-icon-plus" @click="addTablePre" class="control-button">添加餐桌</el-button>


    <!--打印机对话框选择-->
    <el-dialog
      width="70%"
      title="打印选项"
      :visible.sync="showFormPrinter"
      :append-to-body="true"
      style="z-index: 9999"
    >
      <el-form label-position="left" label-width="70px">
        <el-form-item label="打印机">
          <el-radio-group v-model="printerName" @change="selectedPrinterName(printerName)">
            <el-radio-button v-for="(printer,index) in printerTable" :label="printer.driverName" :key="index">{{printer.name}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-form label-position="left" label-width="70px">
        <el-form-item label="打印模板">
          <el-radio-group v-model="printerTemplate">
            <el-radio-button
              v-for="(printerTemplate,index) in printerTemplateTable"
              :label="printerTemplate.name"
              :key="index"
              v-if="printerTemplate.printWidth === printerWidth"
            ></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="打印份数"
          style="text-align: left"
          prop="chargeType"
        >
          <el-select
            style="display: inline-block"
            v-model="printerNum"
            placeholder="请选择打印份数">
            <el-option
              v-for="(item,index) in 10"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!--选择规格对话框SKU-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="showFormPrinter = false">关 闭</el-button>
        <el-button type="primary" @click="confirmPrinter" icon="el-icon-printer">打 印</el-button>
      </div>
    </el-dialog>

    <el-dialog
      width="70%"
      title="选择规格"
      :visible.sync="showFormSelectSpec"
      :append-to-body="true"
      style="z-index: 9999"
    >
      <el-form v-for="(item,index) in specs" label-position="left" label-width="70px" :key="index">
        <el-form-item :label="item.name">
          <el-radio-group v-model="selectedSkuArr[index]">
            <el-radio-button v-for="(attrs,index) in item.attrs" :label="attrs.name" :key="index"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-form label-position="left" label-width="70px">
        <el-form-item label="标签">
          <el-checkbox-group v-model="selectedTags">
            <el-checkbox  v-for="(attrs,index) in getFoods.tags" :label="attrs.name" border :key="index"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <span style="float: left">价格：<span class="dollar">￥</span> {{basePrice+tagsTotalPrice}}</span>
        <el-button @click="showFormSelectSpec = false">取 消</el-button>
        <el-button type="primary" @click="confirmSku">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import Vue from 'vue';
import shopcart from '@/components/tables/shopcart.vue'
import cartcontrol from '@/components/tables/cartcontrol.vue'

const ERR_OK = 0
export default {
  name: 'tables',
  data: () => ({
    tid:0,
    printerWidth: 600,
    tableStatus:'not-payed',
    screenWidth: document.body.clientWidth,
    printerName:'',
    printerNum:1,
    printerTemplate:'',
    showFormPrinter:false,
    tableList:[],
    cartList:[],
    discountMoney:0,
    voucherMoney:0,
    headCouponMoney:0,
    needPay:0,
    realPay:0,
    editOrAdd:0,
    tableShow:0,
    specs:[],
    goods: [],
    getFoods:{},
    dishesCategory:'',
    getDataFromSelectFoods:{},
    selectedTags:[],
    selectedSkuArr : [],
    selectedFood: {},
    listHeight: [],
    scrollY: 0,
    showMenu: false,
    showTable: true,
    activeName: 'first',
    tableOrderList:[],
    fullscreenLoading: false,
    dialogConfirmOrder:false,
    showFormTable: false,
    showFormTableAdd: false,
    showFormSelectSpec:false,
    tableOrderConfirm:[],
    selectedOrder: {},
    formLabelWidth:'80px',
    tableTitle:"",
    tableForm: {},
    scrollOnce:0,
    settingForm:{},
    selectSingleOrder: 0,
    loading: false,
    tagsTotalPrice:0,
    basePrice:0,
    selectedTable:0,
    tableCartList:[],
    printerTemplateTable: [],
    printerTable: [],
    countTable:0,
    tableType:[
      {
        typeName: '大厅',
        typeIndex: 36,
      },
      {
        typeName: '包厢',
        typeIndex: 35,
      },
      {
        typeName: '卡座',
        typeIndex: 34,
      },
    ],
    tableTypeSelect:[
      {
        typeName: '大厅',
        typeIndex: 36,
      },
      {
        typeName: '包厢',
        typeIndex: 35,
      },
      {
        typeName: '卡座',
        typeIndex: 34,
      },
      {
        typeName: '全部',
        typeIndex: 0,
      },
    ],
    chargeType:[
      {
        name:'免费',
        value:'free'
      },
      {
        name:'收费',
        value:'charge'
      }
    ],
  }),
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.normalPrice * food.count;
      });
      return total;
    },
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      if(this.goods){
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
      }
      return foods;
    },
    watchTable(){
      return this.$store.state.tableStatus
    },

  },
  watch:{
    watchTable(val) {
      console.log(val);
      this.$request(this.url.table4, 'json', val).then((res)=>{
        this._pullTable()
      }).catch((err)=>{
      })
    },
    getFoods(){
      this.basePrice = this.getFoods.normalPrice
    },
    selectedSkuArr(val){
      if(val.length === 0){
        return
      }
      let  attrJoin = this.transformArrySku().join('_');
      let  selectedSkuObj = this.findSkuByAttrJoin(attrJoin);
      let  skusTotalPrice = 0
      if(!selectedSkuObj){
        return false
      }else{
        if(this.getFoods.skus){
          for(let i=0;i<this.getFoods.skus.length;i++) {
            if (selectedSkuObj.id === this.getFoods.skus[i].id) {
              // console.log(this.getFoods.skus[i].normalPrice);
              skusTotalPrice += this.getFoods.skus[i].normalPrice
            }
          }
        }else {
          return false
        }
      }
      this.basePrice = skusTotalPrice
    },
    selectedTags(val) {
      let tagsTotalPrice = 0
      if(this.getFoods.tags){
        for(let i=0;i<this.getFoods.tags.length;i++){
          if(val.length > 0 ){
            for(let j=0;j<val.length;j++){
              if(val[j] === this.getFoods.tags[i].name){
                // console.log('得到价格',this.getFoods.tags[i].price);
                tagsTotalPrice += this.getFoods.tags[i].price
              }
            }
          }
        }
      }else {
        return
      }
      this.tagsTotalPrice = tagsTotalPrice
    }
  },
  methods: {
    selectedPrinterName(val){
      for(let i = 0; i<this.printerTable.length; i++){
        if(this.printerTable[i].driverName === val){
          this.printerWidth = this.printerTable[i].width  //获得打印机名
        }
      }
    },
    _pullPrinter(){
      this.$request(this.url.printerComplexPageQuery,'json',[]).then((res)=>{
        this.printerTable = res.data.data
      }).catch((err)=>{
        console.log(err);
      })
    },
    _pullPrinterTemplate(){
      this.$request(this.url.printerTemplateComplexPageQuery,'json',[{
        feild:"status",
        value:"enable",
        joinType:"eq"
      }]).then((res)=>{
        this.printerTemplateTable = res.data.data
      }).catch((err)=>{
        console.log(err);
      })
    },
    confirmPrinter(){
      // console.log(this.printerTemplateTable, this.printerTable);
      console.log(this.printerTemplate, this.printerName,this.printerNum);
      var printerTemplate = this.printerTemplate
      console.log(this.selectedOrder);
      if(printerTemplate === '80mm-无价格'){
        this.kitchen80(this.selectedOrder,this.printerName,this.printerNum)
        console.log('正在打印 启动的是厨房80mm模板，打印机器是'+this.printerName)
      }else if(printerTemplate === '60mm-无价格'){
        this.kitchen60(this.selectedOrder,this.printerName,this.printerNum)
        console.log('正在打印 启动的是厨房60mm模板，打印机器是'+this.printerName)
      }else if(printerTemplate === '80mm-价格-订单号'){
        this.cashier80(this.selectedOrder,this.printerName,this.printerNum)
        console.log('正在打印 启动的是收银台80mm模板，打印机器是'+this.printerName)
      }else if(printerTemplate === '60mm-价格-订单号'){
        this.cashier60(this.selectedOrder,this.printerName,this.printerNum)
        console.log('正在打印 启动的是收银台60mm模板，打印机器是'+this.printerName)
      }
    },
    printerOrder(item,event){
      this.selectedOrder = item
      // console.log(this.settingForm);
      // this.kitchen80(item,"收银台",1)
      this.showFormPrinter = !this.showFormPrinter
    },
    updateShopcart(){
      this._pullCartList()
    },
    toCountTable(){
      let _this = this
      setTimeout(function () {
        var num = document.getElementsByClassName("transition-box").length
        _this.countTable = num
      },100)
    },
    transformArrySku(){
      let selectedSkuArr = []
      for(var i=0;0<this.selectedSkuArr.length;i++){
        if(this.selectedSkuArr.length === i){
          return selectedSkuArr
        }else {
          if(this.specs[i].attrs === undefined){
          }else{
            for(var j=0;j<this.specs[i].attrs.length;j++){
              if(this.selectedSkuArr.length === i){
                continue
              }else if(this.selectedSkuArr[i] === this.specs[i].attrs[j].name){
                selectedSkuArr.push(this.specs[i].attrs[j].id)
              }
            }
          }
        }
      }
    },
    transformArryTags(){
      let selectedArryTags = []
      let data = [
        {
          feild:'status',
          value:'enable',
          joinType: 'eq'
        }
      ]
      let _this = this
      this.$request(this.url.restaurantTag2,'json',data).then((res)=>{
        var response = res.data.data
        for(var i=0;0<this.selectedTags.length;i++) {
          if(this.selectedTags.length === i){
            // this.selectedTags.length === i的时候循环已经到尾了这个时候应该弹出
            //selectedArryTags.push(response[j].id) id
            // 但是这是个promise只有在这里面执行请求
            //是最直接的

            // console.log('selectedArryTags111111111111111',selectedArryTags);
            let attrTags = selectedArryTags.join(',');
            let attrJoin = _this.transformArrySku().join('_');
            // console.log('attrJoin', attrJoin);
            let selectedSkuObj = _this.findSkuByAttrJoin(attrJoin);
            // console.log('确定_this.getFoods',_this.getFoods);
            // console.log('selectedSkuObj===================',selectedSkuObj);

            if(!selectedSkuObj){
              alert('规格没有选完')
              return false
            }
            //删掉相关联的规格都会引起id出现问题
            //删掉相关联的分类都会引起forEach出现问题
            // console.log(_this.getFoods);
            // console.log(_this.getFoods.id);
            let data = {
              num:1,
              sid: selectedSkuObj.id,
              did: _this.getFoods.id,
              rid: parseInt(localStorage.getItem('rid')),
              tid: _this.tid,
              type: 'multi',
              tagIds: attrTags
            }
            _this.$request(_this.url.cartAdd,'json',data).then((res)=>{
              if(res.data.msg === 'success'){

                _this._pullCartList()
                _this.ballDrop()

              }
            }).catch((err)=>{
              console.log(err);
            })
            return
          }else{
            for (var j = 0; j < response.length; j++) {
              if(this.selectedTags[i] === response[j].name) {
                selectedArryTags.push(response[j].id)
                // console.log('response[j].id',response[j].id);
              }
            }
          }
        }
      }).catch((err)=>{
        console.log(err);
      })
    },
    refreshNeedPay(){
      let data= {
        restaurantId: localStorage.getItem('rid'),
        orderType:'multi',
        tableId: this.tid
      }
      this.$request(this.url.confirmOrder,'form',data).then((res)=>{
        // console.log(res);
        this.cartList = res.data.data.cartList
        this.discountMoney = res.data.data.discountMoney
        this.voucherMoney = res.data.data.voucherMoney
        this.headCouponMoney = res.data.data.headCouponMoney
        this.needPay = res.data.data.needPay
        this.realPay = res.data.data.realPay
      }).catch((err)=>{

      })
    },
    incrementTotalAdd(g) {
      this.getDataFromSelectFoods.event = g.event
      console.log('餐桌',this.tableForm);
      this.tagsTotalPrice = 0
      this.selectedSkuArr = []
      this.selectedTags = []
      // console.log(g.event,g.food,'456546456456')
      //体验优化,异步执行下落动画
      this.getFoods = Object.assign({},g.food)
      // console.log(this.getFoods);
      if(g.specs){
        this.showFormSelectSpec = !this.showFormSelectSpec
        this.getFoods = g.food
        this.specs = g.food.specs
      }else{
        // console.log('g.event',g.event);
        this.$nextTick(() => {
          this.$refs['shop-cart'].drop(g.event);
        });
        let data = {
          num: 1,
          did: g.food.id,
          rid: g.food.rid,
          tid: this.tid,
          type: 'multi',
        }
        this.$request(this.url.cartAdd,'json',data).then((res)=>{
          this._pullCartList()
        }).catch((err)=>{
          console.log('加入购物车失败',err);
        })
      }
    },
    incrementTotalDecre(g){
      if(g.specs){
        this.showFormSelectSpec = !this.showFormSelectSpec
        this.getFoods = g.food
        this.specs = g.food.specs
      }else{
        let data = {
          num: -1,
          did: g.food.id,
          rid: g.food.rid,
          tid: this.tid,
          type: 'multi',
        }
        this.$request(this.url.cartAdd,'json',data).then((res)=>{
          this.refreshNeedPay()
        }).catch((err)=>{
          console.log(err);
        })
      }
    },
    findSkuByAttrJoin(selectedJoinAttr){
      for(let item of this.getFoods.skus){
        if(item.attrJion === selectedJoinAttr){
          return item;
        }
      }
    },
    empty() {
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
    },
    delayOrderPay(){

      var data = {
        restaurantId: parseInt(localStorage.getItem('rid')),
        orderType:'multi',
        tableId: this.tid,
        payType:'underline',
        payStatus:'not-payed',
        serverType:'real-time',
      }
      this.$request(this.url.payOrder,'form',data).then((res)=>{
        console.log(res);
        this._pullTableOrder()
        this._pullCartList()
        this.dialogConfirmOrder = !this.dialogConfirmOrder
      }).catch((err)=>{
        console.log(err);
      })
    },
    orderPay(){
      var data = {
        restaurantId: parseInt(localStorage.getItem('rid')),
        orderType:'multi',
        serverType:'real-time',
        tableId: this.tid,
        payStatus:'has-pay',
        payType:'underline'
      }
      this.$request(this.url.payOrder,'form',data).then((res)=>{
        // console.log(res);
        this._pullTableOrder()
        this._pullCartList()
        this.dialogConfirmOrder = !this.dialogConfirmOrder
      }).catch((err)=>{
        console.log(err);
      })
    },
    confirmSku(){
      console.log('1');
      let _this = this
      if(!this.transformArrySku()){
        this.$message({
          type: 'info',
          message: '亲，没有选择规格哦~'
        });
        return
      }
      if(this.selectedTags.length > 0){
        this.transformArryTags()
      }else{
        let  attrJoin = this.transformArrySku().join('_');
        let  selectedSkuObj = this.findSkuByAttrJoin(attrJoin);
        if(!selectedSkuObj){
          alert('规格没有选完')
          return false
        }
        let data = {
          num:1,
          sid: selectedSkuObj.id,
          did: this.getFoods.id,
          rid: this.getFoods.rid,
          tid: this.tid,
          type: 'multi',
        }
        console.log('2');
        this.$request(this.url.cartAdd,'json',data).then((res)=>{
          _this._pullCartList()
          console.log(this.tableCartList);
          _this.ballDrop()

        }).catch((err)=>{
          console.log('加入购物车失败',err);
        })
      }
    },
    prepayInfo(){
      this.dialogConfirmOrder = !this.dialogConfirmOrder
      let data= {
        restaurantId: localStorage.getItem('rid'),
        orderType:'multi',
        tableId: this.tid
      }
      this.$request(this.url.confirmOrder,'form',data).then((res)=>{

        this.cartList = res.data.data.cartList
        this.discountMoney = res.data.data.discountMoney
        this.needPay = res.data.data.needPay
        this.realPay = res.data.data.realPay
      }).catch((err)=>{
        console.log(err);
      })
    },

    selectOrder(item,event){
      this.selectedOrder = item
    },
    selectMenu(index, event) {
      let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook');
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    singleAccounts(){
      alert("结账中……")
      this.goeasy('service')
    },
    incrementTotal(target) {
      //体验优化,异步执行下落动画
      this.$nextTick(() => {
        this.$refs['shop-cart'].drop(target);
      });
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs['menu-wrapper'], {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs['foods-wrapper'], {
        click: true,
        probeType: 3
      });
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    ballDrop(){
      if (!this.getFoods.count) {
        Vue.set(this.getFoods, 'count', 1);
      } else {
        this.getFoods.count++;
      }
      this.showFormSelectSpec = !this.showFormSelectSpec
      this.$nextTick(() => {
        this.$refs['shop-cart'].drop(this.getDataFromSelectFoods.event);
        this.refreshNeedPay()
      });
    },
    _pullTable(){
      let data2 = [
        {
          feild:'status',
          value:'123',
          joinType:'ne'
        }
      ]
      this.$request(this.url.table2,'json',data2).then((res)=>{
        // console.log(res.data.data);
        this.tableList = res.data.data
      }).catch((err)=>{
        console.log(err);
      })
    },
    addTablePre(data){
      this.tableForm = {}
      this.showFormTableAdd = !this.showFormTableAdd;
      this.editOrAdd = 1
    },
    addTable(confirmData,a){
      this.tableForm.status = 'pre-order'
      let data = this.tableForm
      console.log(data);
      this.$refs[confirmData].validate((valid) => {
        if (valid) {
          this.$request(this.url.table1, 'json', data).then((res)=>{
            this.$message({
              type: 'success',
              message: '数据提交成功!'
            });
            this.showFormTableAdd =!this.showFormTableAdd
            this._pullTable()
          }).catch((err)=>{
            this.$message({
              type: 'info',
              message: '数据提交失败!'
            });
            console.log(err);
          })
        }else{
          this.$message.error(
            '信息不完整或者填写错误！!'
          );
          return false;
        }
      });
    },
    addTableDelay(confirmData,a){
      this.tableForm.status = 'disable'
      let data = this.tableForm

      this.$refs[confirmData].validate((valid) => {
        if (valid) {
          this.$request(this.url.table1, 'json', data).then((res)=>{
            this.$message({
              type: 'success',
              message: '数据提交成功!'
            });
            this.showFormTableAdd =!this.showFormTableAdd
            this._pullTable()
          }).catch((err)=>{
            this.$message({
              type: 'info',
              message: '数据提交失败!'
            });
            console.log(err);
          })
        }else{
          this.$message.error(
            '信息不完整或者填写错误！!'
          );
          return false;
        }
      });
    },
    updateTable(confirmData,a){
      this.tableForm.status = 'pre-order'

      let data = this.tableForm
      this.$refs[confirmData].validate((valid) => {
        if (valid) {
          this.$request(this.url.table4, 'json', data).then((res)=>{
            this.$message({
              type: 'success',
              message: '数据提交成功!'
            });
            this.showFormTableAdd =!this.showFormTableAdd
            this._pullTable()
          }).catch((err)=>{
            this.$message({
              type: 'info',
              message: '数据提交失败!'
            });
            console.log(err);
          })
        }else{
          this.$message.error(
            '信息不完整或者填写错误！!'
          );
          return false;
        }
      });
    },
    updateTableDelay(confirmData,a){
      let data = {
        id:this.tableForm.id,
        status: this.tableForm.status
      }
      this.$refs[confirmData].validate((valid) => {
        if(valid){
          this.$request(this.url.table4, 'json', data).then((res)=>{
            this.$message({
              type: 'success',
              message: '数据提交成功!'
            });
            this.showFormTableAdd =!this.showFormTableAdd
          }).catch((err)=>{
            this.$message({
              type: 'info',
              message: '数据提交失败!'
            });
            console.log(err);
          })
        }else {
          this.$message.error(
            '信息不完整或者填写错误！!'
          );
          return false;
        }
      })
    },
    _pullTableOrder(){
      // const end = new Date();
      // const start = new Date();
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var Hours = date.getHours();
      var Minutes = date.getMinutes();
      var Seconds = date.getSeconds();

      if (Hours >= 0 && Hours <= 9) {
        Hours = "0" + Hours;
      }
      if (Minutes >= 0 && Minutes <= 9) {
        Minutes = "0" + Minutes;
      }
      if (Seconds >= 0 && Seconds <= 9) {
        Seconds = "0" + Seconds;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + Hours + seperator2 + Minutes
        + seperator2 + Seconds;
      var zerodate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + '00:00:00';

      // console.log(currentdate, zerodate);
      this.$request(this.url.orderComplexPageQuery,'json',[
        {
          feild:'tid',
          value:this.tid,
          joinType:'eq'
        },
        {
          feild:'rid',
          value:localStorage.getItem('rid'),
          joinType:'eq'
        },
        {
          feild:'createTime',
          value: zerodate,
          joinType:'gt'
        },
        {
          feild:'createTime',
          value: currentdate,
          joinType:'lt'
        }
      ]).then((res)=>{
        // console.log(res);
        this.tableOrderList = res.data.data
      }).catch((err)=>{
        console.log(err);
      })
    },
    _pullCartList(){
      this.$request(this.url.cartComplexPageQuery,'json',[
        {
          feild:'tid',
          value:this.tid,
          joinType:'eq'
        },
        {
          feild:'rid',
          value:localStorage.getItem('rid'),
          joinType:'eq'
        }
      ]).then((res)=>{
        this.tableCartList = res.data.data
      }).catch((err)=>{
        console.log(err);
      })
    },
    selectTable(item,index){
      console.log(this.screenWidth);
      if(this.screenWidth < 1000){
        return
      }


      this.tableForm = item
      this.tid = item.id
      this._pullCartList()
      this._pullTableOrder()
      var _this = this;
      var Data = [
        {
          feild: '',
          value: '',
          joinType: ''
        }
      ];
      this.$request(this.url.loginRestaurantManager,'form',{
        thirdId:123456789
      }).then((res)=>{
        _this.$request(_this.url.dishesCategory2, 'json', Data).then((res)=>{
          _this.dishesCategory = res.data.data;
          _this.refreshNeedPay()
        }).catch((err)=>{
          console.log(err)
        }).then(function () {
          _this.goods = _this.goodsArr(_this);
        })
      })
      setTimeout(() => {
        if(this.scrollOnce === 0){
          this._initScroll()
          this._calculateHeight()
          this.scrollOnce= 1
        }
        loading.close();
      }, 3000);
      this.tableShow = 1
      this.tableTitle = this.tableForm.num
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

    },
    editTable(){
      this.showFormTableAdd = !this.showFormTableAdd
      this.editOrAdd = 2
    },
    closeTable(){
      this.tableShow = 0
      this.tableForm = {}
      this.scrollOnce= 0
    },
    deleteTable(tag) {
      this.$confirm('即将删除该餐桌, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          id:this.tableForm.id
        }
        this.$request(this.url.table3,'form',data).then((res)=>{
          this.$message({
            type: 'success',
            message: '数据提交成功!'
          });
          this._pullTable()
          this.tableShow = 0
        }).catch((err)=>{
          this.$message({
            type: 'info',
            message: '数据提交失败!'
          });
          console.log(err);
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    stopTableService(){
      const loading = this.$loading({
        lock: true,
        text: '正在暂停该餐桌服务……',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let data = {
        id:this.tableForm.id,
        status: 'disable'
      }
      this.$request(this.url.table4, 'json', data).then((res)=>{
        this.$message({
          type: 'success',
          message: '数据提交成功!'
        });
        setTimeout(() => {
          loading.close();
          this.$message({
            showClose: true,
            message: '该餐桌二维码已经失效！',
            type: 'success'
          });
          this._pullTable()
        }, 700);
      }).catch((err)=>{
        this.$message({
          type: 'info',
          message: '数据提交失败!'
        });
        console.log(err);
      })
    },
    handleShowTable() {
      this.showTable = !this.showTable
    },
    _pullSetting(){
      this.$request(this.url.restaurantSetting,'json',[]).then((res)=>{
        this.settingForm = res.data.data[0]
      }).catch((err)=>{
      })
    }
  },
  created() {
    this._pullPrinter()
    this._pullSetting()
    this.toCountTable()
    this._pullPrinterTemplate()
    let data1 = [{
      feild: 'status',
      value: 'enable',
      joinType: 'eq'
    }]
    this.$request(this.url.dishesCategory2,'json',data1).then((res)=>{
      this.dishesCategory = res.data.data
      // console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
    this._pullTable()
    // console.log(this.$store.state.screenWidth);
  },
  components:{
    shopcart,
    cartcontrol
  },
  events: {
    'cart.add'(target) {
      this._drop(target);
    }
  },
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "tables.styl"
</style>
