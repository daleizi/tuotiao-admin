<template>
  <div class="upload-cover flex">
    <div class="cover-wrap" @click="dialogVisible = true">
      <img class="imgs" v-if="value" :src="value" />
      <i v-else class="el-icon-plus mr-10"></i>
    </div>
    <el-dialog
      title="选择封面"
      :visible.sync="dialogVisible"
      width="60%"
      append-to-body
      v-loading="loading"
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <image-list
            :is-show-add="false"
            :is-show-star="false"
            :is-show-del="false"
            :is-show-copy="false"
            :is-show-preview="false"
            ref="imglist"
          />
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input ref="file" type="file" @change="onFileChange" />
          <img :src="cover" width="100" />
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="onCoverConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from "@/api/image";
import ImageList from "@/components/image-list";
export default {
  name: "UploadCover",
  components: {
    ImageList
  },
  props: ["value"],
  data() {
    return {
      dialogVisible: false, // 弹窗
      activeName: "first", // tabs
      cover: null, // 上传图片预览
      loading: false
    };
  },
  methods: {
    // 上传图片
    onFileChange() {
      const file = this.$refs.file;
      const files = window.URL.createObjectURL(file.files[0]);
      this.cover = files;
    },
    // 对话框确定
    onCoverConfirm() {
      // 上传图片
      if (this.activeName == "second") {
        const file = this.$refs.file.files[0];
        if (!file) {
          this.$message("请上传图片");
          return;
        }
        // 上传文件
        this.loading = true;
        const fd = new FormData();
        fd.append("image", file);
        uploadImage(fd)
          .then(res => {
            this.loading = false;
            // this.cover = "";
            this.dialogVisible = false;
            this.$emit("input", res.data.data.url);
          })
          .catch(error => {
            console.log(error);
            this.loading = false;
          });
      } else if (this.activeName == "first") {
        // 素材库选择图片
        const imageList = this.$refs.imglist;
        const selected = imageList.selected;
        if (selected === null) {
          this.$message("请选择封面图片");
          return;
        }
        this.$emit("input", imageList.imgs[selected].url);
        this.dialogVisible = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.cover-wrap {
  width: 120px;
  height: 120px;
  border: 1px solid #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-right: 10px;
  i {
    font-size: 36px;
    color: #ccc;
  }
  .imgs {
    width: 100%;
    height: 100%;
  }
}
</style>
