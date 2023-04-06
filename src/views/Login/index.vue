<template>
  <div class="login-wapper">



    <div class="login-model">

      <p>登录</p>
<!--      <p class="error">{{error}}</p>-->
      <div class="accountName">
        <input placeholder="请输入用户名|邮箱" v-model="accountName"/>
      </div>
      <div class="password">
        <input type="password" placeholder="密码" v-model="password"/>
      </div>

      <button @click="accountLogin">登录</button>

      <div class="register-wapper">
<!--        <span><router-link class="forgot-password" to="###">忘记密码</router-link></span>-->
        <span><router-link class="register" to="/register">注册</router-link></span>
      </div>
    </div>

  </div>

</template>



<script>


import {login} from "@/api/oauth/oauth";


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",


  data(){
    return{
      accountName:'',
      password:'',
    }
  },
  methods:{



    async accountLogin(){
      let result = await login(this.accountName, this.password);
      if (result.code === 200){
        localStorage.setItem("TOKEN", result.token);
        this.$router.push("/");
      }else if (result.code === 500){
        // this.error = result.msg;
        this.$message.error(result.msg);

      }else{
        // this.error = "登录失败";
        this.$message.error('登录失败');
        localStorage.removeItem("TOKEN");
      }


    }
  }


}
</script>

<style scoped>




.login-wapper{
  width: 100%;
  /*height: 1000px;*/
  height: auto;
  position: absolute;
  bottom: 0;
  top: 0;


  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  background-color: #F7F7F7;
  box-shadow: 2px 2px 5px #E5E5E5;

  /*z-index: 1;*/
}

.login-model{
  display: inline-block;
  margin-left: 55%;
  margin-top: 200px;
  width: 600px;
  height: 400px;
  background-color: white;
  box-shadow: 2px 2px 5px #E5E5E5;
  border-radius: 5px;
}







p{


  text-align: center;
  margin-top: 20px;
  font-size: 40px;
  color: #666666;

}

.error{


  height: 20px;
  text-align: center;
  /*margin-top: 20px;*/
  font-size: 15px;
  color: red;
}

input{

  width: 250px;
  line-height: 30px;
  font-size: 20px;
  border-radius: 5px;
  border: none;
  outline: none;
  padding: 2px 5px;
  margin: 20px 175px;

}

button{
  border: none;
  /*background-color: #E5041E;*/
  background-color: #b3d4fc;
  width: 100px;
  height: 40px;
  font-size: 25px;
  line-height: 40px;
  border-radius: 5px;
  margin-left: 250px;
  margin-top: 20px;

}

.register-wapper{
  width: 100%;
  margin-top: 20px;
  /*box-sizing: border-box;*/
  /*background-color: #b3d4fc;*/
  /*display: flex;*/
  /*align-items: center;*/
  /*align-content: center;*/
  /*padding-left: 100px;*/
}
.forgot-password{
  color: #b3d4fc;

  margin-left: 200px;
}
.register{
  float: right;
  color: #b3d4fc;
  margin-right: 200px;
}



</style>
