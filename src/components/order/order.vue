<template>
  <div class="order">

    <el-tabs
      v-model="activeName"
      show-summary
    >
      <el-tab-pane label="历史订单" name="first">
        <template>
          <el-table
            v-loading="loading"
            :data="userOrderTable"
            :summary-method="getSummaries"
            show-summary
            style="width: 100%"
            :height="$store.state.tableHeight-35"
          >
            <el-table-column type="expand" fixed="left">
              <template slot-scope="props" style="width: 20%">
                <div v-for="item in props.row.orderDishes" style="display: flex;margin: 10px 0px">
                  <span style="width: 10%;padding-left: 30px">
                    {{ item.dishes.name }}：</span>
                  {{item.skus}}
                  <span style="width: 8%"><i class="el-icon-close"></i>{{ item.num }}</span>
                  <span style="width: 30%">
                    <span v-for="tag in item.tags">
                      {{ tag.name }}/
                      <span v-if="tag.price">{{ tag.price.toFixed(2) }} ￥</span>
                      <span v-else="tag.price">0.00 ￥</span>,&nbsp;&nbsp;&nbsp;
                    </span>
                  </span>
                  <span style="width: 8%">{{ item.totalPrice.toFixed(2) }} ￥</span>
                </div>

                <!--<el-button style="margin: 5px 0px 5px 30px" size="mini" type="primary" plain round>{{props.row.table.name}}&nbsp;/&nbsp;{{props.row.table.num}}</el-button>-->
              </template>
            </el-table-column>
            <el-table-column
              sortable
              fixed="left"
              prop="id"
              label="订单编号"
              width="160"
            >
            </el-table-column>
            <el-table-column
              sortable
              prop="tid"
              label="餐桌"
              width="130"
              :filters="filterTableArr"
              :filter-method="filterTable"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <span v-for="item in filterTableArr" v-if="scope.row.tid === item.value">{{item.text}}</span>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              width="130"
              prop="payType"
              label="支付方式"
              :filters="[{text:'微信支付',value:'wechat-online'},{text:'支付宝支付',value:'alipay-online'},{text:'线下支付',value:'underline'}]"
              :filter-method="filterPayArr"
              filter-placement="bottom-end"
            >
              <template slot-scope="props">
                <span v-if="props.row.payType === 'wechat-online'">微信支付</span>
                <span v-if="props.row.payType === 'alipay-online'">支付宝支付</span>
                <span v-if="props.row.payType === 'underline'">线下支付</span>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              width="130"
              prop="orderType"
              label="订单类型"
              :filters="[{text:'单人点餐',value:'single'},{text:'多人点餐',value:'multi'}]"
              :filter-method="filterOrderTypeArr"
              filter-placement="bottom-end"
            >
              <template slot-scope="props">
                <span v-if="props.row.orderType === 'single'">单人点餐</span>
                <span v-if="props.row.orderType === 'multi'">多人点餐</span>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              prop="needPay"
              label="应付金额"
              width="110">
              <template slot-scope="props">
                {{props.row.needPay.toFixed(2)}}
              </template>
            </el-table-column>
            <el-table-column
              sortable
              width="110"
              prop="realPay"
              label="实付金额">
              <template slot-scope="props">
                {{props.row.realPay.toFixed(2)}}
              </template>
            </el-table-column>
            <el-table-column
              sortable
              width="120"
              prop="discountMoney"
              label="优惠金额">
              <template slot-scope="props">
                {{props.row.discountMoney.toFixed(2)}}
              </template>
            </el-table-column>
            <el-table-column
              sortable
              width="170"
              prop="createTime"
              label="下单时间">
            </el-table-column>

            <!--<el-table-column-->
              <!--sortable-->
              <!--width="120"-->
              <!--prop="rating"-->
              <!--label="退款金额">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--sortable-->
              <!--width="120"-->
              <!--prop="discountType"-->
              <!--label="打折类型">-->
            <!--</el-table-column>-->

            <!--<el-table-column-->
              <!--sortable-->
              <!--width="150"-->
              <!--prop="thirdPartCode"-->
              <!--label="第三方code">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--sortable-->
              <!--width="150"-->
              <!--prop="thirdPartName"-->
              <!--label="第三方名称">-->
            <!--</el-table-column>-->
          </el-table>
          <div class="filter">
            <!--<el-button type="success" @click="resetFilters" icon="el-icon-refresh" circle></el-button>-->

            <el-date-picker
              style="margin: 10px 20px 0px 10px"
              v-model="filterOrderDate"
              type="daterange"
              align="right"
              unlink-panels
              @change="filterDateTypeFun"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>

          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

  const ERR_OK = 0
  export default {
    name: 'New',
    data:() => ({
      currentPage1:5,
      activeName: 'first',
      screenHeight: document.body.clientHeight,
      userOrderTable:[],
      filterTableArr:[],
      loading: true,
      filterOrderDate:'',
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
            picker.$emit('pick', [start, end]);
          }
        },

          {
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }),
    methods: {
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        let num = 0
        columns.forEach((column, index) => {
          if (index === 1) {
            sums[index] = '总计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (index === 2) {
            sums[index] = data.length + '条';
            return;
          }
          if (1 < index && index < 4) {
            sums[index] = '';
            return;
          }else if(index > 6){
            sums[index] = '';
            return;
          }

          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = sums[index].toFixed(2) + '元';
          } else {
            sums[index] = '';
          }
        });
        return sums;
      },
      resetFilters(){
        this.filterOrderDate = ''
        this._pullUserOrder()
      },
      filterTable(value, row) {
        return row.tid === value;
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
          let response = res.data.data
          for(let i=0;i<response.length;i++){
            this.filterTableArr.push({
              text:response[i].name,
              value:response[i].id
            })
          }
        }).catch((err)=>{
          console.log(err);
        })
      },
      filterDateTypeFun(){
        this.filters =[]
        // console.log('filterDateTypeFun',this.filterOrderDate);
        let year0 = this.filterOrderDate[0].getFullYear()
        let year1 = this.filterOrderDate[1].getFullYear()

        let month0 = this.filterOrderDate[0].getMonth()+1
        let month1 = this.filterOrderDate[1].getMonth()+1

        let day0 = this.filterOrderDate[0].getDate()
        let day1 = this.filterOrderDate[1].getDate()

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
        let startTime = year0+ '-'+month0+ '-'+day0
        let endTime = year1+ '-'+month1+ '-'+day1

        let  data =[
          {
            feild:'createTime',
            value: startTime + " " + '00:00:00',
            joinType:'gt'
          },
          {
            feild:'createTime',
            value: endTime + " " + '00:00:00',
            joinType:'lt'
          },
        ]
        this.$request(this.url.userOrder,'json',data).then((res)=>{
          this.userOrderTable = res.data.data
        }).catch((err)=>{
        })
      },

      filterPayArr(value,row){
        return row.payType === value;
      },
      filterOrderTypeArr(value,row){
        return row.orderType === value;
      },
      _pullUserOrder(){
        // let data = [
        //   {
        //     feild:'time',
        //     value: '',
        //     joinType:'time'
        //   }
        // ]
        let data = [
          {
            feild:'',
            value:1,
            joinType:'page'
          },
          {
            feild:'',
            value:5,
            joinType:'pagesize'
          }
        ]
        this.$request(this.url.userOrder,'json',data).then((res)=>{
          let response = res.data.data
          this.userOrderTable = response
          this.loading = false
        }).catch((err)=>{

        })
      }
    },
    created() {
      this._pullUserOrder()
      this._pullTable()
      if (200 < this.screenHeight&& this.screenHeight < 380) {
        this.$store.state.tableHeight = 260
      }if (380 < this.screenHeight && this.screenHeight < 810){
        this.$store.state.tableHeight = 480
      }if (810 < this.screenHeight){
        this.$store.state.tableHeight = 710
      }
    },
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

  .el-pagination
    margin 5px
  .demo-table-expand
    font-size: 0
    label
      width: 90px
      color: #99a9bf
    .el-form-item
      margin-right: 0
      margin-bottom: 0
      width: 50%


  .cell
    text-align center



  .el-table-filter
    left 99px


  .filter
    position absolute
    width 400px
    left 50%
    margin-left -150px
</style>
