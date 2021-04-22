<template>
  <div class="PagedTable">
    <div style="display:none">
      {{this.tableData}}
    </div>
    <!-- 表格 -->
    <el-table
    :data="pagedBookInfo"
    stripe
    border
    style="width: 100%"
    empty-text="没有搜索结果"
    @selection-change="selectionChanged"
    max-height="284"
    ref="table">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="书号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="title"
          label="书名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者"
          width="180">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="100">
        </el-table-column>
        <el-table-column
          prop="recommend"
          label="好评度"
          width="100">
        </el-table-column>
        <el-table-column
          label="详情">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
    </el-table>      
    <!-- test -->
    <div class="buttonset">
      <el-button @click="deleteData" type="danger">删除所有选中图书</el-button>
      <el-button @click="clearAll" type="primary">取消所有选中</el-button>
      <el-button @click="selectAll" type="primary">全选</el-button>
      <el-button @click="fresh" type="primary">更新</el-button>
    </div>
    <!-- 分页栏 -->
    <div class="paged">
        <el-pagination
          background
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="nums"
          :current-page.sync="currentPage"
          @current-change="changePage">
        </el-pagination>        
    </div>
  </div>
  
</template>

<script>


export default {
  name: 'PagedTable',
  components: {
  },
  data(){
       
    return {
      pageChangedFlag:false,
      update: false,
      selected:[],//所有页选中的书
      currentSelected:[],//当前页被选中的书
      selectall:[],//在加载的时候就构造一个全选的数组，方便全选
      currentPage: 1,//当前页号
      pageSize: 5,//每一页展示多少本书（不要随便修改，因为涉及到后面分页的逻辑）
      pagedBookInfo: [],//当前这一页的书
    }
  },
  props:["tableData","nums","query"],
  //用钩子函数，当刚刚从home获得数据的时候，加载第一页内容。 后续数据更新的时候，pagedBookInfo已经有内容了，就不会再起作用了
  beforeUpdate:function(){//就nm离谱，箭头函数和function()写法的this指向不同。。。不能用箭头函数简写
         
      },
      //用于防止换页时，更新currentSelected,导致不能记住之前这一页的哪几项被选中了
  updated:function(){
      if(this.pageChangedFlag){
          this.pageChangedFlag=false;
        }
      if(this.update){
          this.update = false;
          this.pagedBookInfo.splice(0,this.pagedBookInfo.length);
         for(var i=0;i<this.$data.pageSize && i<this.nums;i++){
            //console.log(i);
            this.pagedBookInfo.push(this.tableData[i]);
          } 
          console.log("cnm")
          console.log(this.pagedBookInfo)
          console.log("cnm1")
          console.log(this.tableData)
        }
  },
  methods:{
      fresh(){
        this.$emit("searchAgain",this.query);
      },
      handleClick(row){
        let detailRoute = this.$router.resolve({path: "/detail",query:{id: row.id}})
        // this.$router.push({path: "/detail",query:{id: row.id}})
        window.open(detailRoute.href)
        // console.log(row.id)
      },      
      selectionChanged(val){
          if(!this.pageChangedFlag){
            this.currentSelected=val;
            // console.log(val);
            // console.log(111);
            this.selected[this.currentPage]=this.currentSelected;
          }
      },
      deleteData(){
        // if(this.selected.length!=0){
        //     for(var item in this.selected){
        //         console.log(this.selected[item].id)
        //     }
        // }
        
        let selectedId=[]
        if(this.selected.length!=0){
          for(let key in this.selected){
            for(let item in this.selected[key]){
              selectedId.push(this.selected[key][item].id)
            }
          }
        } 
        console.log(selectedId)
        //发送请求，把数据删除
        this.$axios.post("/api/DeleteBook",{
          idArray: selectedId
        })
        //然后重新请求数据
        this.$emit("searchAgain",this.query);
        //然后把选中清零
        this.clearAll();
        this.pageChangedFlag=true;
        this.update=true;
        this.currentPage=1;
      },
      changePage(){
          this.pageChangedFlag=true;
          this.pagedBookInfo.splice(0,this.pagedBookInfo.length)
          var pageNum = this.currentPage;
          for(var i=(pageNum-1)*this.pageSize;i<pageNum*this.pageSize && i<this.nums;i++){
              // console.log(i);
              this.pagedBookInfo.push(this.tableData[i]);
          }

          for(let i=0;i<5;i++){
            this.$refs.table.toggleRowSelection(this.pagedBookInfo[i],false)
          }
          
          //console.log(this.selected[this.currentPage])
          for(let row in this.selected[this.currentPage]){
            this.$refs.table.toggleRowSelection(this.selected[this.currentPage][row],true)
          }
      },
      clearAll(){
        this.selectall = [];
        this.selected = [];
        for(let i=0;i<5;i++){
            this.$refs.table.toggleRowSelection(this.pagedBookInfo[i],false)
        }
      },
      selectAll(){
        
        let length = this.tableData.length;
        let onepage = [];
        let pages = 0;
        let i=0;
        for(;i+5*pages<length;i++){
          
          onepage.push(this.tableData[i+5*pages]);
          if((i+1)%5===0){
            this.selectall[pages+1]=onepage;
            pages++;
            onepage=[];
            i=-1;
          }
          // if(i+5*pages===2)
          //   console.log(onepage);
        }
        if(i%5!=0){
          this.selectall[pages+1]=onepage;
        }
        
        // console.log(pages*5+i)
        this.selected=this.selectall
        console.log(this.selected[1])
        
        //this.$refs.table.toggleRowSelection(this.selected[1][0],true)
        // console.log(this.selected)
        // console.log("****")
        // console.log(this.currentPage)
        // console.log("****************")
        console.log("1")
        console.log(this.selected[1])
        this.pageChangedFlag=true;
        // console.log(this.selected[1])
        // console.log("****************")
        // for(let r in this.selected[this.currentPage]){
        //   this.$refs.table.toggleRowSelection(this.selected[this.currentPage][r],true)
        //   console.log(this.selected[this.currentPage][r].id);
        // }
        for(let i=0;i<5;i++){
          this.$refs.table.toggleRowSelection(this.pagedBookInfo[i],true)
          console.log(i)
          console.log(this.selected[1])
        }

        console.log("****************")
        console.log(this.selected[1])
      }
  }
}
</script>

<style scoped>
.el-pagination {
    text-align: center; 
}


</style>