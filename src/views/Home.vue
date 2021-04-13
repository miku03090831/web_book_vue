<template>
  <div class="Home">
    <!--左侧边栏 -->
    <div class="leftMenu"> 
      <span class="title">功能选择</span>
      <Menu @functionChanged="change_func"></Menu>     
      <el-tooltip placement="top" class="tip">
        <div slot="content">
          <span>添加书籍：点击图书入库，并选择单本入库或者批量入库</span><br>
          <span>搜索书籍：点击查找图书，并选择查找采用的字段</span><br>         
          <span>删除书籍：先搜索，再删除。在搜索的结果中，选中要删除的书籍，并点击删除</span>
        </div>
        <el-button>查看使用说明</el-button>
      </el-tooltip>
    </div>

    <!-- 右侧组件 -->
    <div class="rightArea">
      <div class="modifyPart" v-if="modVis">
        <Modify></Modify>
      </div>
      <div class="Add2Part" v-if="add2Vis">
        <AddFile></AddFile>
      </div>
      <div class="Add1Part" v-if="add1Vis">
        <AddForm></AddForm>
      </div>
      <div class="searchPart" v-if="pTableVis">
        <div class="search_condi">
          <span class="searchProm" style="width:96px">{{ searchPrompt }}</span>
          <SearchInput ref="searchInput"></SearchInput>
          <el-button @click="search" class="search">查找</el-button>
        </div>
        
        <div class="search_result">
          <PagedTable :tableData=unpagedBookInfo :nums=unpagedBookInfo.length :query=searchQuery  @searchAgain="searchAgain" ref="pTable"></PagedTable>
        </div>
      </div>
    </div>

  </div>
</template>



<script>

import Menu from "../components/Menu";  //../components/Menu.vue会标红。。。应该是bug
import PagedTable from "../components/PagedTable";
import SearchInput from "../components/SerachInput";
import AddForm from "../components/AddForm";
import AddFile from "../components/AddFile";
import Modify from "../components/Modify";
export default {
  name: 'Home',
  components: {
    Menu,
    PagedTable,
    SearchInput,
    AddForm,
    AddFile,
    Modify
  },
  data(){
    return {
      func_num: 4,
      unpagedBookInfo:[],
      pTableVis: true,
      add1Vis:false,
      add2Vis:false,
      modVis:false,
      searchQuery:"",
    }
  },
  computed:{
    searchPrompt: function(){
      if(this.func_num===3){
        return "请输入书号"
      }
      else if(this.func_num===4){
        return "请输入书名"
      }
      else{
        return "请输入作者名"
      }
    }
  },
  mounted(){
      // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
      window.onbeforeunload = function (e) {
        var storage = window.localStorage;
        storage.removeItem('login')
      }
    },
  methods:{
    searchAgain(query){
      console.log(query);
      this.$refs["pTable"].update=true;
      this.$refs["pTable"].currentPage=1;
      this.$axios.post("api/SearchBook",{
          'keyword':this.searchQuery,
          'type': this.func_num
        }).then(res=>{
          this.unpagedBookInfo=res.data//在此处发起请求，更改unpagedBookInfo的值
        })
    },
    search(){
      this.searchQuery = this.$refs['searchInput'].input;
      console.log(this.$refs['searchInput'].input)
      this.$refs["pTable"].update=true;
      this.$refs["pTable"].currentPage=1;
      this.$axios.post("api/SearchBook",{
          'keyword':this.searchQuery,
          'type': this.func_num
        }).then(res=>{
          this.unpagedBookInfo=res.data//在此处发起请求，更改unpagedBookInfo的值
        })
      // console.log(this.unpagedBookInfo)
    },
    change_func(flag){
      this.func_num = flag;
      // if(this.func_num===1||this.func_num===2||this.func_num===6){
      //   this.pTableVis = false;
      //   this.unpagedBookInfo =[]
      // }
      // else{
      //   this.pTableVis=true
      // }
      if(this.func_num===1){
        this.pTableVis=false;
        this.add1Vis=true;
        this.add2Vis=false;
        this.modVis=false;
        this.unpagedBookInfo=[];
      }
      else if(this.func_num===2){
        this.pTableVis=false;
        this.add1Vis=false;
        this.add2Vis=true;
        this.modVis=false;
        this.unpagedBookInfo=[];
      }
      else if(this.func_num===3 || this.func_num===4 || this.func_num===5){
        this.pTableVis=true;
        this.add1Vis=false;
        this.add2Vis=false;
        this.modVis=false;
      }
      else{
        this.pTableVis=false;
        this.add1Vis=false;
        this.add2Vis=false;
        this.modVis=true;
        this.unpagedBookInfo=[];
      }
      
    }
  }
}
</script>
<style>
/* 背景 */
.Home{
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../assets/bg.jpg") no-repeat center center;
  background-size: 100% 100%;
}

/* 左侧菜单样式 */
.leftMenu {
  width: 300px;
  height: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
  background-color: rgba(122,126,131,0.5);
}

.leftMenu .title {
  margin: 20px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  display: block;
  text-align: center;
}

.leftMenu .keyword{
  font-family: "Microsoft YaHei";
  font-size: 15px;
  margin-bottom: 10px;
}

.leftMenu .el-collapse-item__content {
  padding: 10px 10px 10px 40px;
  background-color: rgba(122,126,131,0.7);
  border-bottom: 2px solid rgb(90, 90, 90);
}

.leftMenu .el-collapse {
  border-top: 2px solid rgb(90, 90, 90);
}

.leftMenu .el-collapse-item__wrap{
  border: none;
}

.leftMenu .el-collapse-item__header {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 20px;
  text-indent: 40px;
  background-color: rgba(122,126,131,0.8);
  border-bottom: 2px solid rgb(90, 90, 90);
} 
.leftMenu .el-collapse-item__header i{ /*就很烦*/
  text-indent: 0px;
}

.leftMenu .tip{
  position: absolute;
  bottom: 5%;
  align-self: center;
}

/* 右侧区域样式 */
.rightArea{
  height: 100%;
  width: 800px;
  position: absolute;
  right: 10%;
}

/* 右侧搜索相关样式 */
.rightArea .search_condi{
  width: 80%;
  margin: 50px auto;
  background-color: rgba(122,126,131,0.5);
  padding: 20px 20px 10px 10px;
}

.search_condi .searchProm{
  display:inline-block;
  text-align: right;
  width:96px;
}

.search_condi .SearchInput{
  display: inline;
  margin-left: 30px;
}
.search_condi .el-button{
  display: block;
  text-align: center;
  margin: 20px auto 10px;
}

.search_condi .el-input{
  width: 60%;
  /* margin-left: 30px; */
}

.rightArea .search_result{
  width: 100%;
  
  padding: 10px 20px 10px;
  background-color: rgba(122,126,131,0.5);
}

.search_result .el-button {
  display: block;
  margin: 10px auto;
}

.search_result .el-pagination{
  margin: 0 auto;
}

/* 右侧手动添加相关样式 */
.rightArea .Add1Part{
  position: absolute;
  top: 20%;
  width: 80%;
  height: 60%;
  right: 20%;
  background-color: rgba(122,126,131,0.5);
}

.Add1Part .AddForm {
  position: absolute;
  left:0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 90%;
  height: 90%;
  margin: auto;
}

.AddForm button{
  position: absolute;
  width: 70px;
  left: 35%;
}



.AddForm .el-form-item__content .el-input {
  width: 80%;
  margin-left: 20px;
}

</style>