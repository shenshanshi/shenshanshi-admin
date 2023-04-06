<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="资源名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入资源名"
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

    <el-table v-loading="loading" :data="resourceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="资源id" align="center" prop="resourceId" />-->
      <el-table-column label="图片地址" align="center" prop="picture" >
        <template slot-scope="scope">
          <el-popover placement="top-start" title="" trigger="hover">
            <img :src="scope.row.picture" alt="" style="width: 150px;height: 150px">
            <img slot="reference" :src="scope.row.picture" style="width: 30px;height: 30px">
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="资源名" width="150" align="center" prop="name" />
      <el-table-column label="下载路径" width="150" align="center" prop="path">
        <template slot-scope="scope">
          <div class="height-wapper">
            <p>{{scope.row.path}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="资源简介" width="500" align="center" prop="briefIntroduction">
        <template slot-scope="scope">
          <div class="height-wapper">
            <p>&nbsp;&nbsp;{{scope.row.briefIntroduction}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="资源类型" width="100" align="center" prop="type" />

      <el-table-column label="下载量" width="100" align="center" prop="download" />
      <el-table-column label="资源标签" width="100" align="center" prop="label" />
      <el-table-column label="操作" width="150" align="center" class-name="small-padding fixed-width">
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
        <el-form-item label="资源名" prop="name">
          <el-input v-model="form.name" placeholder="请输入资源名" />
        </el-form-item>

        <el-form-item label="资源简介" prop="briefIntroduction">
          <el-input v-model="form.briefIntroduction" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="下载路径" prop="path">
          <el-input v-model="form.path" placeholder="请输入下载路径" />
        </el-form-item>

        <el-form-item label="图片地址" prop="picture">
          <el-input v-model="form.picture" placeholder="请输入图片地址" />
        </el-form-item>
        <el-form-item label="资源标签" prop="label">
          <el-input v-model="form.label" placeholder="请输入资源标签" />
        </el-form-item>
        <el-form-item label="下载量" prop="download">
          <el-input v-model="form.download" placeholder="请输入下载量" />
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
import { listResource, getResource, delResource, addResource, updateResource } from "@/api/resource/resource";
import Pagination from "@/components/Pagination";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Resource",
  components:{Pagination},

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
      resourceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        path: null,
        type: null,
        briefIntroduction: null,
        download: null,
        picture: null,
        label: null
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
      listResource(this.queryParams).then(response => {
        this.resourceList = response.rows;
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
        resourceId: null,
        name: null,
        path: null,
        type: null,
        createTime: null,
        briefIntroduction: null,
        download: null,
        picture: null,
        label: null
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
        name: null,
        path: null,
        type: null,
        briefIntroduction: null,
        download: null,
        picture: null,
        label: null
      }
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.resourceId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.chose = 1;
      this.reset();
      this.open = true;
      this.title = "添加资源信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.chose = 2;
      this.reset();
      const resourceId = row.resourceId || this.ids
      getResource(resourceId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改资源信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      if (this.chose === 1){
        addResource(this.form).then(response => {
          this.$message({
            message: '新增成功',
            type: 'success'
          });
          this.open = false;
          this.getList();
        });
      }else {
        if (this.form.resourceId != null) {
          updateResource(this.form).then(response => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.open = false;
            this.getList();
          });
        }
      }
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const resourceIds = row.resourceId || this.ids;
      delResource(resourceIds).then(response =>{
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
      this.download('system/resource/export', {
        ...this.queryParams
      }, `resource_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style scoped>
.height-wapper{
  /*height: 50px;*/
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  /*display: -webkit-box;  //使用自适应布局*/
/*-webkit-line-clamp: 2;  //设置超出行数，要设置超出几行显示省略号就把这里改成几*/
/*-webkit-box-orient: vertical;*/

}

</style>
