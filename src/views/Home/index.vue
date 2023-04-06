<template>
  <div class="home-wapper">

    <!--头部状态栏-->
    <div class="home-header">
      <admin-header></admin-header>
    </div>

    <!--底部-->
    <div class="home-body-wapper">

      <!--左边导航栏-->
      <div class="home-body-left-wapper">
        <NavMenu></NavMenu>
      </div>

      <!--左边内容框-->
      <div class="home-body-right-wapper">
        <router-view></router-view>
      </div>


    </div>





  </div>
</template>

<script>

import AdminHeader from "@/components/AdminHeader";
import NavMenu from "@/components/NavMenu";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components:{
    AdminHeader,
    NavMenu
  }
}
</script>

<style scoped>

.home-body-wapper{
  display: flex;
}

.home-body-left-wapper{
  width: 201px;
  /*position: fixed;*/
  position: sticky;
  top: 0px;
}

/*}*/
</style>
