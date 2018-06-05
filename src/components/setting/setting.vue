<template>
    <div class="setting">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <!--营业设置模块-->
        <el-tab-pane style="padding-top: 15px" label="营业设置" name="first">
          <el-form ref="form" label-width="80px">
            <el-form-item class="save-part">
              <el-switch
                class="person-close person-close1"
                style="display: block"
                v-model="settingForm.serviceStatus"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="开启服务"
                inactive-text="暂停服务"
                active-value="open"
                inactive-value="close"
              >
              </el-switch>
              <el-button class="control-button" type="primary" @click="onSubmitSetting">保存</el-button>
            </el-form-item>
            <!--<div style="display: flex;flex-wrap: nowrap">
              <el-form-item label="App配色方案" label-width="100px" style="margin-bottom: 0px;margin-right: 5px">
                <el-color-picker v-model="settingForm.theme" show-alpha></el-color-picker>
              </el-form-item>


              <el-form-item label-width="100px" style="margin-right: 5px;margin-bottom: 0px" label="首页背景图" prop="bannerImg">
                <upload
                  style="background: url('')"
                  v-on:ToUrl="listenUrlIndexBg"
                  :name="UID('/indexBg/')"
                  :target="this.settingForm.indexBg"></upload>
                <transition name="el-zoom-in-center">
                  <img v-show="showIndexBg" class="transition-box" style="box-shadow: 2px 2px 2px rgba(0,0,0,0.25);position: fixed;z-index: 100;right: 40px;border-radius: 10px" :src="'https://order-online.oss-cn-shenzhen.aliyuncs.com' + this.settingForm.indexBg" alt="">
                </transition>
              </el-form-item>
              <i style="font-size: 30px;margin-left: 5px;padding-top: 10px" class="el-icon-view" @click="showIndexBg = !showIndexBg" circle></i>
            </div>
            <el-form-item label="外卖推送">
              美团推送
              <el-tooltip :content="'Switch value: ' + value5" placement="top">
                <el-switch
                  v-model="value5"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="100"
                  inactive-value="0">
                </el-switch>
              </el-tooltip>
              饿了么推送
              <el-tooltip :content="'Switch value: ' + value5" placement="top">
                <el-switch
                  v-model="value6"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="100"
                  inactive-value="0">
                </el-switch>
              </el-tooltip>
              <el-button style="position: absolute;right: 50%;top: 8px;" size="mini" round>验证</el-button>
            </el-form-item>
            <el-form-item v-model="settingForm.BusinessTime" label="营业时间" :label-width="formLabelWidth">
              <el-time-picker
                style="width: 170px"
                v-model="startTimeSetting"
                :picker-options="{
                selectableRange: '06:30:00 - 23:30:00'
              }"
                :placeholder="startTimePreSetting">
              </el-time-picker>
              <el-col class="line" style="text-align: center; display: inline-block; float: none" :span="2">-</el-col>
              <el-time-picker
                style="width: 170px"
                arrow-control
                v-model="endTimeSetting"
                @change="endTimeSettingFun"
                :picker-options="{
                selectableRange: '06:30:00 - 23:30:00'
              }"
                :placeholder="endTimePreSetting">
              </el-time-picker>
            </el-form-item>-->



            <div class="matter2">
              <!--<el-form-item label="促销状态" label-width="120px">-->
                <!--<el-select v-model="settingForm.promotiomStatus" placeholder="请选择推广状态">-->
                  <!--<el-option label="未促销" value="close"></el-option>-->
                  <!--<el-option label="会员促销" value="member"></el-option>-->
                  <!--<el-option label="活动促销" value="promotion"></el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->

              <el-form-item label="提现类型" label-width="120px">
                <el-select v-model="settingForm.withdrawType" placeholder="请选择提现类型">
                  <el-option label="实时到账" value="realtime"></el-option>
                  <el-option label="主动提现" value="withdraw"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="服务提现类型" label-width="120px">
                <el-select v-model="settingForm.serviceRemindType" placeholder="请选择提现类型">
                  <el-option label="文字提醒" value="text"></el-option>
                  <el-option label="音频+文字提醒" value="audioText"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="matter2" style="z-index: -1">

              <el-form-item label="打印类型" label-width="120px">
                <el-select v-model="settingForm.printType" placeholder="请选择打印类型">
                  <el-option label="整单打印" value="whole"></el-option>
                  <el-option label="分类打印" value="part"></el-option>
                </el-select>
              </el-form-item>
              <el-form :inline="true">
                <el-form-item label="厨房打印机" label-width="120px">
                  <el-select
                    style="display: inline-block"
                    v-model="settingForm.kitchenPrinterId"
                    placeholder="请选择厨房打印机">
                    <el-option
                      v-for="(item,index) in printerTable"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="厨房打印模板" label-width="100px">
                  <el-select
                    style="display: inline-block"
                    v-model="settingForm.kitchenPrinterTemplate"
                    placeholder="请选择厨房打印模板">
                    <el-option
                      v-for="(item,index) in printerTemplateTable"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>

              <el-form>
                <el-form-item label="厨房打印份数" label-width="120px">
                  <el-input
                    v-model="settingForm.kitchenPrinterNum"
                    placeholder="请输入厨房打印份数"></el-input>
                </el-form-item>
              </el-form>
              <el-form :inline="true">
                <el-form-item label="收银台打印机" label-width="120px">
                  <el-select
                    style="display: inline-block"
                    v-model="settingForm.cashierPrinterId"
                    placeholder="请选择厨房打印机">
                    <el-option
                      v-for="(item,index) in printerTable"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="收银台打印模板" label-width="120px">
                  <el-select
                    style="display: inline-block"
                    v-model="settingForm.cashierPrinterTemplate"
                    placeholder="请选择收银台打印模板">
                    <el-option
                      v-for="(item,index) in printerTemplateTable"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <el-form>
                <el-form-item label="收银台打印份数" label-width="120px">
                  <el-input
                    v-model="settingForm.cashierPrinterNum"
                    placeholder="请输入收银台打印份数"></el-input>
                </el-form-item>
              </el-form>
              <span
                class="matter2-hint"
              >打印机快速设置
                &nbsp;&nbsp;<el-button @click="toPrinterSetting1" type="primary" plain style="padding: 4px" size="mini" round>&nbsp;打印机&nbsp;</el-button>&nbsp;&nbsp;
                或者
                <el-button @click="toPrinterSetting2" type="primary" plain style="padding: 4px" size="mini" round>&nbsp;打印模板&nbsp;</el-button>
                编辑
              </span>
            </div>
            <!--<el-form-item label="店铺公告">-->
              <!--<el-input type="textarea" v-model="form.desc"></el-input>-->
            <!--</el-form-item>-->
          </el-form>
        </el-tab-pane>

        <!--打印机-->
        <el-tab-pane style="padding-top: 15px" label="打印机" name="third">
          <template>
            <el-table
              :data="printerTable"
              style="width: 100%"
              :height="$store.state.tableHeight"
            >
              <el-table-column
                sortable
                fixed="left"
                prop="name"
                label="打印机名"
                width="120">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="status"
                label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 'disable'">不可用</span>
                  <span v-if="scope.row.status === 'enable'">可用</span>
                </template>
              </el-table-column>
              <el-table-column
                sortable
                prop="width"
                label="打印宽度"
                width="150">
              </el-table-column>
              <el-table-column
                sortable
                prop="driverName"
                label="驱动名"
                width="200">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="description"
                label="描述/介绍">
              </el-table-column>
              <el-table-column
                sortable
                prop="remark"
                label="备注"
                width="100">
              </el-table-column>

              <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="editPrinter(scope.row)"
                    type="text"
                    size="small">
                    编辑
                  </el-button>
                  <el-button
                    @click.native.prevent="deletePrinter(scope.row)"
                    type="text"
                    size="small">
                    删除
                  </el-button>

                </template>
              </el-table-column>
            </el-table>

          </template>
          <el-button type="primary" icon="el-icon-plus" @click="addPrinter" class="control-button">添加打印机</el-button>
        </el-tab-pane>

        <!--打印模板-->
        <el-tab-pane style="padding-top: 15px" label="打印模板" name="fourth">
          <template>
            <el-table
              :data="printerTemplateTable"
              style="width: 100%"
              :height="$store.state.tableHeight"
            >
              <el-table-column
                sortable
                fixed="left"
                prop="name"
                label="模板名"
                width="150">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="status"
                label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 'enable'">可用</span>
                  <span v-if="scope.row.status === 'disable'">不可用</span>
                </template>
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="printWidth"
                label="模板宽度">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="description"
                label="描述/介绍">
              </el-table-column>
              <el-table-column
                sortable
                prop="code"
                label="模板代码"
                width="150">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="editPrinterTemplate(scope.row)"
                    type="text"
                    size="small">
                    编辑
                  </el-button>
                  <el-button
                    @click.native.prevent="deletePrinterTemplate(scope.row)"
                    type="text"
                    size="small">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <el-button type="primary" icon="el-icon-plus" @click="addPrinterTemplate" class="control-button">添加打印模板</el-button>
        </el-tab-pane>

        <!--账户-->
        <el-tab-pane style="padding-top: 15px" label="账户设置" name="fifth">
          <el-dialog
            title="支付宝账号绑定"
            :center="true"
            :visible.sync="bindAliShowVisible"
            width="60%">
            <el-form :inline="true">
              <el-form-item>
                <el-input v-model="aliRecode" placeholder="输入餐厅绑定的手机验证码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button :loading="bindAliShowLoading" type="primary" @click="getAliCode">{{confirmMsg}}</el-button>
              </el-form-item>
            </el-form>
            <el-form>
              <el-form-item>
                <el-input
                  placeholder="请输入姓名"
                  v-model="alipayAccountName">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  style="margin: 10px 0px"
                  placeholder="请输入支付宝账号"
                  v-model="alipayAccount">
                  <template slot="append">
                    <svg class="icon" style="color:#0c9fe4;width: 2em; height: 2em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1037 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2424"><path d="M665.600029 614.4c70.4-128 96-249.6 96-249.6l-12.8 0 0 0L640.000029 364.8 524.800029 364.8 524.800029 275.2l281.6 0L806.400029 236.8 524.800029 236.8 524.800029 102.4l-128 0 0 134.4-256 0 0 38.4 256 0 0 89.6L179.200029 364.8l0 38.4 441.6 0c0 6.4 0 6.4-6.4 12.8C614.400029 460.8 582.400029 524.8 556.800029 576 230.400029 448 134.400029 524.8 108.800029 537.6c-217.6 153.6-12.8 345.6 19.2 339.2 230.4 51.2 377.6-44.8 480-166.4 6.4 6.4 12.8 6.4 19.2 6.4 70.4 38.4 409.6 198.4 409.6 198.4s0-140.8 0-192C985.600029 723.2 800.000029 659.2 665.600029 614.4zM499.200029 672c-160 204.8-352 140.8-384 128C38.400029 780.8 12.800029 640 108.800029 595.2c160-51.2 300.8 6.4 403.2 57.6C505.600029 665.6 499.200029 672 499.200029 672z" p-id="2425"></path></svg>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="handleCloseBindAli">取 消</el-button>
              <el-button type="primary" @click="lastAliBinded">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog
            title="微信账号绑定"
            :center="true"
            :visible.sync="bindWechatShowVisible"
            width="60%"
            :before-close="handleCloseBindWechat">
            <el-form :inline="true">
              <el-form-item>
                <el-input v-model="WechatRecode" placeholder="输入餐厅绑定的手机验证码"></el-input>

              </el-form-item>
              <el-form-item>
                <el-button :loading="bindAliShowLoading" type="success" @click="getAliCode">{{confirmMsg}}</el-button>

              </el-form-item>
            </el-form>
            <el-form>
              <el-form-item>
                <el-input
                  style="margin: 10px 0px"
                  placeholder="请输入姓名"
                  v-model="WeChatAccountName">
                </el-input>
              </el-form-item>
              <!--<el-form-item>-->
                <!--<el-input placeholder="点击刷新二维码，若没有反应请刷新页面，" @focus="WeChatFocus" v-model="WeChatAccount">-->
                  <!--<template slot="append">-->
                    <!--<svg class="icon" style="color: #62b900;width: 2em; height: 2em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2292"><path d="M403.26656 621.184c-54.78912 30.41792-62.9248-17.08032-62.9248-17.08032L271.6672 444.48256c-26.42432-75.8528 22.87104-34.20672 22.87104-34.20672s42.30144 31.86688 74.39872 51.29728c32.08192 19.42528 68.64896 5.69344 68.64896 5.69344l448.96256-206.40768c-82.8416-102.66112-219.66848-169.78944-374.5792-169.78944-252.80512 0-457.71776 178.64704-457.71776 399.02208 0 126.76608 67.85536 239.58016 173.54752 312.70912l-19.05664 109.1328c0 0-9.28256 31.872 22.912 17.09056 21.94432-10.07616 77.88032-46.18752 111.1808-68.15232 52.352 18.176 109.37856 28.26752 169.17504 28.26752 252.77952 0 457.74336-178.64192 457.74336-399.02208 0-63.83616-17.26464-124.11904-47.86688-177.61792C778.83904 398.19776 446.14656 597.41696 403.26656 621.184L403.26656 621.184 403.26656 621.184 403.26656 621.184z" p-id="2293"></path></svg>-->
                  <!--</template>-->
                <!--</el-input>-->
              <!--</el-form-item>-->
              <div id="qcode" style="text-align: center"></div>
            </el-form>

            <span slot="footer" class="dialog-footer">
              <el-button @click="handleCloseBindWechat">取 消</el-button>
              <el-button type="success" @click="confirmWechatBinded">确 定</el-button>
            </span>
          </el-dialog>
          <div style="margin-top: 15px; display: flex;justify-content: space-around;">
            <span></span>
            <el-col :span="8">
              <el-card shadow="hover" style="text-align: center">
                <p>{{alipayGetName}}</p>
                <el-button @click="bindAliShow" :type="primaryTo">
                  <svg class="icon" style="color:white;width: 2em; height: 2em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1037 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2424"><path d="M665.600029 614.4c70.4-128 96-249.6 96-249.6l-12.8 0 0 0L640.000029 364.8 524.800029 364.8 524.800029 275.2l281.6 0L806.400029 236.8 524.800029 236.8 524.800029 102.4l-128 0 0 134.4-256 0 0 38.4 256 0 0 89.6L179.200029 364.8l0 38.4 441.6 0c0 6.4 0 6.4-6.4 12.8C614.400029 460.8 582.400029 524.8 556.800029 576 230.400029 448 134.400029 524.8 108.800029 537.6c-217.6 153.6-12.8 345.6 19.2 339.2 230.4 51.2 377.6-44.8 480-166.4 6.4 6.4 12.8 6.4 19.2 6.4 70.4 38.4 409.6 198.4 409.6 198.4s0-140.8 0-192C985.600029 723.2 800.000029 659.2 665.600029 614.4zM499.200029 672c-160 204.8-352 140.8-384 128C38.400029 780.8 12.800029 640 108.800029 595.2c160-51.2 300.8 6.4 403.2 57.6C505.600029 665.6 499.200029 672 499.200029 672z" p-id="2425"></path></svg>
                  支付宝账号绑定
                </el-button>
              </el-card>
            </el-col>

            <el-col :span="8">
              <el-card shadow="hover" style="text-align: center">
                <p>{{wechatGetName}}</p>
                <el-button @click="bindWechatShow" :type="successTo">
                  <svg class="icon" style="color: white;width: 2em; height: 2em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2292"><path d="M403.26656 621.184c-54.78912 30.41792-62.9248-17.08032-62.9248-17.08032L271.6672 444.48256c-26.42432-75.8528 22.87104-34.20672 22.87104-34.20672s42.30144 31.86688 74.39872 51.29728c32.08192 19.42528 68.64896 5.69344 68.64896 5.69344l448.96256-206.40768c-82.8416-102.66112-219.66848-169.78944-374.5792-169.78944-252.80512 0-457.71776 178.64704-457.71776 399.02208 0 126.76608 67.85536 239.58016 173.54752 312.70912l-19.05664 109.1328c0 0-9.28256 31.872 22.912 17.09056 21.94432-10.07616 77.88032-46.18752 111.1808-68.15232 52.352 18.176 109.37856 28.26752 169.17504 28.26752 252.77952 0 457.74336-178.64192 457.74336-399.02208 0-63.83616-17.26464-124.11904-47.86688-177.61792C778.83904 398.19776 446.14656 597.41696 403.26656 621.184L403.26656 621.184 403.26656 621.184 403.26656 621.184z" p-id="2293"></path></svg>
                  微信账号绑定
                </el-button>
              </el-card>
            </el-col>
            <span></span>
          </div>
        </el-tab-pane>

      </el-tabs>
      <!--添加打印机-->
      <el-dialog title="添加打印机" :visible.sync="showFormPrinterAdd">
        <el-form :model="printerForm" :label-width="formLabelWidth">
          <el-form-item label="打印机名" >
            <el-input
              autofocus="true"
              v-model="printerForm.name"
              auto-complete="off"
              @keyup="onkeyup(e)"
              placeholder="请输入打印机名称"></el-input>
          </el-form-item>
          <el-form-item label="驱动名">
            <el-input
              v-model="printerForm.driverName"
              auto-complete="off"
              placeholder="请输入驱动名"></el-input>
          </el-form-item>
          <el-form-item label="打印宽度">
            <el-input
              v-model="printerForm.width"
              auto-complete="off"
              placeholder="请输入打印宽度"></el-input>
          </el-form-item>
          <el-form-item label="状态" style="text-align: left">
            <el-select
              style="display: inline-block"
              v-model="printerForm.status"
              placeholder="请选择状态">
              <el-option
                v-for="(item,index) in printerStatus"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="printerForm.description" auto-complete="off" placeholder="请输入描述"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="printerForm.remark" auto-complete="off" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closePrinterLog">取 消</el-button>
          <el-button v-if="showUpdatePrinter === 0" type="primary" @click="addPrinterConfirm">确定</el-button>
          <el-button v-if="showUpdatePrinter === 1" type="primary" @click="updatePrinterConfirm">修改</el-button>
        </div>
      </el-dialog>
      <!--增加打印模板-->
      <el-dialog title="添加打印模板" :visible.sync="showFormPrinterTemplateAdd">
        <el-form :model="printerTemplateForm" :label-width="formLabelWidth">
          <el-form-item label="模板名" >
            <el-input
              autofocus="true"
              v-model="printerTemplateForm.name"
              placeholder="请输入打印机模板名"></el-input>
          </el-form-item>
          <el-form-item label="介绍" >
            <el-input
              autofocus="true"
              v-model="printerTemplateForm.description"
              placeholder="请输入打印机模板介绍"></el-input>
          </el-form-item>
          <el-form-item label="模板宽度">
            <el-input
              v-model="printerTemplateForm.printWidth"
              auto-complete="off"
              placeholder="请输入模板宽度"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closePrinterTemplateLog">取 消</el-button>
          <el-button v-if="showUpdatePrinterTemplate === 0" type="primary" @click="addPrinterTemplateConfirm">确定</el-button>
          <el-button v-if="showUpdatePrinterTemplate === 1" type="primary" @click="updatePrinterTemplateConfirm">修改</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
  import upload from '@/components/upload/upload'
export default {
  components: {
    upload
  },
  watch:{
    WechatRecode(val){
      // console.log(val);
      if(val.length === 6){
        this.WeChatFocus()
      }
    }
  },
  data() {
    return {
      alipayAccount:'',
      WeChatAccount:'',
      showUpdatePrinterTemplate: 0,
      showUpdatePrinter: 0,
      alipayGetName:'未绑定',
      wechatGetName:'未绑定',
      alipaymsg:'支付宝账号绑定',
      wechatmsg:'微信账号绑定',
      activeName: 'first',
      successTo:'success',
      primaryTo:'primary',
      printerTable:[],
      countdown:60,
      printerTemplateTable:[],
      printerTemplateForm:{},
      startTimeSetting:'',
      endTimeSetting:'',
      startTimePreSetting:'',
      endTimePreSetting:'',
      alipayAccountName:'',
      WeChatAccountName:'',
      cashierPrinterTemplate:[],
      kitchenPrinterTemplate:[],
      kitchenPrinterId:[],
      cashierPrinterId:[],
      printerStatus:[
        {
          label:'可用',
          value:'enable'
        },
        {
          label:'不可用',
          value:'disable'
        },
      ],
      value4: true,
      value5: 100,
      printerForm:{},
      showFormPrinterAdd:false,
      showFormPrinterTemplateAdd:false,
      settingForm:{},
      value6: 100,
      serviceStatus:'',
      serviceRemindType:'',
      indexBg:'',
      BusinessTime:'',
      appColor:'',
      withDrawType:'',
      printType:'',
      promotionStatus:'',
      birthdayDiscountStatus:'',
      birthdayDiscountType:'',
      birthdayDiscountNum:'',
      birthdayMinimumChar:'',
      bindAliShowVisible:false,
      bindAliShowLoading:false,
      aliRecode:'',
      bindWechatShowVisible:false,
      screenHeight: document.body.clientHeight,
      bindWechatShowLoading:false,
      WechatRecode:'',
      showIndexBg:false,
      confirmMsg:'免费获取验证码',
      form: {
        name: '',
        region: '',
        delivery: true,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px',
      color3:'#409EFF'
    };
  },
  created(){
    this._pullPrinter()
    this._pullPrinterTemplate()
    this._pullSetting()
    this._pullBindAccount()
    if (200 < this.screenHeight&& this.screenHeight < 380) {
      this.$store.state.tableHeight = 260
    }if (380 < this.screenHeight && this.screenHeight < 770){
      this.$store.state.tableHeight = 555
    }if (770 < this.screenHeight){
      this.$store.state.tableHeight = 750
    }
  },
  methods:{
    _pullBindAccount(){
      let _this = this
      this.$request(this.url.restaurantWithdrawAccountComplexPageQuery,'json',[]).then((res)=>{
        this.wechatGetName = res.data.data[0].nickname + '已绑定'
        this.alipayGetName = res.data.data[1].name + '已绑定';
        _this.alipaymsg = '切换支付宝绑定'
        // console.log(res.data.data);
      }).catch((err)=>{
        console.log(err);
      })
    },
    lastAliBinded(){
      // console.log(this.alipayAccountName);
      // console.log(this.aliRecode);
      // console.log(this.alipayAccount);
      this.$request(this.url.restaurantWithdrawAccount,'json',{
        name:this.alipayAccountName,
        account:this.alipayAccount,
        type:'alipay',
        smsCode:this.aliRecode
      }).then((res)=>{
        // console.log(res);
      }).catch((err)=>{
        console.log(err);
      })
      this.$message({
        type: 'success',
        message: '绑定成功!'
      });
      this.bindAliShowVisible =!this.bindAliShowVisible
    },
    handleCloseBindAli() {
      this.bindAliShowVisible = !this.bindAliShowVisible
    },
    confirmAliBinded(){
      if(!this.aliRecode){
        this.$message({
          type: 'info',
          message: '请输入验证码!'
        });
        return
      }
      this.bindAliShowVisible = !this.bindAliShowVisible
    },

    rollTime(){
      var _this = this
      if (this.countdown === 0) {
        this.bindAliShowLoading = false
        this.confirmMsg="免费获取验证码";
        this.countdown = 60;
        return
      } else {
        this.bindAliShowLoading = true
        this.confirmMsg="重新发送(" + this.countdown + ")";
        this.countdown--;
      }
      setTimeout(function() {
        _this.rollTime(this.confirmMsg)
      },1000)
    },
    rollTime1(){
      var _this = this
      if (this.countdown === 0) {
        this.bindWechatShowLoading = false
        this.confirmMsg="免费获取验证码";
        this.countdown = 60;
        return
      } else {
        this.bindWechatShowLoading = true
        this.confirmMsg="重新发送(" + this.countdown + ")";
        this.countdown--;
      }
      setTimeout(function() {
        _this.rollTime1(this.confirmMsg)
      },1000)
    },
    getWechatCode(){
      this.rollTime1()
      // this.bindWechatShowVisible = !this.bindWechatShowVisible
    },
    getAliCode(){
      // console.log(localStorage.getItem('rid'));
      // let data = {
      //     phone:17375636967
      // }
      this.$request(this.url.restaurantBindAccount,'form',{}).then((res)=>{
        // console.log(res);
      }).catch((err)=>{
        console.log(err);
      })
      this.rollTime()
    },
    bindAliShow() {
      this.aliRecode = ''
      this.countdown = 60
      this.bindAliShowVisible = !this.bindAliShowVisible
    },
    confirmWechatBinded(){
      if(!this.WechatRecode){
        this.$message({
          type: 'info',
          message: '请输入验证码!'
        });
        return
      } else {

      }
      this.bindWechatShowVisible = !this.bindWechatShowVisible
    },
    handleCloseBindWechat(done) {
      this.bindWechatShowVisible =!this.bindWechatShowVisible
    },

    bindWechatShow() {
      this.WechatRecode = ''
      this.countdown = 60
      this.bindWechatShowLoading = false
      this.bindWechatShowVisible = !this.bindWechatShowVisible
    },
    WeChatFocus(){
      let _this = this
      var obj = new WxLogin({
        id:"qcode",    //div的id
        appid: "wx687467655647657e",
        scope: "snsapi_login",
        redirect_uri: "http://8yziif.natappfree.cc/restaurantWithdrawAccount/bind",        //回调地址
        state: '1524988356660049,' + _this.WechatRecode,　　　　　　//参数，可带可不带
        style: "",　　　　　　　//样式  提供"black"、"white"可选，默认为黑色文字描述
        href: "/"              //自定义样式链接，第三方可根据实际需求覆盖默认样式。
      });
    },
    UID(n){
      var name = n + this.getUID()
      return name
    },
    listenUrlIndexBg(data){
      this.settingForm.indexBg = data.name
    },
    endTimeSettingFun(){
      this.BusinessTime = this.startTimeSetting.getHours()+
        ':'+this.startTimeSetting.getMinutes()+
        '-'+this.endTimeSetting.getHours()+
        ':'+this.endTimeSetting.getMinutes()
    },
    _pullSetting(){

      this.$request(this.url.restaurantSetting,'json',[]).then((res)=>{
        this.settingForm = res.data.data[0]
      }).catch((err)=>{
        console.log(err);

      })
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
    closePrinterLog(){
      this.showFormPrinterAdd = !this.showFormPrinterAdd;
      this._pullPrinter()
    },
     addPrinterConfirm(){
      this.$request(this.url.printerAdd,'json',this.printerForm).then((res)=>{

        this.showFormPrinterAdd = !this.showFormPrinterAdd;
        this._pullPrinter()
      }).catch((err)=>{
        console.log(err);
      })
    },
    updatePrinterConfirm(){
      this.$request(this.url.printerUpdate,'json',this.printerForm).then((res)=>{
        console.log(res);
        this.showFormPrinterAdd = !this.showFormPrinterAdd
        this._pullPrinter()
      }).catch((err)=>{
        console.log(err);
      })
    },
    toPrinterSetting1(){
      this.activeName = 'third'
    },
    toPrinterSetting2(){
      this.activeName = 'fourth'
    },
     addPrinter(){
       console.log("cleared");
       this.printerForm = {}
       this.showUpdatePrinter = 0
      this.showFormPrinterAdd = !this.showFormPrinterAdd;
    },
    closePrinterTemplateLog(){
      this.showFormPrinterTemplateAdd = !this.showFormPrinterTemplateAdd;
      this._pullPrinterTemplate()
    },
     addPrinterTemplateConfirm(){
      // console.log('提交打印机数据',this.printerTemplateForm);
      this.$request(this.url.printerTemplateAdd,'json',this.printerTemplateForm).then((res)=>{
        // console.log(res);
        this.showFormPrinterTemplateAdd = !this.showFormPrinterTemplateAdd;
        this._pullPrinterTemplate()
      }).catch((err)=>{
        console.log(err);
      })
    },
     addPrinterTemplate(){
      this.showFormPrinterTemplateAdd = !this.showFormPrinterTemplateAdd;
       this.showUpdatePrinterTemplate = 0
       this.printerTemplateForm = {}
    },
    editPrinterTemplate(row){
      this.printerTemplateForm = row
      this.showUpdatePrinterTemplate = 1
      this.showFormPrinterTemplateAdd = !this.showFormPrinterTemplateAdd;
    },
    updatePrinterTemplateConfirm(){
      let data = this.printerTemplateForm
      this.$request(this.url.printerTemplateUpdate,'json',data).then((res)=>{
        console.log(res);
        this.showFormPrinterTemplateAdd = !this.showFormPrinterTemplateAdd;
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
        this._pullPrinterTemplate()
      }).catch((err)=>{
        console.log(err);
      })
    },
    deletePrinterTemplate(row){
      let data = {
        id: row.id
      }
      this.$request(this.url.printerTemplateDelete,'form',data).then((res)=>{
        // console.log(res);
        this._pullPrinterTemplate()
      }).catch((err)=>{
        console.log(err);
      })
    },
    editPrinter(row){
      this.printerForm = row
      this.showFormPrinterAdd = !this.showFormPrinterAdd
      this.showUpdatePrinter = 1
    },
    deletePrinter(row){
      let data = {
        id: row.id
      }
      // console.log(data);
      this.$request(this.url.printerDelete,'form',data).then((res)=>{
        // console.log(res);
        this._pullPrinter()
      }).catch((err)=>{
        console.log(err);
      })
    },
    handleClick(tab, event) {
    },
    onSubmitSetting() {

      let data = this.settingForm
      this.$request(this.url.restaurantUpdate,'json',data).then((res)=>{
        // console.log(res);
        this.$message({
          type: 'success',
          message: '数据提交成功!'
        });
        this._pullSetting()
      }).catch((err)=>{
        console.log(err);
      })

    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .el-tabs__nav
    margin-left 10%

  .el-tab-pane
    text-align left !important

  .spa-title
    margin-right 10px
    width 10em
    display inline-block
    text-align left
    height 2em

  .upload-demo
    border-radius 0.5em
    padding 8px
    margin-bottom 10px
    &:hover
      background rgba(0, 0, 0, 0.02)


  .el-form-item__content
    display flex
    align-items center

  .el-switch
    margin-right 12px

  .el-tabs__content
    overflow-y scroll
    padding-top 10px

  .save-part
    position fixed
    width 618px
    right 94px
    bottom 83px


  .el-tab-pane[data-v-60204f04]
    width 100% !important


  .matter2
    border-radius: 5px
    padding: 10px
    span
      margin: 5px 0px 10px 20px
      display: block
      font-size: 10px
      font-weight: lighter
    &:hover
      background rgba(0, 0, 0, 0.02)
</style>
