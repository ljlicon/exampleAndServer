<template>
  <div class="login">
    <el-form ref="form" :model="form" :rules="rules" >
      <img src="../assets/mylogo.jpg" alt class="pic">
      <el-form-item prop="username" >
        <el-input  v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password" >
        <el-input type="password" v-model="form.password" placeholder="请输入密码" ></el-input>
      </el-form-item>
      <el-button type="primary" plain style="width:100%" @click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import {loginSure} from "@/api/api"
export default {
  data() {
    return {
      form: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 7, message: "名称在 3 到 7 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 7, message: "密码在 3 到 7 个字符", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    login() {
      //留一个坑，以后每次登录是不是要清理一下token和用户信息
      this.$refs.form.validate(v => {
        if (v) {
          loginSure(this.form).then(res => {
            console.log(res)
            if(res.meta.status==200){
            //设置token存在本地
              sessionStorage.setItem("token", res.data.token);
              //以json字符串的形式存储用户信息
              sessionStorage.setItem("userMsg", JSON.stringify(res.data));
              // this.$router.push('./home') 登录成功跳转页面
              this.$router.push({ name: "home" });
            }else{
              this.$message({
                message: res.meta.msg ,
                type: "warning"
              })
            }
        })} else {
          this.$message({
                message: "用户名密码验证失败" ,
                type: "warning"
              });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  width: 100%;
  background: url('../assets/stress.jpg') no-repeat ;
  background-size: cover;
}
.el-form {
  padding: 70px 20px 20px 20px;
  width: 400px;
  background: linear-gradient(to top,orange,rgb(11, 222, 230));
  margin: auto;
  top: 200px;
  position: relative;
  .pic {
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    // border: 5px solid rgb(124, 124, 121);
    top: -20%;
    left: 50%;
    transform: translateX(-50%)
  }
}
</style>
