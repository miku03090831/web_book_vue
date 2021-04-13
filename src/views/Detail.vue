<template>
  <div class="detail">
      <div class="test">
          这是第{{this.Book.id}}本书的详情页
      </div>
  </div>
</template>

<script>


export default {
  name: 'Detail',
  components: {
  },
  data(){
      return {
          id: this.$route.query.id,
          Book:{
            id:"",
            title:"",
            author:"",
            recommend:"",
            price:"",
            pic_refs:""
          }
      }
  },
  created(){
      this.$axios.post("api/SearchBook",{
          'keyword':this.id,
          'type': 3
        }).then(res=>{
          this.Book=res.data[0]
          console.log("这是第"+this.Book.id+"本书的详情页")
        }).catch(()=>{
            this.$message({message:"书本不存在或未登录",type:"error"})
        })
  }
}
</script>

<style scoped>

</style>
