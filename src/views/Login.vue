<template>
  <div class="login">
      <section class="form_container">
          <div class="logintip">
                <span class="title">管理员登录</span>
                <el-form :model="admin" label-width="60px" :label-position='right' class="loginForm">
                    <el-form-item label="用户名">
                        <el-input v-model="admin.userName" placeholder="请输入用户名" suffix-icon="el-icon-user-solid"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="admin.password" placeholder="请输入密码" suffix-icon="el-icon-key" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="onSubmit()">登录</el-button>
                    </el-form-item>
                </el-form>
          </div>
      </section>
  </div>
</template>

<script>


export default {
  name: 'Login',
  components: {
  },
  data(){
      return {
          admin: {
              userName:"",
              password:""
          },
      }
  },
  methods:{
      onSubmit(){
          console.log(this.admin.userName);
          console.log(this.admin.password);
      }
  }
}
</script>

<style scoped>
.login {
    position: relative;
    width: 100%;
    height: 100%;
    background: url("../assets/bg.jpg") no-repeat center center;
    background-size: 100% 100%;
}

.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}

.form_container .logintip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}

.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style>
