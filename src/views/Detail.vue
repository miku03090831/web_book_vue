<template>
  <div class="detail">
    <div id="wrap">
		<h1>{{this.Book.id}}号书的档案</h1>
		<br><br><br>
		<div id="form-wrap">
			<form>
				<p>书名：{{this.Book.title}}</p>
        <p>作者：{{this.Book.author}}</p>
        <p>价格：{{this.Book.price}}元</p>
        <p>好评度：{{this.Book.recommend}}</p>
        <p>图片：</p>
        <img :src="this.Book.pic_refs">
			</form>
		</div>
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
  body, div, h1, h2, form, fieldset, input, textarea, footer, p{
	margin: 0;
	padding: 0;
	border: 0;
	outline: none;
}
.detail {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../assets/bg.jpg") no-repeat center center;
  background-size: 100% 100%;
}
p{
	font-family: tahoma;
	font-size: 24px;
	color: #757575;
}
#wrap{
	width: 530px;
	margin: 0 auto 0;
	height: 100%;
}
h1{
  margin-top: 0px;
	margin-bottom: 20px;
	text-align: center;
	font-size: 35px;
	font-family: tahoma;
	color: black;
}
#form-wrap{
	overflow: hidden;
	height: 447px;
	position: relative;
	top: 0px;
	transition: all 1s ease-in-out .3s;
}
#form-wrap:before{
	content: "";
	position: absolute;
	bottom: 128px;
	left: 0px;
	background: url('../assets/before.png');
	width: 530px;
	height: 317px;
}
#form-wrap:after{
	content: "";
	position: absolute;
	bottom: 0px;
	left: 0;
	background: url('../assets/after.png');
	width: 530px;
	height: 259px;
}
#form-wrap.hide:after,
#form-wrap.hide:before{
	display: none;
}
#form-wrap:hover{
	height: 757px;
	top: -200px;
}
form{
	background: url('../assets/letter_bg.png');
	position: relative;
	top: 200px;
	overflow: hidden;
	height: 200px;
	width: 400px;
	margin: 0px auto;
	padding: 20px;
	border: 1px solid white;
	border-right: 3px;
	transition: all 1s ease-in-out .3s;
}
#form-wrap:hover form{
	height: 530px;
}
lable{
	margin: 11px 20px 0 0;
	font-size: 15px;
	color: gray;
	text-transform: uppercase;
}
input[type=text], textarea{
	font: 14px normal uppercase, arial, serif;
	color: dimgray;
	background: none;
	width: 380px;
	height: 37px;
	padding: 0px 10px;
	margin: 0 0 10px 0;
	border: 1px solid #BDBDBD;
	border-radius: 5px;
}
textarea{
	height: 80px;
	padding-top: 14px;
}
textarea:focus,
input[type=text]:focus{
	background: url('../assets/letter_bg.png');
}
#form-wrap input[type=submit]{
	position: relative;
	font-family: tahoma;
	font-size: 24px;
	color: gray;
	width: 300px;
	text-align: center;
	opacity: 0;
	background: none;
	cursor: pointer;
	border-radius: 3px;
	transition: opacity 0.7s ease-in-out 0s;
}
#form-wrap:hover input[type=submit]{
	z-index: 1;
	opacity: 1;
	transition: opacity 0.5s ease-in-out 1.3s;
}

</style>
