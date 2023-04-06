<template>
  <div class="admin-header-wapper">

    <el-row >
      <el-col :span="12"><div class="grid-content bg-purple" >

        <el-row :gutter="20">
          <el-col :span="3"><div class="grid-content bg-purple"></div>
            <img class="logo" src="https://foruda.gitee.com/avatar/1677232781716422624/11292066_shenshanshi_1657007114.png">

          </el-col>
          <el-col :span="21" :offset="0"><div class="grid-content bg-purple project-info-wapper">

            <p class="project-name">后台管理系统</p>
<!--            <p class="project-explain">yunayun毕业设计</p>-->

          </div></el-col>
        </el-row>
      </div></el-col>


      <el-col :span="12" type="flex">
        <div v-if="isLogin" class="grid-content bg-purple-light user-info-wapper">
          <div class="user-name-wapper">
            <p class="user-name">管理员</p>
          </div>
          <div class="avatar-wapper">
            <img class="avatar" :src="account.avatar">
            <div class="logout-wapper">
              <p class="logout" @click="logout">退出</p>
            </div>
          </div>

        </div>
        <div v-else class="grid-content bg-purple-light user-info-wapper">
          <div class="login-wapper">
            <router-link to="/login" class="login">登录</router-link>
          </div>
        </div>


      </el-col>
    </el-row>


  </div>
</template>

<script>
import {getAccountByToken} from "@/api/account/account";
import {logout} from "@/api/oauth/oauth";

export default {
  name: "AdminHeader",
  data(){
    return{
      isLogin:false,
      account: {}
    }
  },
  mounted() {
    this.getAccount()
  },
  methods:{
    logout(){
      this.isLogin = false;
      localStorage.removeItem('TOKEN');
      logout()
    },
    async getAccount(){
      let result = await getAccountByToken();
      if (result.code === 200){
        this.account = result.data;
        this.isLogin = true;
      }
    }
  }
}
</script>

<style scoped>

.admin-header-wapper{
  /*background: #D9ECFF;*/
  min-width: 600px;
  /*height: 80px;*/
  padding: 0 50px;
  border-bottom: 1px solid #DCDFE6;
}


.logo{
  width: 40px;
  height: 40px;
  margin-top: 20px;
}
.project-info-wapper{
  position: relative;
  top: -5px;
  height: 80px;
  overflow: hidden;
}
.project-name{
  color: #409EFF;
  font-size: 25px;
}

.project-explain{
  font-size: 13px;
  margin-left: 116px;
  position: relative;
  bottom: 20px;
  color: #666666;
}
.project-explain:before{
  position: absolute;
  content: '';
  width: 20px;
  height: 1px;
  bottom: 6px;
  left: -23px;
  background-color: #666666;
  /*color: red;*/
}

.user-info-wapper{
  float: right;

}
.user-name-wapper{
  display: inline-block;
  position: relative;
}
.user-name{

  font-size: 15px;
  margin-right: 8px;
  position: relative;
  top: 8px;

}
.avatar-wapper{
  display: inline-block;

}
.avatar{
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #DCDFE6;
  position: relative;
  top: 20px;
}


.logout-wapper{
  display: none;
  position: absolute;
  /*border: 1px solid #DCDFE6;*/
  height: 50px;
  /*margin-top: 15px;*/
  width: 40px;
  /*background: white;*/
  /*border-radius: 5px;*/
}

.avatar-wapper:hover .logout-wapper{
  display: block;
}

.logout{
  font-size: 15px;
  text-align: center;
  font-weight: 500;
  color: #F56C6C;
  margin-top: 20px;
  cursor: pointer;
}

.logout:active{
  color: #FDE2E2;
}

.login-wapper{
  margin-top: 20px;
}
.login{
  color: #666666;
  font-size: 20px;
  text-decoration: none;
}
.login:active{
  color: #999;
}

</style>
