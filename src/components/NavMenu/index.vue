<template>
  <div>



    <el-menu
        default-active="/"
        class="el-menu-vertical-demo"
        :router="true"
        :unique-opened = "true"
        background-color="#FFF"
        text-color="#409EFF"
        active-text-color="#A0CFFF">


      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>

<!--      用户管理-->
      <el-submenu index="/user" >
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user/user">用户</el-menu-item>
        <el-menu-item index="/user/role">角色</el-menu-item>
        <el-menu-item index="/user/permission">权限</el-menu-item>
      </el-submenu>

<!--      论坛管理-->
      <el-submenu index="/forum">
        <template slot="title">
          <i class="el-icon-more"></i>
          <span>论坛管理</span>
        </template>
        <el-menu-item index="/forum/post">帖子</el-menu-item>
        <el-menu-item index="/forum/review">评论</el-menu-item>
      </el-submenu>


<!--    周边管理-->
    <el-submenu index="/periphery">
      <template slot="title">
        <i class="el-icon-s-goods"></i>
        <span>周边管理</span>
      </template>
      <el-menu-item index="/periphery/1">周边</el-menu-item>
      <el-menu-item index="/periphery/2">漫展</el-menu-item>
      <el-menu-item index="/periphery/3">购物车</el-menu-item>
      <el-menu-item index="/periphery/4">订单</el-menu-item>
    </el-submenu>


<!--      资源管理-->
      <el-submenu index="/resource">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>资源管理</span>
        </template>
        <el-menu-item index="/resource/1">周边</el-menu-item>
        <el-menu-item index="/resource/2">漫展</el-menu-item>
        <el-menu-item index="/resource/3">购物车</el-menu-item>
        <el-menu-item index="/resource/4">订单</el-menu-item>
      </el-submenu>



    </el-menu>


  </div>
</template>

<script>
export default {
  name: "NavMenu",
  data(){
    return{

      navMenu:[
        {
          menuName: "首页",
          menukey:"/",
          child:[
            {
              menuName: "欢迎",
              menukey:"/",
            }
          ]
        },

        {
          menuName: "用户管理",
          menukey:"/account",
          child:[
            {
              menuName: "用户",
              menukey:"/account",
            },
            {
              menuName: "角色",
              menukey:"role",
            },
            {
              menuName: "权限",
              menukey:"permission",
            },
          ]
        },

        {
          menuName: "论坛管理",
          menukey:"",
          child:[
            {
              menuName: "帖子",
              menukey:"",
            },
            {
              menuName: "评论",
              menukey:"",
            },
            {
              menuName: "收藏",
              menukey:"",
            }
          ]
        },

        {
          menuName: "周边管理",
          menukey:"",
          child:[
            {
              menuName: "商品",
              menukey:"",
            },
            {
              menuName: "漫展",
              menukey:"",
            },
            {
              menuName: "订单",
              menukey:"",
            }
          ]
        },

        {
          menuName: "资源管理",
          menukey:"",
          child:[
            {
              menuName: "资源",
              menukey:"",
            },
          ]
        },


      ]

    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    onclickMenu(path){
      console.log(path);
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>

</style>