<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="评论者id" prop="accountId">
        <el-input
          v-model="queryParams.accountId"
          placeholder="请输入评论者id"
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
          @click="handleDelete"
        >删除</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="reviewList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="评论Id" align="center" prop="reviewId" />-->
      <el-table-column label="评论者id" width="100" align="center" prop="accountId" />
      <el-table-column label="评论内容" width="700" align="center" prop="reviewContent" />
<!--      <el-table-column label="父级id" align="center" prop="parentId" />-->
      <el-table-column label="点赞" width="100" align="center" prop="like" />
      <el-table-column label="踩" width="100" align="center" prop="notlike" />
      <el-table-column label="操作" width="121" align="center" class-name="small-padding fixed-width">
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
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="评论者id" prop="accountId">
          <el-input v-model="form.accountId" placeholder="请输入评论者id" />
        </el-form-item>
        <el-form-item label="评论内容">
          <el-input :rows="10"
                    placeholder="请输入内容"
                    v-model="form.reviewContent"
                    :min-height="192"/>
        </el-form-item>

        <el-form-item label="点赞" prop="like" v-if="chose === 2">
          <el-input v-model="form.like" placeholder="请输入点赞" />
        </el-form-item>
        <el-form-item label="踩" prop="notlike" v-if="chose === 2">
          <el-input v-model="form.notlike" placeholder="请输入踩" />
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
import { listReview, getReview, delReview, addReview, updateReview } from "@/api/forum/review";
import Pagination from "@/components/Pagination";
import {addPost, updatePost} from "@/api/forum/post";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Review",
  components:{Pagination},
  data() {
    return {
      chose : 0,
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
      reviewList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        reviewContent: null,
        accountId: null,
        parentId: null,
        like: null,
        notlike: null
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
      listReview(this.queryParams).then(response => {
        this.reviewList = response.rows;
        this.total = response.total;
        this.loading = false;
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
        reviewId: null,
        reviewContent: null,
        createTime: null,
        accountId: null,
        parentId: null,
        like: null,
        notlike: null
      };
      // this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      // this.resetForm("queryForm");
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        reviewContent: null,
        accountId: null,
        parentId: null,
        like: null,
        notlike: null
      }
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.reviewId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.chose = 1;
      this.reset();
      this.open = true;
      this.title = "添加评论";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.chose = 2;

      this.reset();
      const reviewId = row.reviewId || this.ids
      getReview(reviewId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改评论";
      });
    },
    /** 提交按钮 */
    submitForm() {

      if (this.chose === 1){
        addReview(this.form).then(response => {
          this.$message({
            message: '新增成功',
            type: 'success'
          });
          this.open = false;
          this.getList();
        });
      }else{

        updateReview(this.form).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.open = false;
          this.getList();
        });

      }

    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const reviewIds = row.reviewId || this.ids;
      delReview(reviewIds).then(response =>{
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getList();
          }
      )

    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/review/export', {
        ...this.queryParams
      }, `review_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
