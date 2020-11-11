<template>
  <el-container>
    <el-aside width="200px">
      <div class="logo"></div>
      <el-menu
        unique-opened
        style="border-right:0px solid blue"
        class="el-menu-vertical-demo"
        router
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu :index="item.order+''" v-for="item in menusList" :key="item.id">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{item.authName}}</span>
          </template>
          <el-menu-item-group v-for="kidItem in item.children" :key="kidItem.id">
            <el-menu-item :index="'/home/'+kidItem.path" style="padding-left:80px;">
              <i class="el-icon-menu"></i>
              {{kidItem.authName}}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header height="60px">
        Background Management System
        <div style="float:right;cursor:pointer">
            <span ><i class="el-icon-setting" ></i>{{userMsg.username}} </span>
            <span @click="logout" >退出</span>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {leftMenus,allPowerList} from '@/api/api'
export default {
  data() {
    return {
      userMsg:{},//用户信息
      menusList: [] //菜单列表
    };
  },
  created() {
    this.leftMenu()
    //去sessionStoryge拿用户信息比去vuex里面拿东西更快，页面加载数据才能一进去就渲染出来
    this.userMsg=JSON.parse(sessionStorage.getItem("userMsg")) 
    //从vuex中拿去用户信息
    // this.userMsg = this.$store.state.userMsg
    console.log(this.userMsg)
  },
  mounted() {
    
  },
  methods: {
    //等出
    logout() {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userMsg");
      this.$router.push({ name: "login" });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //左侧菜单权限
    leftMenu() {
      leftMenus({}).then(res => {
        if (res.meta.status == 200) {
          this.menusList = res.data;
        }
      });
    },
    //所有权限列表
    allPower(){
      allPowerList({params:{type:Object}}).then(res=>{
        console.log(res)
      })
    }
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  
}
.el-header {
  background-color: rgb(60, 67, 77);
  color: rgb(255, 255, 255);
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: rgb(60, 67, 77);
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
.logo {
  height: 60px;
  background: url(../assets/future.jpg);
  background-size: cover;
}
</style>
