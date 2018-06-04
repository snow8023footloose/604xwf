<template>
  <div class="upLoad">
    <div class="file" :id="name" v-if="uploadRefresh">
      <el-button  plain style="opacity: 0.5" size="small" icon="el-icon-upload" circle></el-button>
      <input type="file" :accept="typeArr" @change="upload($event)">
    </div>
  </div>
</template>
<script>
  export default{
    props: ['typeArr', 'size', 'name', 'target'],
    data(){
      return {
        client: '',
        fileSize: 5000000,
        imgUrl: window.url,
        uploadRefresh:true,
      }
    },
    methods: {
      upload(event){
        var name = this.name + this.getUID()
        var _this = this
        var file = event.target.files[0];
        var storeAs = name;
        if (this.size) {
          this.fileSize = this.size;
        }     //命名
        let data = {
          name: 'zhangsan'                                                        //传送id，请求密钥
        }
        this.uploadRefresh = false
        this.uploadRefresh = true

        this.$request(this.url.ali,'form',data).then((res)=>{
          var res = res.data
          this.$message({
            type: 'success',
            message: '数据提交成功!'
          });
          this.client = new OSS.Wrapper({
            accessKeyId: res.data.accessKeyId,
            accessKeySecret: res.data.accessKeySecret,
            stsToken: res.data.securityToken,
            endpoint: res.data.endpoint,
            bucket: res.data.bucket
          });                                                                     //得到密钥
          this.client.multipartUpload(storeAs, file).then(function (result) {
            // console.log(result,'成功555555555')                                             //至此就拿到了返回的路径
            var curUrl = result.res.requestUrls[0];
            var arrUrl = curUrl.split('?');
            const finalUrl = arrUrl[0];
            // this.picReceive = finalUrl
            // 处理闭包，通过window得到finalUrl
            //更新到dom
            _this.$emit('ToUrl',{finalUrl,name})

            var oDiv = document.getElementById(_this.name)
            console.log(finalUrl);
            oDiv.style.background = 'url('+ finalUrl +') no-repeat center center'
            oDiv.style.backgroundSize = '100% auto'

          }).catch(function (err) {
            console.log(err);                                                     //没有上传到ali
          });
          // console.log(this.client);
        }).catch((err)=>{
          this.$message({
            type: 'info',
            message: '数据提交失败!'                                                 //没有请求到密钥
          });
          console.log(err);
        });
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .file
    position: relative
    left: .26rem
    top: .2rem
    display: inline-block
    background: rgba(68, 138, 255, 0.11)
    border: 1px solid #99D3F5
    border-radius: 4px
    padding: 4px 12px
    overflow: hidden
    text-decoration: none
    text-indent: 0
    line-height: 20px
    color black
    margin-bottom 5px
    input
      position: absolute
      font-size: 100px
      right: 0
      top: 0
      opacity: 0
    #el-butt
      color black
      text-align center
      font-size 16px
      i
        font-size 16px
</style>
