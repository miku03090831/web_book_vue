<template>
    <div class="AddFile">
        <div class="fileProm">请选择文件</div>
        <form  action="">
          <input type="file" accept=".csv" id="csvfile" name="content" v-on:change="failList=[]">
        </form>

        <el-button type="primary" @click="onSubmit">导入</el-button>
        <el-table
          :data="failList"
          stripe
          style="width: 100%"
          max-height="300">
          <el-table-column
            prop="title"
            label="书名"
            width="300">
          </el-table-column>
          <el-table-column
            prop="reason"
            label="失败原因">
          </el-table-column>
        </el-table>  

    </div>
</template>

<script>
export default {
  name: 'AddForm',
  components: {
  },
  data(){
    return {
      fileName:"",
      failList:[],
    }
  },
  methods:{
    load () {
        this.count += 2
    },
    onSubmit(){
      let form = document.getElementById('csvfile').files[0]
      let formdata = new window.FormData();
      formdata.append('addfile',form)
      console.log(form)
      console.log(formdata.get('addfile'));
      // this.$axios.post("api/AddFile",this.fileName).then(res=>{
      //   console.log(res)
      // })
      var options = {  // 设置axios的参数
         url: 'api/AddFile',
         data: formdata,
         method: 'post',
         headers: { 
          'Content-Type': 'multipart/form-data'
         }
    }
    this.$axios(options).then((res) => {
      this.$message({message:"导入完毕，下面是失败名单",type:"success"})
      this.failList = res.data;
    }).catch(()=>{
            this.$message({message:"文件错误，请检查文件格式",type:"error"})
        }) // 发送请求
    },
    
  },  
 
}
</script>
<style scoped>

</style>