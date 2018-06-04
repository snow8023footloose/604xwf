
//通用

addDishes(){
  let data = this.dishes

  this.$request(this.url.dishes1,'json',data).then((res)=>{
    this.$message({
      type: 'success',
      message: '数据提交成功!'
    });
    // this.dishesDataTable.push(data);
    console.log(res);
  }).catch((err)=>{
    this.$message({
      type: 'info',
      message: '数据提交失败!'
    });
    console.log(err);
  })
},



//添加
addDishes(formName1,formName2){
  console.log(formName1);
  console.log(formName2);

  this.$refs[formName1].validate((valid) => {
    if (valid) {
      this.dialogFormVisibleGoodsPlus = !this.dialogFormVisibleGoodsPlus
      this.$request(this.url.dishes1,'json',data).then((res)=>{
        this.$message({
          type: 'success',
          message: '数据提交成功!'
        });
        this.dishesDataTable.push(data);
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


//删除
deleteDishes (row,index) {
  let data = {
    id:row.id
  }
  this.$confirm('是否删除该菜品?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    this.$request(this.url.dishes3,'form',data).then((res)=>{
      this.$message({
        type: 'success',
        message: '数据提交成功!'
      });
      this.dishesDataTable.splice(index,1)
    }).catch((err)=>{
      this.$message({
        type: 'info',
        message: '数据提交失败!'
      });
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


//修改
editDishes (row,index) {
  this.dishes = Object.assign({},row);
  this.dishesIndex = index;
  // to  updateDishes
},
updateDishes(){
  console.log('2222222222');
  let index = this.dishesIndex
  let updateObj = {
    id:this.dishes.id
  }
  for(let key in this.dishes){
    if(this.dishes[key] === this.dishesDataTable[index][key]){
      continue;
    }
    updateObj[key] = this.dishes[key];
  }
  console.log(updateObj);

  this.$request(this.url.dishes4,'json',updateObj).then((res)=>{
    this.$message({
      type: 'success',
      message: '数据提交成功!'
    });
    this.dialogFormVisibleGoodsPlus = !this.dialogFormVisibleGoodsPlus
  }).catch((err)=>{
    this.$message({
      type: 'info',
      message: '数据提交失败!'
    });
    console.log(err);
  })
},

//查询
_pullTable(){
  var Data = [
    {
      feild: 'time',
      value: '',
      joinType: 'time'
    }
  ]
  this.$request(this.url.dishes2,'json',Data).then((res)=>{
    let response = res.data.data
    this.dishesDataTable = response
    console.log(response);
  }).catch((err)=>{
    console.log(err);
  })
},

var date = [
  {
    feild: 'time',
    value: '',
    joinType: 'time'
  },
  // 获取所有时间

  {
    feild: 'status',
    value: 'enable',
    joinType: 'eq'
  },
  // 获取状态可用的

  {
    feild: 'cid',
    value: 'cid',
    joinType: 'eq'
  },
  //cid购物车

  {
    feild: 'page',
    value: '1',
    joinType: 'page'
  },
  //分页page


  {
    feild: 'pagesize',
    value: '1',
    joinType: 'pagesize'
  },
  //分页pagesize

  {
    feild: 'startTime',
    value: '2018-4-21',
    joinType: 'startTime'
  },
  //开始时间

  {
    feild: 'endTime',
    value: '2018-4-21',
    joinType: 'endTime'
  },
  //结束时间

  {
    feild:'like',
    value:'string',
    joinType: 'like'
  },

]

// between like   >gt   <lt   >= ge  <=le

// 数组操作
// 第二：合并数组 concat

// 方法如下：

var arr1=['w','e','s'];

var arr2=['e','y','u'];
var arr3=arr1.concat(arr2);
console.log(arr3)
//['w','e','s''e','y','u'];
// maximum call stack size exceeded


// 第三：数组变为字符串格式 join

// 方法如下：

var arr1=['w','e','s'];

var arr4=arr1.join()
console.log(arr4)
//w,e,s


// 第四：删除最后一个元素,针对老数组是删除最后一个,针对新数组是返回最后一个  pop

var arr6=["d","s","t"];
var arr7=arr6.pop();
console.log(arr6)
// ["d","s"];
console.log(arr7);
// t


// 第五：添加最后一个元素，针对老数组最后一个元素后面添加一个元素，新数组返回元素个数   push

var arr8=["i","u","t"];

var arr9=arr8.push("k");

console.log(arr8);
//["i","u","t","k"];

console.log(arr9);
// 4


// 第六：shift() 和pop()一样，不同的是操作的是开头删除的元素shift（）；具体操作不在展示
// 第七：unshiift()和push一样，不同的是操作的是开头添加的元素unshift（）；具体操作不再展示


// 第八：反转数组  reverse

// 方法如下：

var arr1=['w','e','s'];

var arr10=arr1.reverse()

console.log(arr10)
//['s','e','w'];


// 第九：数组排序 sort  a-b正向    b-a 反向正向

var arr11=[3,1,5,8,28]
var arr12=arr11.sort(function  (a,b) {
  return a-b;
})
console.log(arr12)
//[1,3,5,8,28];

// 反向

var arr13=arr11.sort(function  (a,b) {
  return b-a;
})
console.log(arr13)
//[28,8,5,3,1]


// 第十：数组截取 数组截取的方法主要有slice 和splice，
// 字符串截取的方法主要有substr 和substring

// （1）slice 使用方法arr.slice(m,n);
// 其中arr为数组，m，n为两个参数，意思是从已有数组中返回选定的元素，
// 截取位置均为下标，其中m必须，为起始位置，可以为负值，n为结束位置（截取位置并不包含）。

// 示例如下：

// ①只有起起始值，并且为正，默认的从起始位置一直到整个数组结束，起始下标从0开始

var arr=[2,3,5,6,8,9]
var arr1=arr.slice(1)
console.log(arr)
// [2,3,5,6,8,9] 老
// 数组是没有变化的，下面不在列举，都是一样的
console.log(arr1)
//[3,5,6,8,9]
// 只有起始参数，并且为正值，返回新数组从下标1开始截取

// ②只有起始值，并且为负，默认的是从起始位置一直到整个数组结束，
// 此处没有起始值，数组的最后一个下标是-1，比如此例，如果从-6开始取，必定是整个数组

var arr=[2,3,5,6,8,9]
var arr1=arr.slice(-1)
console.log(arr1)
//[9] 只有起始参数，并且为负值，从数组尾部截取元素

// ③有起始值和结束值，并且为正，此处需注意下标是从小到大，
// 比如你（3，1）肯定是取不到值的，另外截取的下标个数并不包含最后一个下标

var arr=[2,3,5,6,8,9]
var arr1=arr.slice(1,4)
console.log(arr1)
//[3,5,6]
// 此时是从下标1开始到下标4，但是需要注意的是并不包含下标4，准确的说是1-3的下标

// ④有起始值和结束值，并且为负，此处需注意下秒也是从小到大，
// 同理，比如（-1，-6）也是肯定取不到值的，另外截取的下标个数也并不包含最后一个下标

var arr=[2,3,5,6,8,9]
var arr1=arr.slice(-6,-1)
console.log(arr1) //[2,3,5,6,8]

// ⑤有起始值和结束值，并且正负都有

// 负值到0

var arr=[2,3,5,6,8,9]
var arr1=arr.slice(-1,0)

//刚刚都看到了，数组下标都是从小到大的，所以说如果正负都有的情况下，
// 理论上应该可以取值的，比如这个例子，-1为9的小标，0为2的下标，所以取值应该为  [9]，但是结果并不是这样的
console.log(arr1)
//[ ]
// 从这里可以看出他的结果是为空的，所以从负值到0结果是取不到的

// 负值到正直

var arr=[2,3,5,6,8,9]

var arr1=arr.slice(-1,2)

//那从负值到正值呢，同样也是取不到值的

console.log(arr1)
//[ ]

// 正直到负值

var arr=[2,3,5,6,8,9]

var arr1=arr.slice(2,-1)

//那从正直到负值，这个理论上是取不到的，但是看下结果

console.log(arr1) //[ 5，6，8]  从结果可以看出是可以取的 原理是2的下标为5，-1的下标为9，不包含结束位置下标

// 总结：这个方法看着可能会麻烦些（也可能被我写的麻烦啦），比如正到负等，
// 不知道大家都是怎么操作，我一般用这个取值都是只截取正的，所以这个实际操作还是非常简单的。

                                                                                              // 总结  双正负增单则减  原数组不变
// （2）splice 像数组中添加或者删除元素
// arr.splice(m,n,index,index1,...,indexx) m是起始位置，n是删除元素的个数，i
// ndex是要添加的元素，在不添加元素的前提下，只有第一个参数是必须的，后面两个都不是必须的，在需要添加元素的情况下，三个元素都是必须的，此方法和slice是不一样的，这个返回的是被删除的元素
// 示例如下：

// 只删除不添加

// 注意看此例，是（1，2）删除两个，如果是（1，0），
// 则表示删除零个，也就是不删除的意思，如果只有一个参数则表示从这里开始删除，比如是（1）则为[2]，
// 当然这个也是可以取负值，但是这个和slice是不一样的，只能起始位置取负值，因为删除的个数不可能为负值，
// slice可以取（2，-1），这个就截然不同啦，但是刚刚也说啦，slice是不可以起始位置取负值，结束位置取正的，
// 但是这个是可以的，比如（-1，0）则表示从-1开始删除零个，结果为[2,3,5,6,8,9]，（-6，2),结果为[5,6,8,9]，
// 另外这个删除的第二个值如果写的过大，也只是删除从本下标到最后一个，比如（2，78）为[2,3]

var arr=[2,3,5,6,8,9]
var arr1=arr.splice(1,2)
console.log(arr)
// [2,6,8,9] 注意看此处才是我们要的数组，从下标1开始删除删除两个
console.log(arr1)
//[3,5] 此处是我们删除掉的数组

// 删除加添加 具体的和上面的差不多，主要添加了添加元素的效果，这个也可以添加多个元素

var arr=[2,3,5,6,8,9]
var arr1=arr.splice(1,2,"il")
console.log(arr)
//[2,"li",6,8,9]
console.log(arr1)
//[3,5]

// 总结：此方法用的时候，一般也都是只取正值

// （3）substr 这个是字符串的用法 用法arr.substr(m,n) m必选也可以负值 n选填，注意看这个并不是结束为止而是截取的个数

// 示例如下：

// 只有一个参数 默认从此下标开始，取后面所有的

// 正值

var arr="sdhgfhf"
var arr1=arr.substr(1)
console.log(arr)
// "sdhgfhf"这个是不变的，下面不再列举
console.log(arr1)
// "dhgfhf" 从下标1开始取后面所有的

// 负值

var arr="sdhgfhf"
var arr1=arr.substr(-2)
console.log(arr1)
// "hf" 从下标-2开始取后面所有的

// 两个参数，从第一个下标开始，截取到下标2的长度

var arr="sdhgfhf"
var arr1=arr.substr(1，3)
console.log(arr1)
// "dhg" 从下标1开始取后面所有的 同理如果为负值，比如（-6，3）则为"hjf";后面的始终为长度

// 总结：此方法需注意不要和数组的混淆，这个是截取长度的

// （4）substring  用法arr.substring(m,n) 两个参数，m必须，起始位置 ，n选填，
// 截取下标的结束位置，此用法和上面slice有点类似，但是需要注意的是此方法是不支持负值的

// 示例如下：

// 只有一个参数

var arr="sdhgfhf"
var arr1=arr.substring(1)
console.log(arr1)
//"dhgfhf"从下标1开始取后面所有的

// 两个参数

var arr="sdhgfhf"
var arr1=arr.substring(1,3)
console.log(arr1)
// "dh"从下标1开始截取到下标3，但是不包含3

// 总结：此方法不支持负值，只针对下标来截取的
