<template>
  <el-row>
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      width="450px"
      :before-close="handleClose"
      center
    >
      <div style="overflow: hidden">
        <el-form
          :model="addMessege"
          status-icon
          :rules="rules"
          label-width="auto"
          ref="addMessege"
          class="demo-ruleForm"
        >
          <el-form-item label="用户姓名" prop="username">
            <el-input v-model="addMessege.username" ></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input type="password" v-model="addMessege.password"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="addMessege.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="addMessege.mobile"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="submitForm()">提 交</el-button>
      </span>
    </el-dialog>
    <el-col :span="24">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="userId" placeholder="请输入用户id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="primary">重置</el-button>
          <el-button type="primary" @click="addUser">添加</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <el-table :data="tableData" style="width: 100%" v-loading="loading" align="center">
        <el-table-column align="center" type="index" label="序号" width="55" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="id" label="用户ID" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="role_name" label="角色名称" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="username" label="用户名" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="mobile" label="手机" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">授权</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[2, 5, 8, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-col>
  </el-row>
</template>
<script>
import { usersList, userId, usersAdd } from "@/api/api";
export default {
  data() {
    return {
      currentPage: 1, //当前页码
      pagesize: 2, //每页条数
      total: 1,
      tableData: [], //用户数据列表
      loading: false,
      userId: 500,
      dialogVisible: false, //弹框flag
      addMessege: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      rules: {
          username: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
          ],
          mobile: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
          ],
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //新增提交
    submitForm() {
      this.dialogVisible = false;
    },
    //取消重置表单
    resetForm() {
      this.$refs.addMessege.resetFields()
      this.dialogVisible = false;
      
    },
    //添加
    addUser() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    //手动删除
    handleDelete(index, val) {
      console.log(index);
      console.log(val);
    },
    //改变每页的条数
    handleSizeChange(val) {
      this.pagesize = val;
      this.getUserList();
    },
    //翻页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserList();
    },
    //获取用户数据列表
    getUserList() {
      let params = {
        params: {
          query: "",
          pagenum: this.currentPage,
          pagesize: this.pagesize
        }
      };
      usersList(params).then(res => {
        console.log(res);
        if (res.meta.status == 200) {
          this.total = res.data.total;
          this.tableData = res.data.users;
          console.log(this.tableData);
        }
      });
    },
    //根据用户ID查寻
    onSearch() {
      //封装好的
      userId(this.userId).then(res => {
        console.log(res);
      });
      //本页写法url地址
      // axios.get("users/"+this.userId).then((res)=>{
      //   console.log(res)
      // })
    }
    //添加用户
  }
};
</script>
<style lang="less" scoped>
.el-pagination {
  background-color: #fff;
  margin-top: 15px;
}
.demo-form-inline {
  background-color: #fff;
  margin-bottom: 15px;
  overflow: hidden;
}
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  float: left;
  margin-top: 20px;
  margin-left: 20px;
}
</style>

<style lang="less" scoped>
</style>

