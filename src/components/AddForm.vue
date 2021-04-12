<template>
  <div class="AddForm">
    <el-form :model="book" ref="addForm" label-width="100px" class="addForm">
      <el-form-item label="图书名称:">
        <el-input v-model="book.title"></el-input>
      </el-form-item>
      <el-form-item label="作者:">
        <el-input v-model="book.author"></el-input>
      </el-form-item>
      <el-form-item label="好评度:">
        <el-input v-model="book.recommend"></el-input>
      </el-form-item>
      <el-form-item label="价格:">
        <el-input v-model="book.price"></el-input>
      </el-form-item>
      <el-form-item label="图片链接:">
        <el-input v-model="book.pic_refs"></el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="onSubmit" >添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>


export default {
  name: 'AddForm',
  components: {
  },
  data(){
    return {
      book:{
        title:"",
        author:"",
        recommend:"",
        price:"",
        pic_refs:""        
      }
    }
  },
  methods:{
    onSubmit(){
      //console.log(this.book);
      //axios异步添加，成功后弹出提示
      this.$axios.post("api/Addone",this.book).then(res=>{
        console.log(res.data)
        this.$alert(res.data,'网页提示',{
         confirmButtonText:'确定'
       })
      })
       
    }
  }
 
}
</script>

<style scoped>


</style>

