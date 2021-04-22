<template>
  <div class="Menu">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="添加图书" name="add">
          <el-button @click="singleAdd">手动添加</el-button>
          <el-button @click="batchAdd" >从文件导入</el-button>
        </el-collapse-item>
        <el-collapse-item title="查找图书" name="find">
          <div class="keyword">选择查找方式</div>
          <el-button @click="numFind">书号</el-button>
          <el-button @click="nameFind">书名</el-button>
          <el-button @click="authorFind">作者</el-button>
          <el-button id="all" @click="showAll">显示所有图书</el-button>
        </el-collapse-item>
        <el-collapse-item title="修改图书信息" name="modify">
          <el-button @click="modifyInfo">修改图书信息</el-button>
        </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>


export default {
  name: 'Menu',
  components: {
  },
  data(){
    return {
      activeName: "find"
    }
  },
  methods:{
    singleAdd(){
      console.log("单本入库");
      this.$emit("functionChanged",1);
    },
    batchAdd(){
      console.log("批量入库");
      this.$emit("functionChanged",2);
    },
    numFind(){
      console.log("按书号查找");
      this.$emit("functionChanged",3);
    },
    nameFind(){
      console.log("按书名查找");
      this.$emit("functionChanged",4);
    },
    authorFind(){
      console.log("按作者查找");
      this.$emit("functionChanged",5);
    },
    modifyInfo(){
      console.log("修改图书信息");
      this.$emit("functionChanged",6)
    },
    showAll(){
      console.log("显示所有图书");
      this.$emit("functionChanged",7)
    }
  }
}
</script>

<style scoped>
el-collapse-item {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
}

#all {
  width: 150px;
  margin-top: 10px;
  margin-left: 30px;
}
</style>