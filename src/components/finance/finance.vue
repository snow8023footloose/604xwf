<template>
  <div class="finance">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane label="统计图表" name="first">
        <el-row>
          <el-col :span="16">
            <schart :canvasId="canvasId"
                    :type="type"
                    :width="width"
                    :height="height"
                    :data="data"
                    :options="options"
                    class="schart"
            ></schart>
            <el-row>
              <el-col :span="12">
                <span class="title1">今日总收入
                <span class="total">{{dailyTotal}}</span>元</span>
              </el-col>
              <el-col :span="12">
                <span class="title1">本月总收入
                <span class="total">{{mouthTotal}}</span>元</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8" class="filterBtn">

            <el-button-group v-if="buttonShow === 0" class="select-chart-type">
              <el-button size="mini" @click="radioChange1">柱状图</el-button>
              <el-button size="mini" @click="radioChange2">折线图</el-button>
            </el-button-group>
            <br>
            筛选
            <div style="margin-top: 20px">
              <el-radio-group v-model="typeFilter">
                <el-radio-button label="order">订单</el-radio-button>
                <el-radio-button label="dishes">菜品</el-radio-button>
                <el-radio-button label="member">会员</el-radio-button>
              </el-radio-group>
            </div>
            <div style="margin-top: 20px">
              <el-radio-group v-model="timeFilter" size="medium">
                <el-radio-button label="day" >今日</el-radio-button>
                <el-radio-button label="month">近一月</el-radio-button>
                <el-radio-button label="quarter">近一季度</el-radio-button>
              </el-radio-group>
            </div>
            <div style="margin-top: 20px">
              <el-radio-group v-model="othersFilter" size="small">
                <el-radio-button label="上海"></el-radio-button>
                <el-radio-button label="广州"></el-radio-button>
                <el-radio-button label="深圳"></el-radio-button>
              </el-radio-group>
            </div>

            <el-button style="margin-top: 10px" type="success" @click="submitFilter" round>查看</el-button>
          </el-col>
          <el-col :span="8" class="filterBtn2">
            <el-button-group>
              <el-button size="mini" @click="radioChange1">柱状图</el-button>
              <el-button size="mini" @click="radioChange2">折线图</el-button>
            </el-button-group>
            <br>
            <div style="margin-top: 20px">
              <el-radio-group v-model="typeFilter" size="mini">
                <el-radio-button label="order">订单</el-radio-button>
                <el-radio-button label="dishes">菜品</el-radio-button>
                <el-radio-button label="member">会员</el-radio-button>
              </el-radio-group>
            </div>
            <div style="margin-top: 20px">
              <el-radio-group v-model="timeFilter" size="mini">
                <el-radio-button label="day" >今日</el-radio-button>
                <el-radio-button label="month">月</el-radio-button>
                <el-radio-button label="quarter">季度</el-radio-button>
              </el-radio-group>
            </div>
            <div style="margin-top: 20px">
              <el-radio-group v-model="othersFilter" size="mini">
                <el-radio-button label="上海"></el-radio-button>
                <el-radio-button label="广州"></el-radio-button>
                <el-radio-button label="深圳"></el-radio-button>
              </el-radio-group>
            </div>
            <el-button style="margin-top: 10px" type="success" @click="submitFilter" size="mini" round>查看</el-button>

          </el-col>
        </el-row>
        <el-button size="large" type="primary" icon="el-icon-news" @click="withDraw" class="control-button">立即提现</el-button>

      </el-tab-pane>
    </el-tabs>

    <el-dialog title="提现" :visible.sync="showForm">
      <div class="withDraw" v-show="loginShow">
        <span slot="footer" class="dialog-footer">
            </span>
        <!--<img class="loginPic" src="../logo.png" alt="">-->
        <el-form
          label-width="100px"
          :label-position="labelPosition"
          class="demo-ruleForm withDraw"
          status-icon
          ref="ruleForm"
          :inline="true"
          :rules="rules2">
          <el-form-item label="请输入验证码" prop="recode">
              <el-input v-model="getAccountPhoneCode" placeholder="输入餐厅绑定的手机验证码"></el-input>
          </el-form-item>
          <el-form-item label="点击获取">
            <el-button :loading="bindAliShowLoading" type="primary" @click="getAccountCode">{{confirmMsg}}</el-button>
          </el-form-item>
        </el-form>
        <el-form
          label-width="100px"
          :label-position="labelPosition"
          class="demo-ruleForm withDraw"
          status-icon
          ref="ruleForm"
          :rules="rules2">
          <el-form-item v-if="showPasswordInput === 1"  label="密码" prop="password">
          <el-input placeholder="请输入提现金额" v-model="moneyNumber" class="input-with-select">
            <el-select style="width: 110px" v-model="withdrawType" slot="prepend" placeholder="到账类型">
              <el-option label="微信" value="wechat"></el-option>
              <el-option label="支付宝" value="alipay"></el-option>
            </el-select>
          </el-input>
          </el-form-item>
          <el-form-item>

            <el-button v-if="showPasswordInput === 1" style="float: right;margin-left: 10px" type="primary"
                       @click="submitConfirmPassWord">立即提现</el-button>
            <el-button style="float: right" @click="closeForm">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import schart from 'vue-schart'
export default {
  name: 'collect',
  data:() => ({
    orderFilter:'',
    typeFilter:'order',
    timeFilter:'day',
    othersFilter:'',
    rules2: {
      // password: [
      //   {required: true, message:'请输入密码', trigger:'blur'},
      // ],
      // recode: [
      //   {required: true, message:'请输入验证码', trigger:'blur'},
      // ],
    },
    confirmMsg:'免费获取验证码',
    moneyNumber:'',
    countdown:60,
    withdrawType:'alipay',
    bindAliShowLoading:false,
    getAccountPhoneCode:'',
    showPasswordInput:0,
    labelPosition: 'top',
    msg: '财务信息！',
    activeName: 'first',
    activeName2: 'first',
    screenWidth: document.body.clientWidth,
    canvasId: 'myCanvas',
    type: 'bar',
    width: 500,
    buttonShow:0,
    height: 300,
    loginShow:true,
    showForm:false,
    radio: '1',
    data: [
      {name: '3.24', value: 742},
      {name: '3.25', value: 1523},
      {name: '3.26', value: 1654},
      {name: '3.28', value: 1095},
      {name: '3.29', value: 1595},
      {name: '3.30', value: 2095},
    ],
    options: {
      padding: 50,                    // canvas 内边距
      bgColor: '#FFFFFF',             // 默认背景颜色
      title: '本月收益基本统计（单位：元）',         // 图表标题
      titleColor: '#000000',          // 图表标题颜色
      titlePosition: 'top',           // 图表标题位置: top / bottom
      yEqual: 5,                     // y轴分成5等分
      fillColor: '#1E9FFF',           // 默认填充颜色
      contentColor: '#eeeeee',        // 内容横线颜色
      axisColor: '#666666',           // 坐标轴颜色
    }
  }),
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
  },
  watch: {
    screenWidth (val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(function () {
          // that.screenWidth = that.$store.state.canvasWidth
          if(that.screenWidth<813){
          }
          // that.init()
          that.timer = false
        }, 400)
      }else {
        this.height = 500
      }
    },
    getAccountPhoneCode(val){
      if(val.length === 6){
        this.showPasswordInput =1
        this.$message({
          type: 'success',
          message: '验证码正确!'
        });
      }else {
        this.showPasswordInput =0
      }
    }
  },
  created(){
    if(this.screenWidth < 813){
      this.height = 230
      this.width = 418
      this.type = 'line'
      this.buttonShow = 1
    }else {
      this.height = 400
    }
  },
  methods: {
    submitFilter(){
      this.$request(this.url.getCountDishes,'form',{
        rid:localStorage.getItem('rid'),
        startTime:'2018-05-30 10:47:16',
        endTime:'2018-06-03 10:47:16'
      }).then((res)=>{
        console.log(res);
      }).catch((err)=>{
        console.log(err);
      })
    },
    confirmRecode(){
      if(!this.getAccountPhoneCode){
        this.$message({
          type: 'info',
          message: '请输入验证码!'
        });
        return
      }
      this.showForm = !this.showForm
    },
    closeForm() {
      this.showForm = !this.showForm
    },
    submitConfirmPassWord(){

      // console.log(this.getAccountPhoneCode);
      // console.log(this.moneyNumber);
      // console.log(this.withdrawType);
      this.$request(this.url.restaurantAccountWithdraw,'form',{
        type: this.withdrawType,
        smsCode:this.getAccountPhoneCode,
        money:this.moneyNumber
        // account:
      }).then((res)=>{
      }).catch((err)=>{
        console.log(err);
      })
      this.showForm = !this.showForm
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.countdown = 0
        })
        .catch(_ => {});
    },
    getAccountCode(){
      this.$request(this.url.restaurantBindAccount,'form',{}).then((res)=>{
        // console.log(res);
      }).catch((err)=>{
        console.log(err);
      })
      this.rollTime()
      // this.bindAliShowVisible = !this.bindAliShowVisible
    },
    rollTime(){
      var _this = this
      if (this.countdown == 0) {
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
    handleClick(tab, event) {
    },
    radioChange1(){
      this.type = 'bar'
    },
    radioChange2(){
      this.type = 'line'
    },

    withDraw(){
      this.showForm = !this.showForm
    }
  },
  computed:{
    mouthTotal: function () {
      var sum1 = 0
      for(var i=0; i<this.data.length; i++){
        sum1 += this.data[i].value
      }
      return sum1
    },
    dailyTotal: function () {
      var sum2 = 2
      for(var i=0; i<this.data.length; i++){

        sum2 = this.data[i].value
      }
      return sum2
    }
  },
  components:{
    schart
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">


.showChart
  width 500px
  .schart
    display flex
    justify-content center
    width 500px


.select-chart-type
  margin 30px 0px

.filterBtn2
  display none
  padding-left 20px

.total
  font-size 30px

.title1
  margin-right 20px

.bnt-group
  margin 10px 0px
  padding-left 10px
.first-group
  margin-top 30px


@media screen and (max-width: 1000px)
  .filterBtn
    display none
  .filterBtn2
    display block
</style>

