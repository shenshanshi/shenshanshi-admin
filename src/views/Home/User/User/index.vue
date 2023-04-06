<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户名" prop="accountName">
        <el-input
            v-model="queryParams.accountName"
            placeholder="请输入用户名"
            clearable
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户昵称" prop="nikeName">
        <el-input
            v-model="queryParams.nikeName"
            placeholder="请输入用户昵称"
            clearable
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input
            v-model="queryParams.email"
            placeholder="请输入邮箱"
            clearable
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>



      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="success"
            plain
            icon="el-icon-edit"
            size="mini"
            :disabled="single"
            @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            size="mini"
            :disabled="multiple"

        >删除</el-button>
      </el-col>

<!--      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
    </el-row>

    <el-table v-loading="loading" :data="accountList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="用户id" align="center" prop="accountId.toString()" />-->
      <el-table-column label="用户名" width="100" align="center" prop="accountName" />
      <el-table-column label="用户昵称" width="100" align="center" prop="nikeName" />
<!--      <el-table-column label="密码" align="center" prop="password" />-->
<!--      <el-table-column label="盐值" align="center" prop="salt" />-->
<!--      <el-table-column label="头像地址" align="center" prop="avatar" />-->
      <el-table-column label="邮箱" width="200" align="center" prop="email" />
      <el-table-column label="qq号" width="200" align="center" prop="qq" />
<!--      <el-table-column label="性别" align="center" prop="sex" />-->
<!--      <el-table-column label="个性签名" align="center" prop="personalSignature" />-->
<!--      <el-table-column label="最后登录ip" align="center" prop="loginIp" />-->
<!--      <el-table-column label="最后登录时间" align="center" prop="loginDate" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.loginDate, '{y}-{m}-{d}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="状态" width="100" align="center" prop="status" />
      <el-table-column label="备注" width="100" align="center" prop="remark" />
      <el-table-column label="操作" width="200" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"

          >修改</el-button>
          <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"

          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
    />

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="用户名" prop="accountName">
          <el-input v-model="form.accountName" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="用户昵称" prop="nikeName">
          <el-input v-model="form.nikeName" placeholder="请输入用户昵称" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="chose === 1">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="qq号" prop="qq">
          <el-input v-model="form.qq" placeholder="请输入qq号" />
        </el-form-item>
        <el-form-item label="个性签名" prop="personalSignature">
          <el-input v-model="form.personalSignature" placeholder="请输入个性签名" />
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listAccount, getAccount, delAccount, addAccount, updateAccount } from "@/api/account/account";
import Pagination from "@/components/Pagination";
// import RightToolbar from "@/components/RightToolbar";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  components:{Pagination,},
  data() {
    return {
      chose: 0,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 【请填写功能名称】表格数据
      accountList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        accountName: null,
        nikeName: null,
        email: null,

      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listAccount(this.queryParams).then(response => {
        this.accountList = response.rows;
        this.total = response.total;
        this.loading = false;
        // console.log(this.accountList);
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        accountName: null,
        nikeName: null,
        email: null,
      };
      // this.resetForm("form");
      this.form = {}
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.accountName = null;
      this.queryParams.email = null;
      this.queryParams.nikeName = null;
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.accountId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.chose = 1;
      this.reset();
      this.open = true;
      this.title = "添加用户";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.chose = 2;
      this.reset();
      const accountId = row.accountId || this.ids
      getAccount(accountId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【请填写功能名称】";
      });
    },
    /** 提交按钮 */
     submitForm() {
      if (this.chose === 2 && this.form.accountId != null) {

        updateAccount(this.form).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.open = false;
          this.getList();
        });
      } else {



        if(!this.form.accountName){
          this.$message.error('用户名不能为空');
          return
        }

        if(!this.form.password){
          this.$message.error('密码不能为空');
          return
        }



        addAccount(this.form).then(response => {
          this.$message({
            message: '新增成功',
            type: 'success'
          });
          this.open = false;
          this.getList();
        });
      }


    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const accountIds = row.accountId || this.ids;

      delAccount(accountIds).then(response =>{
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getList();
          }
      )

      // this.$modal.confirm('是否确认删除【请填写功能名称】编号为"' + accountIds + '"的数据项？').then(function() {
      //   return delAccount(accountIds);
      //
      // }).then(() => {
      //   this.getList();
      //   this.$modal.msgSuccess("删除成功");
      // }).catch(() => {});
    },

  }

}
</script>

<style scoped>

</style>
