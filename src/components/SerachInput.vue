<template>
  <div class="SearchInput">
    <el-input
    placeholder="请输入检索值"
    v-model="input"
    clearable>

    </el-input>
  </div>
</template>

<script>


export default {
  name: 'SearchInput',
  components: {
  },
  data(){
    return {
      input:""
    }
  },
  methods:{
    
  }
}
</script>

<style scoped>


</style>