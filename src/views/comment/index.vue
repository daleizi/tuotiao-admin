<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 start -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑 end -->
      </div>
      <div class="mt-20">
        <el-table border :data="tableData" style="width: 100%">
          <el-table-column label="标题" prop="title"> </el-table-column>
          <el-table-column label="评论总数" prop="total_comment_count">
          </el-table-column>
          <el-table-column label="粉丝评论数" prop="fans_comment_count">
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span>{{ scope.row.comment_status ? "正常" : "关闭" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.comment_status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :disabled="scope.row.isloading"
                @change="onStatusChange(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
        <div class="mt-20">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            :current-page="page"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="perPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            :disabled="loading"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getArticles, uploadCommentStatus } from "@/api/article";
export default {
  name: "Comment",
  data() {
    return {
      tableData: [], // 文章数据列表
      loading: false, // loading
      total: 0, // 总共多少条数据
      page: 1, // 页数
      perPage: 10 // 每页条数
    };
  },
  created() {
    this.getComment();
  },
  methods: {
    // 请求数据
    getComment() {
      getArticles({
        page: this.page,
        per_page: this.perPage,
        response_type: "comment"
      }).then(res => {
        this.total = res.data.data.total_count;
        let tableData = res.data.data.results;
        tableData.forEach(val => {
          val.isloading = false;
        });
        this.tableData = tableData;
      });
    },
    // 修改评论状态
    onStatusChange(val) {
      // 禁用开关
      val.isloading = true;
      uploadCommentStatus(val.id.toString(), val.comment_status).then(res => {
        if (res.data.message == "OK") {
          // 启用开关
          this.$message.success(
            res.data.data.allow_comment ? "开启成功" : "关闭成功"
          );
          val.isloading = false;
        }
      });
    },
    // 每页显示多少条数据
    handleSizeChange(val) {
      this.perPage = val;
      this.page = 1;
      this.getComment();
    },
    // 当前页第几页
    handleCurrentChange(val) {
      this.page = val;
      this.getComment();
    }
  }
};
</script>

<style lang="scss" scoped></style>
