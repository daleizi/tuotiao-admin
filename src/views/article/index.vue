<template>
  <div>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="flex justify-between">
            <!-- 面包屑 start -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>内容管理</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 面包屑 end -->
            <div class="text-right fz-14 cursor" @click="show = !show">
              <i v-if="show" class="el-icon-arrow-up"></i>
              <i v-else class="el-icon-arrow-down"></i>
              <i class="el-icon-arrow-up' : 'el-icon-arrow-down'}"></i>
              {{ show ? "收起" : "展开" }}
            </div>
          </div>
        </div>
        <!-- 表单 start -->
        <el-form
          class="mt-10"
          size="small"
          ref="params"
          :model="params"
          label-width="60px"
        >
          <el-form-item label="状态">
            <el-radio-group v-model="params.status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
              <el-radio :label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道" v-if="show">
            <el-select v-model="params.channel_id" placeholder="请选择">
              <el-option label="全部" value="null"></el-option>
              <el-option
                v-for="item in channels"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" v-if="show">
            <el-date-picker
              v-model="rangeDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              clearable
              value-format="yyyy-MM-DD"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="loading" type="primary" @click="getArticle"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
        <!-- 表单 end -->
      </el-card>
    </div>
    <div class="mt-10">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>共查询 {{ total }} 条数据</span>
        </div>
        <div class="mt-10">
          <el-table
            v-loading="loading"
            border
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column type="selection" width="40"> </el-table-column>
            <el-table-column label="封面" width="180">
              <template slot-scope="scope">
                <el-image
                  style="width: 100px;"
                  :src="scope.row.cover.images[0]"
                  fit="cover"
                  lazy
                  :preview-src-list="[scope.row.cover.images[0]]"
                >
                </el-image>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="标题"> </el-table-column>
            <el-table-column label="状态" width="100">
              <template slot-scope="scope">
                <el-tag :type="statusList[scope.row.status].type">{{
                  statusList[scope.row.status].title
                }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="pubdate" label="发布时间" width="180">
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="m-10">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              background
              :current-page="params.page"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="params.per_page"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              :disabled="loading"
            >
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getArticles, getChannels, deleteArticles } from "@/api/article";
export default {
  name: "Article",
  data() {
    return {
      show: true, // 是否展开
      tableData: [], // 文章数据列表
      loading: false, // loading
      total: 0, // 总共多少条数据
      rangeDate: null, // 日期范围
      params: {
        page: 1,
        per_page: 10,
        status: null, // 状态
        channel_id: null, // 频道 id
        response_type: null // 返回数据的字段
      },
      // 状态
      statusList: [
        { title: "草稿", type: "" },
        { title: "待审核", type: "info" },
        { title: "审核通过", type: "success" },
        { title: "审核失败", type: "warning" },
        { title: "已删除", type: "danger" }
      ],
      // 文章频道
      channels: []
    };
  },
  created() {
    this.getArticle();
    this.getChannelsList();
  },
  methods: {
    // 请求文章列表
    getArticle() {
      let params = {
        ...this.params,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 起始时间
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null //  截止时间
      };
      this.loading = true;
      getArticles(params)
        .then(res => {
          this.tableData = res.data.data.results;
          this.total = res.data.data.total_count;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.params.per_page = val;
    },
    // 当前页第几页
    handleCurrentChange(val) {
      this.params.page = val;
      this.getArticle();
    },
    // 获取文章频道
    getChannelsList() {
      getChannels().then(res => {
        console.log(res);
        this.channels = res.data.data.channels;
      });
    },
    // 删除文章
    handleDelete(id) {
      console.log(id, id.toString());
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteArticles(id.toString()).then(res => {
          console.log(res.data.status);
          if (res.data.status == 204) {
            this.getArticle();
            this.$message.success("删除成功");
          }
        });
      });
    }
  }
};
</script>

<style lang="scss">
.el-card__body {
  padding: 0 10px;
}
</style>
