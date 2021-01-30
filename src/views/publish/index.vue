<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 start -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ addEditTitle }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑 end -->
      </div>
      <div class="mt-10">
        <el-form
          :model="params"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="标题" prop="title">
            <el-input v-model="params.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content"> </el-form-item>
          <el-form-item label="封面">
            <el-radio-group v-model="params.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
            <div class="mt-20 flex">
              <template v-if="params.cover.type > 0">
                <upload-cover
                  v-for="(item, index) in params.cover.type"
                  class="ml-10 cursor"
                  v-model="params.cover.images[index]"
                  :key="index"
                ></upload-cover>
              </template>
            </div>
          </el-form-item>
          <el-form-item label="频道" prop="channel_id">
            <el-select v-model="params.channel_id" placeholder="请选择">
              <el-option
                v-for="item in channels"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="id">
            <el-button type="primary" @click="putArticle('add')"
              >编辑发布</el-button
            >
            <el-button @click="putArticle('save')">保存为草稿</el-button>
          </el-form-item>
          <el-form-item v-else>
            <el-button type="primary" @click="submitForm('add')"
              >立即发布</el-button
            >
            <el-button @click="submitForm('save')">保存为草稿</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  getChannels,
  addArticle,
  updateArticle,
  getArticle
} from "@/api/article";
import UploadCover from "./components/upload-cover";

export default {
  name: "Publish",
  components: {
    UploadCover
  },
  data() {
    return {
      addEditTitle: "发布文章", // 发文章还是编辑文章
      params: {
        title: "", // 文章标题
        content: "123qwe", // 文章内容
        cover: {
          // 封面
          type: 1, // 封面类型 -1 自动 0 无图 1 一张 3 三张
          images: [] // 图片地址
        },
        channel_id: null // 频道
      },
      id: "", // 文章id
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, max: 30, message: "长度在 3 到 30 个字符", trigger: "blur" }
        ],
        channel_id: [
          { required: true, message: "请选择频道", trigger: "change" }
        ],
        content: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            min: 10,
            max: 2000,
            message: "长度在 20 到 2000 个字符",
            trigger: "blur"
          },
          {
            validator(rule, value, callback) {
              if (value === "<p></p>") {
                callback(new Error("请输入内容"));
              } else {
                callback();
              }
            }
          }
        ]
      },
      // 文章频道
      channels: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    };
  },
  created() {
    this.getChannelsList();
    // 判断编辑还是发布
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      // 编辑
      this.addEditTitle = "编辑文章";
      this.getArticle();
    }
  },
  methods: {
    // 提交
    submitForm(val) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (val == "save") {
            addArticle(this.params, true).then(res => {
              console.log(res);
              if (res.status == 201) {
                this.$message.success("保存草稿成功");
                // 跳转到内容管理页面
                this.$router.push("/article");
              }
            });
          } else {
            addArticle(this.params).then(res => {
              console.log(res);
              if (res.status == 201) {
                this.$message.success("发表成功");
                // 跳转到内容管理页面
                this.$router.push("/article");
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    // 获取文章频道
    getChannelsList() {
      getChannels().then(res => {
        this.channels = res.data.data.channels;
      });
    },
    // 获取指定文章
    getArticle() {
      getArticle(this.id).then(res => {
        this.params = res.data.data;
      });
    },
    // 编辑文章 回去文章数据
    putArticle(val) {
      console.log(2323, val);
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (val == "save") {
            updateArticle(this.id, this.params, true).then(res => {
              console.log(res);
              if (res.status == 201) {
                this.$message.success("保存草稿成功");
                // 跳转到内容管理页面
                this.$router.push("/article");
              }
            });
          } else {
            updateArticle(this.id, this.params).then(res => {
              console.log(res);
              if (res.status == 201) {
                this.$message.success("发表成功");
                // 跳转到内容管理页面
                this.$router.push("/article");
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
