<template>
  <div class="member">
    <el-tabs
      v-model="activeName"
    >
      <el-tab-pane label='会员列表' name="first">
        <template>
          <el-table
            v-loading="loading"
            :data="memberTable"
            style="width: 100%"
            :height="$store.state.tableHeight"
          >
            <el-table-column
              sortable
              fixed="left"
              prop="user.nickname"
              label="会员名"
              width="120">
            </el-table-column>
            <el-table-column
              sortable
              prop="level"
              label="等级"
              width="80">
            </el-table-column>
            <el-table-column
              sortable
              width="120"
              prop="user.type"
              label="会员类型">
              <template slot-scope="scope">
                <span v-if="scope.row.user.type === 'wechat'">微信</span>
                <span v-if="scope.row.user.type === 'alipay'">支付宝</span>
                <span v-if="scope.row.user.type === null">无</span>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              prop="user.gender"
              label="性别"
              width="80">
              <template slot-scope="scope">
                <span v-if="scope.row.user.gender === 'male'">男</span>
                <span v-if="scope.row.user.gender === 'female'">女</span>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              prop="sale"
              label="享受优惠"
              width="110">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="showCouponMsg(scope.$index, scope.row)">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              prop="createTime"
              label="创建时间"
              width="170">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="80">
              <template slot-scope="scope">
                <el-button @click.native.prevent="deleteMemberCoupon(scope.row)" type="text" size="small">
                  删除
                </el-button>
                <!--<el-button @click.native.prevent="editMemberCoupon(scope.row)" type="text" size="small">编辑</el-button>-->
              </template>
            </el-table-column>
          </el-table>
          <!--<el-button size="large" type="primary" icon="el-icon-plus" @click="addMember" class="control-button">添加会员</el-button>-->
        </template>
      </el-tab-pane>
      <!--<el-tab-pane label="会员设置" name="second">-->
        <!--<el-form>-->
          <!--<el-form-item label="会员收藏类型" prop="region">-->
            <!--<el-select v-model="memberSetting.newMemberCollectType" placeholder="请选择会员收藏类型">-->
              <!--<el-option label="类型一" value="shanghai"></el-option>-->
              <!--<el-option label="类型二" value="beijing"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="会员价格状态" prop="delivery">-->
            <!--<el-switch v-model="memberSetting.memberPriceStatus"></el-switch>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="会员积分状态" prop="delivery">-->
            <!--<el-switch v-model="memberSetting.memberScoreStatus"></el-switch>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
        <!--<el-button class="control-button" type="primary" @click="saveMemberSetting">保存</el-button>-->
      <!--</el-tab-pane>-->
    </el-tabs>

    <el-dialog title="增加会员" :visible.sync="showFormMember" top="10vh">
      <el-form :model="memberForm" :label-width="formLabelWidth">
        <el-form-item label="会员名" >
          <el-input
            autofocus="true"
            v-model="memberForm.name"
            auto-complete="off"
            @keyup="onkeyup(e)"
            placeholder="请输入会员名"></el-input>
        </el-form-item>
        <el-form-item label="金额">
          <el-input
            v-model.number="memberForm.money"
            auto-complete="off"
            placeholder="请输入金额"></el-input>
        </el-form-item>
        <el-form-item label="消费次数">
          <el-input
            v-model.number="memberForm.times"
            auto-complete="off"
            placeholder="请输入次数"></el-input>
        </el-form-item>
        <el-form-item label="状态" style="text-align: left">
          <el-select
            style="display: inline-block"
            v-model="memberForm.status"
            placeholder="请选择状态">
            <el-option label="可用" value="enable"></el-option>
            <el-option label="不可用" value="disable"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="memberForm.remark" auto-complete="off" placeholder="请输入备注"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showFormMember = false;">取 消</el-button>
        <el-button type="primary" @click="addMemberConfirm">确定</el-button>
        <el-button v-if="discountMemberEdit === 1" type="primary" @click="updateMemberConfirm">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'printer',
  data:() => ({
    activeName: 'first',
    showFormMember:false,
    loading:false,
    memberTable:[],
    screenHeight: document.body.clientHeight,
    memberForm:{},
    formLabelWidth:'80px',
    memberSetting:{},
    discountMemberEdit: 0 ,
  }),
  methods: {
    showCouponMsg(index,row){
      let data = [{
        feild:'uid',
        value:row.uid,
        joinType:'eq'
      }]
      let msg = ''
      this.$request(this.url.userCouponComplexPageQuery,'json',data).then((res)=>{
        let response = res.data.data

        for(let i=0; i<response.length; i++){
          console.log(response[i]);
          msg +='<p><span>'+response[i].discountCoupon.name +'</span>'+ '<span style="margin-left: 20px">持有数量：'+response[i].num+'</span>'+'</p>'
        }
        this.$alert(msg, '优惠信息', {
          dangerouslyUseHTMLString: true
        });
      })


    },
    deleteMemberCoupon(row){
      this.$confirm('此操作将永久删除该会员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$request(this.url.memberDelete,'json',{id:row.id}).then((res)=>{
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        })
        this._pullMember()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    editMemberCoupon(row){
      this.memberForm = row
      this.discountMemberEdit = 1
      this.showFormMember = !this.showFormMember
    },
    addMember(){
      this.memberForm = {}
      this.discountMemberEdit = 0
      this.showFormMember = !this.showFormMember
    },
    addMemberConfirm(){
      this.couponForm.tid = 1000000000
      let data =  this.memberForm
      this.$request(this.url.memberAdd,'json',data).then((res)=>{
        this.$message({
          type: 'success',
          message: '添加成功!'
        });
        this._pullMember()
      }).catch((err)=>{
        console.log(err);
      })
      this.showFormMember = !this.showFormMember
    },
    updateMemberConfirm(){
      let data =  this.memberForm
      this.$request(this.url.memberUpdate,'json',data).then((res)=>{
        console.log(res);
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
        this._pullMember()
      }).catch((err)=>{
        console.log(err);
      })
      this.showFormMember = !this.showFormMember
    },
    _pullMember(){
      let data = [
        {
          feild:'status',
          value:'enable',
          joinType:'eq'
        }
      ]
      this.$request(this.url.memberComplexPageQuery,'json',data).then((res)=>{
        console.log(res);
        this.memberTable = res.data.data
        // console.log(this.memberTable,'111111111');
      })
    },
    _pullMemberSetting(){
      // this.$request(this.url.memberSettingComplexPageQuery,'json',[]).then((res)=>{
      //   this.memberSettingUpdate = res.data.data[0]
      //   console.log(this.memberSettingUpdate);
      // })
    },
    saveMemberSetting(){
      let data = this.memberSetting
      this.$request(this.url.memberSettingUpdate,'json',data).then((res)=>{
        this.$message({
          type: 'success',
          message: '保存成功!'
        });
        this._pullMemberSetting()

      }).catch((err)=>{
        console.log(err);
        this.$message({
          type: 'info',
          message: '保存失败'
        });
      })
    }
  },
  created(){
    this._pullMemberSetting()
    this._pullMember()
    if (200 < this.screenHeight&& this.screenHeight < 380) {
      this.$store.state.tableHeight = 260
    }if (380 < this.screenHeight && this.screenHeight < 770){
      this.$store.state.tableHeight = 555
    }if (770 < this.screenHeight){
      this.$store.state.tableHeight = 750
    }
  }

}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
