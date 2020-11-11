<template>
  <div class="login">
    <el-form ref="form" :model="form" class="container" :rules="rules">
      <el-form-item>
        <div ref='ss' class="avatar">
          <img src="../assets/avatar.jpg" alt="">
        </div>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="账户" prefix-icon="myicon myicon-user"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="密码" prefix-icon="myicon myicon-key" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="loginSubmit()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {checkUser} from '@/api'

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginSubmit () {
      console.log(this)
     
      // this.$refs[formName]    能够校验表单是否校验成功  
      this.$refs.form.validate(valide => {
        // console.log(res)
       
        // 只有校验通过，才执行函数
        if (valide) {
          
          checkUser(this.form).then(res => {
            console.log(res)
            
            // 如果成功要跳转至首页, 将token保存到localStorage
            if (res.meta.status === 200) {
              localStorage.setItem('mytoken', res.data.token)
              this.$router.push({name: 'Home'})
            } else {
              // 如果失败，展示提示信息
              this.$message({
                type: 'error',
                message: res.meta.msg
              })
            }
          })
        } else {
          console.log('校验不通过')
        }
      })
    }
  },
  mounted(){
    console.log(this.$refs.form)
  }
}
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
