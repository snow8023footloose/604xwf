<template>
  <div class="finance">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane label="统计图表" name="first">
        <el-row>
          <el-col :span="16" style="padding-right: 5px">
            <schart :canvasId="canvasId"
                    :type="type"
                    :width="width"
                    :height="height"
                    :data="data"
                    :options="options"
                    class="schart"
                    style="overflow-x: scroll"
            ></schart>
            <el-row>
              <el-col :span="12">
                <span class="title1"  style="margin-left: 40px">
                  <span v-if="typeFilter === 'order'">最近订单总数量
                    <span class="total">{{dailyTotal}}</span>个
                  </span>
                  <span v-if="typeFilter === 'member'">最近会员总数量
                    <span class="total">{{dailyTotal}}</span>个
                  </span>
                  <span v-if="typeFilter === 'dishes'">
                    <span v-if="mostSale>0">{{mostName}} 卖了
                    <span class="total">{{mostSale}}</span> 份 <span v-if="mostSale > 100">！</span></span>
                    <span v-if="mostSale === null">还没有数据</span>
                  </span>
                </span>
              </el-col>
              <el-col :span="12">
                <span class="title1">
                  <span v-if="timeFilter === 'month'">月</span>
                  <span v-if="timeFilter === 'quarter'">季度</span>
                  <span v-if="typeFilter === 'order'">订单总数量共
                    <span class="total">{{mouthTotal}}</span>个<span v-if="mouthTotal > 500">！</span>
                  </span>
                  <span v-if="typeFilter === 'member'">会员总数量共

                    <span class="total">{{mouthTotal}}</span>个<span v-if="mouthTotal > 50">！</span>
                  </span>
                  <span v-if="typeFilter === 'dishes'">菜品销售量共
                    <span class="total">{{mouthTotal}}</span><span v-if="mouthTotal > 500">！</span>
                  </span>
                </span>
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
              <el-radio-group v-model="typeFilter" @change="filterFun">
                <el-radio-button label="order">订单</el-radio-button>
                <el-radio-button label="dishes">菜品</el-radio-button>
                <el-radio-button label="member">会员</el-radio-button>
              </el-radio-group>
            </div>
            <div style="margin-top: 20px" v-if="typeFilter === 'order'">
              <el-radio-group v-model="timeFilter" size="medium" @change="filterFun">
                <el-radio-button label="day" >今日</el-radio-button>
                <el-radio-button label="month">近一月</el-radio-button>
                <el-radio-button label="quarter">近一季度</el-radio-button>
              </el-radio-group>
            </div>
            <div style="margin-top: 20px" v-if="typeFilter === 'dishes'">
              <el-radio-group v-model="timeFilter" size="medium" @change="filterFun">
                <el-radio-button label="day" >今日</el-radio-button>
                <el-radio-button label="month">近一月</el-radio-button>
                <el-radio-button label="quarter">近一季度</el-radio-button>
              </el-radio-group>
            </div>
            <div style="margin-top: 20px" v-if="typeFilter === 'member'">
              <el-radio-group v-model="timeFilter" size="medium" @change="filterFun">
                <el-radio-button label="month">近一月</el-radio-button>
                <el-radio-button label="quarter">近一季度</el-radio-button>
              </el-radio-group>
            </div>

            <!--<el-button style="margin-top: 10px" type="success" @click="submitFilter" round>查看</el-button>-->
          </el-col>
          <el-col :span="8" class="filterBtn2">
            <el-button-group>
              <el-button size="mini" @click="radioChange1">柱状图</el-button>
              <el-button size="mini" @click="radioChange2">折线图</el-button>
            </el-button-group>
            <br>
            <div style="margin-top: 20px">
              <el-radio-group v-model="typeFilter" size="mini" @change="filterFun">
                <el-radio-button label="order">订单</el-radio-button>
                <el-radio-button label="dishes">菜品</el-radio-button>
                <el-radio-button label="member">会员</el-radio-button>
              </el-radio-group>
            </div>
            <div style="margin-top: 20px" v-if="typeFilter === 'dishes'" @change="filterFun">
              <el-radio-group v-model="timeFilter" size="mini">
                <el-radio-button label="day" >今日</el-radio-button>
                <el-radio-button label="month">月</el-radio-button>
                <el-radio-button label="quarter">季度</el-radio-button>
              </el-radio-group>
            </div>
            <div style="margin-top: 20px" v-if="typeFilter === 'member'" @change="filterFun">
              <el-radio-group v-model="timeFilter" size="mini">
                <el-radio-button label="month">月</el-radio-button>
                <el-radio-button label="quarter">季度</el-radio-button>
              </el-radio-group>
            </div>
            <div style="margin-top: 20px" v-if="typeFilter === 'order'" @change="filterFun">
              <el-radio-group v-model="timeFilter" size="mini">
                <el-radio-button label="day" >今日</el-radio-button>
                <el-radio-button label="month">月</el-radio-button>
                <el-radio-button label="quarter">季度</el-radio-button>
              </el-radio-group>
            </div>

            <!--<el-button style="margin-top: 10px" type="success" @click="submitFilter" size="mini" round>查看</el-button>-->

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
    typeFilter:'member',
    timeFilter:'month',
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
    screenHeight: document.body.clientHeight,
    canvasId: 'myCanvas',
    type: 'bar',
    buttonShow:0,
    loginShow:true,
    showForm:false,
    radio: '1',
    filterOrderDate:[],
    data: [
      {name: '3.24', value: 742},
      {name: '3.25', value: 1523},
      {name: '3.26', value: 1654},
      {name: '3.28', value: 1095},
      {name: '3.29', value: 1595},
    ],
    options: {
      padding: 50,                                // canvas 内边距
      bgColor: '#FFFFFF',                         // 默认背景颜色
      title: '1本月收益基本统计（单位：元）',         // 图表标题
      titleColor: '#000000',                      // 图表标题颜色
      titlePosition: 'bottom',                       // 图表标题位置: top / bottom
      yEqual: 5,                                  // y轴分成5等分
      fillColor: '#1E9FFF',                       // 默认填充颜色
      contentColor: '#eeeeee',                    // 内容横线颜色
      axisColor: '#666666',                       // 坐标轴颜色
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
    deep:true,
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
    if (200 < this.$store.state.screenWidth&& this.$store.state.screenWidth < 380) {
      this.$store.state.tableHeight = 260
    }if (380 < this.$store.state.screenWidth && this.$store.state.screenWidth < 810){
      this.$store.state.tableHeight = 555
    }if (810 < this.$store.state.screenWidth){
      this.$store.state.tableHeight = 750
    }
    this.filterFun()
  },
  methods: {
    filterFun(){
      this.data = []
      let date1 = new Date()
      let date2 = new Date()
      this.filterOrderDate = [date1,date2]

      let title = ''

      if(this.timeFilter === "day"){
        var year0 = this.filterOrderDate[0].getFullYear()
        var year1 = this.filterOrderDate[1].getFullYear()

        var month0 = this.filterOrderDate[0].getMonth()+1
        var month1 = this.filterOrderDate[1].getMonth()+1

        var day0 = this.filterOrderDate[0].getDate()
        var day1 = this.filterOrderDate[1].getDate() + 1
        title = '今日'
      }else if(this.timeFilter === "month"){
        var year0 = this.filterOrderDate[0].getFullYear()
        var year1 = this.filterOrderDate[1].getFullYear()

        var month0 = this.filterOrderDate[0].getMonth()+1-1
        var month1 = this.filterOrderDate[1].getMonth()+1

        var day0 = this.filterOrderDate[0].getDate()
        var day1 = this.filterOrderDate[1].getDate()
        title = '本月'
      }else {
        var year0 = this.filterOrderDate[0].getFullYear()
        var year1 = this.filterOrderDate[1].getFullYear()

        var month0 = this.filterOrderDate[0].getMonth()+1-3
        var month1 = this.filterOrderDate[1].getMonth()+1

        var day0 = this.filterOrderDate[0].getDate()
        var day1 = this.filterOrderDate[1].getDate()
        title = '本季度'
      }

      if(month0 < 10){ /*月份小于10  就在前面加个0*/
        month0 = String(String(0) + String(month0));
      }
      if(month1 < 10){ /*月份小于10  就在前面加个0*/
        month1 = String(String(0) + String(month1));
      }
      if(day0 < 10){ /*日期小于10  就在前面加个0*/
        day0 = String(String(0) + String(day0));
      }
      if(day1 < 10){ /*日期小于10  就在前面加个0*/
        day1 = String(String(0) + String(day1));
      }

      let startTime = year0+ '-'+month0+ '-'+day0 + ' 00:00:00'
      let endTime = year1+ '-'+month1+ '-'+day1 + ' 00:00:00'

      // console.log(startTime,'startTime');
      var startTimeC = new Date(startTime).getTime();
      // console.log(this.TimetoString(startTimeC));
      var endTimeC = new Date(endTime).getTime();
      var slidTime = (endTimeC - startTimeC)/5

      var time1 = startTimeC + slidTime
      var time2 = startTimeC + slidTime*2
      var time3 = startTimeC + slidTime*3
      var time4 = startTimeC + slidTime*4
      var time5 = startTimeC + slidTime*5

      let finalData = []
      if(this.typeFilter === 'order'){
        title += '订单基本统计（单位：元）'
        this.toData(this.TimetoString(time1),this.TimetoString(time2),this.TimetoString(time3),this.TimetoString(time4),this.TimetoString(time5),this.url.userOrder,'json')
      }else if(this.typeFilter === 'dishes'){
        this.toData(this.TimetoString(time1),this.TimetoString(time2),this.TimetoString(time3),this.TimetoString(time4),this.TimetoString(time5),this.url.getDishesSaleData,'form')
        title = ''
      }else{
        this.toData(this.TimetoString(time1),this.TimetoString(time2),this.TimetoString(time3),this.TimetoString(time4),this.TimetoString(time5),this.url.memberComplexPageQuery,'json')
        title += '会员基本统计（单位：位）'
      }

      this.options = {
        padding: 50,                                // canvas 内边距
        bgColor: '#fff',                         // 默认背景颜色
        title: title,         // 图表标题
        titleColor: '#000000',                      // 图表标题颜色
        titlePosition: 'top',                       // 图表标题位置: top / bottom
        yEqual: 5,                                  // y轴分成5等分
        fillColor: '#1E9FFF',                       // 默认填充颜色
        contentColor: '#eeeeee',                    // 内容横线颜色
        axisColor: '#666666',                       // 坐标轴颜色
      }
    },
    TimetoString(inputTime){
      var date = new Date(inputTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    },
    toData(a,b,c,d,e,request,format){
      let  data1 =[
        {
          feild:'createTime',
          value: a,
          joinType:'gt'
        },
        {
          feild:'createTime',
          value: b,
          joinType:'lt'
        },
      ]
      let  data2 =[
        {
          feild:'createTime',
          value: b,
          joinType:'gt'
        },
        {
          feild:'createTime',
          value: c,
          joinType:'lt'
        },
      ]
      let  data3 =[
        {
          feild:'createTime',
          value: c,
          joinType:'gt'
        },
        {
          feild:'createTime',
          value: d,
          joinType:'lt'
        },
      ]
      let  data4 =[
        {
          feild:'createTime',
          value: d,
          joinType:'gt'
        },
        {
          feild:'createTime',
          value: e,
          joinType:'lt'
        },
      ]
      let dataf1 = {
        startTime:a,
        endTime:b
      }
      let dataf2 = {
        startTime:b,
        endTime:c
      }
      let dataf3 = {
        startTime:c,
        endTime:d
      }
      let dataf4 = {
        startTime:d,
        endTime:e
      }
      let _this = this
      this.data = []
      if(format === 'json'){
        this.$request(request,'json',data1).then((res)=>{

          if(res.data.data === null){
            _this.data.push({
              name: b.substr(5, 8),
              value: 0
            })
          }
          _this.data.push({
            name: b.substr(5, 8),
            value: res.data.data.length
          })
        }).catch((err)=>{
        }).then(_=>{
          this.$request(request,'json',data2).then((res)=>{

            if(res.data.data === null){
              _this.data.push({
                name: c.substr(5, 8),
                value: 0
              })
            }
            _this.data.push({
              name: c.substr(5, 8),
              value: res.data.data.length
            })
          }).catch((err)=>{
          }).then(_=>{
            this.$request(request,'json',data3).then((res)=>{

              if(res.data.data === null){
                _this.data.push({
                  name: d.substr(5, 8),
                  value: 0
                })
              }
              _this.data.push({
                name: d.substr(5, 8),
                value: res.data.data.length
              })
            }).catch((err)=>{
            }).then(_=>{
              this.$request(request,'json',data4).then((res)=>{

                if(res.data.data === null){
                  _this.data.push({
                    name: e.substr(5, 8),
                    value: 0
                  })
                }
                _this.data.push({
                  name: e.substr(5, 8),
                  value: res.data.data.length
                })
              }).catch((err)=>{
              })
            })
          })
        })
      }else {
        this.$request(request,'form',dataf1).then((res)=>{
          // console.log('1');
          // if(res.data.data === null){
          //   _this.data.push({
          //     name: b.substr(5, 8),
          //     value: 0
          //   })
          // }
          // _this.data.push({
          //   name: b.substr(5, 8),
          //   value: res.data.data.length
          // })
        }).catch((err)=>{
        }).then(_=>{
          this.$request(request,'form',dataf2).then((res)=>{

            // if(res.data.data === null){
            //   _this.data.push({
            //     name: c.substr(5, 8),
            //     value: 0
            //   })
            // }
            // _this.data.push({
            //   name: c.substr(5, 8),
            //   value: res.data.data.length
            // })
          }).catch((err)=>{
          }).then(_=>{
            this.$request(request,'form',dataf3).then((res)=>{

              // if(res.data.data === null){
              //   _this.data.push({
              //     name: d.substr(5, 8),
              //     value: 0
              //   })
              // }
              // _this.data.push({
              //   name: d.substr(5, 8),
              //   value: res.data.data.length
              // })
            }).catch((err)=>{
            }).then(_=>{
              this.$request(request,'form',dataf4).then((res)=>{
                for(var i = 0;i<res.data.data.length;i++){
                  _this.data.push({
                    name: res.data.data[i].name,
                    value: res.data.data[i].sale
                  })
                }
              }).catch((err)=>{
              })
            })
          })
        })
      }
    },
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

    width(){
      return this.data.length*100
    },
    mouthTotal: function () {
      var sum1 = 0
      for(var i=0; i<this.data.length; i++){
        sum1 += this.data[i].value
      }
      return sum1
    },
    dailyTotal: function () {
      var sum2 = 0
      for(var i=0; i<this.data.length; i++){

        sum2 = this.data[i].value
      }
      return sum2
    },
    mostSale: function () {
      var sum2 = 0
      for(var i=0; i<this.data.length; i++){

        sum2 = this.data[0].value
      }
      return sum2
    },
    mostName: function () {
      var sum2 = ''
      for(var i=0; i<this.data.length; i++){

        sum2 = this.data[0].name
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
    overflow-x scroll


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

