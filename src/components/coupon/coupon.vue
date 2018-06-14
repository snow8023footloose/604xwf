<template>
  <div class="coupon">
    <el-tabs
      v-model="activeName"
    >
      <el-tab-pane label="卡券设置" name="first">
        <el-collapse v-model="activeName1" accordion>
          <el-collapse-item :title="'新会员券：' + couponSetting.newMemberCouponStatus + '状态'" name="1">
            <el-col class="card" :span="23">
              <el-card shadow="hover">
                <div class="clearfix">
                  <span style="font-size: 18px;margin-right: 22px">新会员券</span>状态
                  <el-tooltip :content="'状态: ' + couponSetting.newMemberCouponStatus" placement="top">
                    <el-switch
                      v-model="couponSetting.newMemberCouponStatus"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-value="open"
                      inactive-value="on">
                    </el-switch>
                  </el-tooltip>
                </div>
                <el-form label-position="left" inline >
                  <el-form-item label="面值">
                    <el-input v-model.number="couponSetting.newMemberCouponPrice" placeholder="请输入面值"></el-input>
                  </el-form-item>
                  <!--<el-form-item label="消费">-->
                    <!--<el-input v-model.number="bestData.money" placeholder="使用条件：消费金额"></el-input>-->
                  <!--</el-form-item>-->
                </el-form>
              </el-card>
            </el-col>
          </el-collapse-item>
          <el-collapse-item :title="'人头券：' + couponSetting.headCouponStatus + '状态'" name="1">
            <el-col class="card" :span="23">
              <el-card shadow="hover">
                <div class="clearfix">
                  <span style="font-size: 18px;margin-right: 22px">人头券</span>状态
                  <el-tooltip :content="'状态: ' + couponSetting.headCouponStatus" placement="top">
                    <el-switch
                      v-model="couponSetting.headCouponStatus"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-value="open"
                      inactive-value="on">
                    </el-switch>
                  </el-tooltip>
                </div>
                <el-form label-position="left" inline >
                  <el-form-item label="面值">
                    <el-input v-model.number="couponSetting.headCouponPrice" placeholder="请输入面值"></el-input>
                  </el-form-item>
                  <!--<el-form-item label="消费">-->
                    <!--<el-input v-model.number="bestData.money" placeholder="使用条件：消费金额"></el-input>-->
                  <!--</el-form-item>-->
                </el-form>
              </el-card>
            </el-col>
          </el-collapse-item>
          <el-collapse-item :title="'回头券：' + couponSetting.headBackCouponStatus + '状态'" name="1">
            <el-col class="card" :span="23">
              <el-card shadow="hover">
                <div class="clearfix">
                  <span style="font-size: 18px;margin-right: 22px">回头券</span>状态
                  <el-tooltip :content="'状态: ' + couponSetting.headBackCouponStatus" placement="top">
                    <el-switch
                      v-model="couponSetting.headBackCouponStatus"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-value="open"
                      inactive-value="on">
                    </el-switch>
                  </el-tooltip>
                </div>
                <el-form label-position="left" inline>
                  <el-form-item label="面值">
                    <el-input v-model.number="couponSetting.headBackCouponPrice" placeholder="请输入金额"></el-input>
                  </el-form-item>
                  <!--<el-form-item label="描述" style="width: 380px">-->
                    <!--<el-input style="width: 280px" name="max-height:100px;" :rows="2" type="textarea" placeholder="请输入描述" v-model.number="rechargeData.money"></el-input>-->
                  <!--</el-form-item>-->
                </el-form>
              </el-card>
            </el-col>
          </el-collapse-item>

          <el-collapse-item :title="'默认信息：' + couponSetting.indexMessageStatus + '状态'" name="1">
            <el-col class="card" :span="23">
              <el-card shadow="hover">
                <div class="clearfix">
                  <span style="font-size: 18px;margin-right: 22px">默认信息</span>状态
                  <el-tooltip :content="'状态: ' + couponSetting.indexMessageStatus" placement="top">
                    <el-switch
                      v-model="couponSetting.indexMessageStatus"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-value="open"
                      inactive-value="on">
                    </el-switch>
                  </el-tooltip>
                </div>
                <el-form label-position="left" inline>

                  <!--<el-form-item label="描述" style="width: 380px">-->
                  <!--<el-input style="width: 280px" name="max-height:100px;" :rows="2" type="textarea" placeholder="请输入描述" v-model.number="rechargeData.money"></el-input>-->
                  <!--</el-form-item>-->
                </el-form>
              </el-card>
            </el-col>
          </el-collapse-item>
        </el-collapse>
        <el-button class="control-button" type="primary" @click="saveCouponSetting" :loading="saveCoupon">保存</el-button>
      </el-tab-pane>
      <el-tab-pane label="优惠券" name="second">
        <template>
          <el-table
            :data="discountCoupon"
            style="width: 100%"
            :height="$store.state.tableHeight"
          >
            <el-table-column
              sortable
              fixed="left"
              prop="name"
              label="卡券名"
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
              width="100"
              prop="discountAmount"
              label="优惠金额">
            </el-table-column>
            <el-table-column
              sortable
              width="100"
              prop="price"
              label="价格">
              <template slot-scope="scope">
                <span v-if="scope.row.price === 0">免费赠送</span>
                <span v-else-if="scope.row.price === null">免费赠送</span>
                <span v-else>{{scope.row.price}}</span>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              prop="type"
              label="类型"
              width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.type === 'coupon'">优惠券</span>
                <span v-if="scope.row.type === 'voucher'">代金券</span>
                <span v-if="scope.row.type === 'platform-voucher'">平台代金券</span>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              prop="buzType"
              label="消费形式"
              width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.buzType === 'head-back'">回头券</span>
                <span v-else-if="scope.row.buzType === 'new-give'">新人发放</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              width="100"
              prop="minimumCharge"
              label="使用下限">
            </el-table-column>
            <el-table-column
              sortable
              width="100"
              prop="minimumGiveCharge"
              label="获得下限">
            </el-table-column>
            <el-table-column
              sortable
              width="100"
              prop="canGetNum"
              label="获得数量">
            </el-table-column>
            <el-table-column
              sortable
              width="150"
              prop="description"
              label="描述/介绍">
            </el-table-column>
            <el-table-column
              sortable
              prop="stock"
              label="剩余数量"
              width="100">
            </el-table-column>
            <el-table-column
              sortable
              prop="publishNum"
              label="发行数量"
              width="100">
            </el-table-column>
            <el-table-column
              sortable
              width="100"
              prop="validType"
              label="有效类型">
              <template slot-scope="scope">
                <span>{{scope.row.validTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              width="100"
              prop="validDay"
              label="有效时段">
              <template slot-scope="scope">
                <span v-if="scope.row.validDay">{{scope.row.validDay}} 天</span>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              width="100"
              prop="validTime"
              label="有效日期">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="130">
              <template slot-scope="scope">
                <el-button v-if="scope.row.type === 'voucher' || scope.row.type === 'coupon'" @click.native.prevent="deleteDiscountCoupon(scope.row)" type="text" size="small">删除</el-button>
                <el-button v-if="scope.row.type === 'voucher' || scope.row.type === 'coupon'" @click.native.prevent="editDiscountCoupon(scope.row)" type="text" size="small">编辑</el-button>
                <el-button v-if="scope.row.status === 'enable' && scope.row.type !== 'platform-voucher'" @click.native.prevent="disableDiscountCoupon(scope.row)" class="not-sell" type="text" size="small">下架</el-button>
                <el-button v-if="scope.row.status === 'disable' && scope.row.type !== 'platform-voucher'" @click.native.prevent="enableDiscountCoupon(scope.row)" type="text" size="small">上架</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-button type="primary" @click="plusCoupon" class="control-button" icon="el-icon-plus">添加卡券</el-button>
      </el-tab-pane>
    </el-tabs>

      <!--卡券弹框-->
    <el-dialog top="7vh" title="增加卡券" :visible.sync="showFormCoupon">
      <el-form :model="couponForm" :label-width="formLabelWidth">
        <el-form-item label="卡券名" >
          <el-input
            autofocus="true"
            v-model="couponForm.name"
            auto-complete="off"
            @keyup="onkeyup(e)"
            placeholder="请输入卡券名"></el-input>
        </el-form-item>
        <el-form-item label="折扣规则">
          <el-select
            style="display: inline-block;margin: 0px 2px"
            v-model="couponForm.tid"
            placeholder="请选择卡券类型">
            <el-option
              v-for="(item,index) in couponType"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卡券类型">
          <el-select
            style="display: inline-block;margin: 0px 2px"
            v-model="couponForm.type"
            placeholder="请选择卡券类型">
            <el-option label="代金券 voucher" value="voucher"></el-option>
            <el-option label="优惠券 coupon" value="coupon"></el-option>
          </el-select>
          <el-input
            style="width: 220px;margin: 5px 0px"
            v-if="couponForm.type === 'voucher'"
            v-model.number="couponForm.price"
            auto-complete="off"
            placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="业务类型">
          <el-select
            style="display: inline-block;margin: 0px 2px"
            v-model="couponForm.buzType"
            placeholder="请选择业务类型">
            <el-option label="回头券" value="head-back"></el-option>
            <el-option label="新人券" value="new-give"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="限制类型">
          <el-select
            style="display: inline-block;margin: 0px 2px"
            v-model="couponForm.getLimitType"
            placeholder="请选择限制类型">
            <el-option label="启用" value="enable"></el-option>
            <el-option label="不启用" value="disable"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="获得条件" inline>
          <div style="display: flex;justify-content: space-between" >
            <el-select
              style="display: inline-block;margin: 0px 2px"
              v-model="couponForm.condition1"
              placeholder="顾客类型">
              <el-option label="新顾客" value="new"></el-option>
              <el-option label="老顾客" value="old"></el-option>
            </el-select>
            <el-select
              style="display: inline-block;margin: 0px 2px"
              v-model="couponForm.condition3"
              placeholder="模式">
              <el-option label="单人" value="multi"></el-option>
              <el-option label="多人" value="single"></el-option>
            </el-select>
            <el-select
              style="display: inline-block;margin: 0px 2px"
              v-model="couponForm.condition2"
              placeholder="行为">
              <el-option label="扫码" value="code"></el-option>
              <el-option label="支付" value="pay"></el-option>
              <el-option label="充值" value="recharge"></el-option>
              <el-option label="满" value="old"></el-option>
              <el-option label="分享" value="share"></el-option>
              <el-option label="推荐" value="commend"></el-option>
            </el-select>
          </div>
        </el-form-item>-->
        <el-form-item label="使用下限">
          <el-input
            v-model.number="couponForm.minimumCharge"
            auto-complete="off"
            placeholder="请输入使用下限"></el-input>
        </el-form-item>
        <el-form-item label="获得下限">
          <el-input
            v-model.number="couponForm.minimumGiveCharge"
            auto-complete="off"
            placeholder="请输入获得下限"></el-input>
        </el-form-item>
        <el-form-item label="优惠金额">
          <el-input
            v-model.number="couponForm.discountAmount"
            auto-complete="off"
            placeholder="请输入优惠金额"></el-input>
        </el-form-item>
        <el-form-item label="发行数量">
          <el-input
            v-model.number="couponForm.publishNum"
            auto-complete="off"
            placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item label="获得数量">
          <el-input
            v-model.number="couponForm.canGetNum"
            auto-complete="off"
            placeholder="请输入次数"></el-input>
        </el-form-item>
        <el-form-item label="期限类型">
          <el-select
            style="display: inline-block;margin: 0px 2px"
            v-model="couponForm.validType"
            placeholder="选择使用期限类型">
            <el-option label="到期时间" value="time"></el-option>
            <el-option label="时间段" value="day"></el-option>
          </el-select>
          <el-input
            style="width: 220px;margin: 5px 0px"
            v-model="couponForm.validDay"
            placeholder="输入天"
            v-if="couponForm.validType === 'day'">
          </el-input>
          <el-date-picker
            style="width: 220px;margin: 5px 0px"
            v-model="couponForm.validTimeStr"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-if="couponForm.validType === 'time'"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="couponForm.description" auto-complete="off" placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            style="display: inline-block;margin: 0px 2px"
            v-model="couponForm.status"
            placeholder="请选择状态">
            <el-option label="可用" value="enable"></el-option>
            <el-option label="不可用" value="disable"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showFormCoupon = false;">取 消</el-button>
        <el-button v-if="discountCouponEdit === 0" type="primary" @click="addConponConfirm">确定</el-button>
        <el-button v-if="discountCouponEdit === 1" type="primary" @click="updateConponConfirm">修改</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  export default {
    name: 'coupon',
    data:() => ({
      activeName: 'first',
      activeName1:'1',
      formLabelWidth: '80px',
      rechargeData:{},
      discountCoupon:[],
      showFormCoupon:false,
      screenHeight: document.body.clientHeight,
      saveCoupon: false,
      couponForm:{},
      couponSetting: {},
      discountCouponEdit: 0,
      couponType: [],
    }),
    created(){
      this._pullDiscountCoupon()
      this._pullCouponSetting()
      this._pullCouponType()
      if (200 < this.screenHeight&& this.screenHeight < 380) {
        this.$store.state.tableHeight = 260
      }if (380 < this.screenHeight && this.screenHeight < 810){
        this.$store.state.tableHeight = 460
      }if (810 < this.screenHeight){
        this.$store.state.tableHeight = 750
      }
    },
    methods: {
      _pullCouponType(){
        let data = [
          {
            feild:'status',
            value:'enable',
            joinType:'eq'
          }
        ]
        this.$request(this.url.couponType,'json',data).then((res)=>{
          this.couponType = res.data.data
          console.log(res.data.data);
        })
      },
      _pullDiscountCoupon(){
        let data = [
          {
            feild:'status',
            value:'123',
            joinType:'ne'
          }
        ]
        this.$request(this.url.discountCouponComplexPageQuery,'json',data).then((res)=>{
          this.discountCoupon = res.data.data
          console.log(this.discountCoupon);
        })
      },
      _pullCouponSetting(){
        this.$request(this.url.couponSettingComplexPageQuery,'json',[]).then((res)=>{
          this.couponSetting = res.data.data[0]
          console.log(this.couponSetting);
        })
      },
      disableDiscountCoupon(row){
        row.status = 'disable'
        this.$request(this.url.discountCouponUpdate,'json',row).then((res)=>{
          this._pullDiscountCoupon()
        })
      },
      enableDiscountCoupon(row){
        row.status = 'enable'
        this.$request(this.url.discountCouponUpdate,'json',row).then((res)=>{
          this._pullDiscountCoupon()
        })
      },
      deleteDiscountCoupon(row){
        this.$request(this.url.discountCouponDelete,'form',{id:row.id}).then((res)=>{
          console.log(res.data.msg);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this._pullDiscountCoupon()
        })
      },
      editDiscountCoupon(row){
        this.couponForm = row
        this.discountCouponEdit = 1
        this.showFormCoupon = !this.showFormCoupon
      },
      updateConponConfirm(){
        let data =  this.couponForm
        this.$request(this.url.discountCouponUpdate,'json',data).then((res)=>{
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this._pullDiscountCoupon()
        }).catch((err)=>{
          console.log(err);
        })
        this.showFormCoupon = !this.showFormCoupon
      },
      plusCoupon(){
        this.couponForm = {}
        this.discountCouponEdit = 0
        this.showFormCoupon = !this.showFormCoupon
      },
      addConponConfirm(){
        // this.couponForm.tid = 1000000000
        let data =  this.couponForm
        console.log(data);
        this.$request(this.url.discountCouponAdd,'json',data).then((res)=>{
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          this._pullDiscountCoupon()
        }).catch((err)=>{
          console.log(err);
        })
        this.showFormCoupon = !this.showFormCoupon
      },
      saveCouponSetting() {
        let data = this.couponSetting
        this.$request(this.url.couponSettingUpdate,'json',data).then((res)=>{
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
          this._pullCouponSetting()

        }).catch((err)=>{
          console.log(err);
          this.$message({
            type: 'info',
            message: '保存失败'
          });
        })

      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.card
  margin 10px 0px


.el-form-item
  margin-bottom 5px

.clearfix
  margin-bottom 10px


.el-card__header
  padding 5px 20px !important

.deduce
  .el-input
    display inline-block
    width 25%
  span
    margin 0px 5px

.not-sell
  color red
</style>
