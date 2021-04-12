<template>
  <div class="Modify">
    <div class="select">
        <span>请输入要修改的图书的编号</span>
        <el-input v-model="bookNum" clearable placeholder=""></el-input>
        <el-button type="primary" @click="select">确定</el-button>
    </div>  

    <div class="modify">
      <div class="beforeModify">
        <el-card class="beforeMod">
          <div slot="header" class="header">
            <span>修改前</span>
          </div>
          <div class="key1">书名
            <el-input v-model="beforeBook.title" :disabled="true"></el-input>
          </div>
          <div class="key2" >作者
            <el-input v-model="beforeBook.author" :disabled="true"></el-input>
          </div>
          <div class="key3">好评度
            <el-input v-model="beforeBook.recommend" :disabled="true"></el-input>
          </div>
          <div class="key4">价格
            <el-input v-model="beforeBook.price" :disabled="true"></el-input>
          </div>
          <div class="key5">图片链接
            <el-input v-model="beforeBook.pic_refs" type="textarea" :disabled="true"></el-input>
          </div>
        </el-card>
      </div>
      <div class="afterModify">
        <el-card class="afterMod">
          <div slot="header" class="header">
            <span>修改后</span>
          </div>
          <div class="key1">书名
            <el-input v-model="afterBook.title" :value="beforeBook.title"></el-input>
          </div>
          <div class="key2" >作者
            <el-input v-model="afterBook.author" ></el-input>
          </div>
          <div class="key3">好评度
            <el-input v-model="afterBook.recommend"></el-input>
          </div>
          <div class="key4">价格
            <el-input v-model="afterBook.price"></el-input>
          </div>
          <div class="key5">图片链接
            <el-input v-model="afterBook.pic_refs" type="textarea"></el-input>
          </div>
        </el-card>
      </div>
    </div>

    <div class="submit">
      <el-button type="warning" @click="submitChange">提交修改</el-button>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Modify',
  components: {
  },
  data(){
    return {
      bookNum:"",
      beforeBook:{
        id:"",
        title:"",
        author:"",
        recommend:"",
        price:"",
        pic_refs:""
      },
      afterBook:{
        id:"",
        title:"",
        author:"",
        recommend:"",
        price:"",
        pic_refs:""
      }
    }
  },
  methods:{
    select(){
        this.$axios.post("api/SearchBook",{
          'keyword':this.bookNum,
          'type': 3
        }).then(res=>{
          console.log(res.data[0])
          this.beforeBook=res.data[0]//在此处发起请求，更改unpagedBookInfo的值
          this.afterBook= JSON.parse(JSON.stringify(this.beforeBook));
        })
        // console.log(this.beforeBook)
        // this.beforeBook={title:"123",author:"456",recommend:"789",price:"1234",pic_refs:"123234"}
        //通过对象深拷贝，使得默认情况下修改后和修改前相同。用户只需用去修改想改的某个属性即可，而不修改的属性不用重新填写
        
    },
    submitChange(){
      this.$axios.post("api/UpdateBook",this.afterBook).then(res=>{
        this.$alert(res.data,'网页提示',{
          confirmButtonText:'确定'
        })
      }
      //   this.$alert(res.data,'网页提示',{
      //    confirmButtonText:'确定'
      //  })
      )
    }
  }
 
}
</script>

<style scoped>
.select{
  margin: 30px auto 50px;
  padding: 10px 20px;
  background-color: rgba(122,126,131,0.5);
}

.select span{
  width: 200px;
}

.select .el-input{
  display: inline-block;
  width: 400px;
  margin:0 20px;
}

.modify{
  position: relative;
  margin-top: 30px;
  width: 100%;
}
.beforeModify{
  position: absolute;
  top: 20%;
  left: 0%;
  width: 40%;
}

.afterModify{
  position: absolute;
  top: 20%;
  right: 5%;
  width: 40%;
}

.submit{
  margin-top: 65% ;
  margin-left: 40%;
  width: 98px;
}

.key1,
.key2,
.key3,
.key4,
.key5{
  margin-bottom: 5px;
}

</style>