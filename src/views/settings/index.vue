<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 start -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑 end -->
      </div>
      <div>
        <el-form
          :rules="rules"
          size="small"
          ref="form"
          :model="form"
          label-width="80px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="编号">
                {{ form.id }}
              </el-form-item>
              <el-form-item label="手机">
                {{ form.mobile }}
              </el-form-item>
              <el-form-item label="媒体名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="form.intro"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  :loading="updateProfileLoading"
                  size="small"
                  type="primary"
                  @click="onSubmit"
                  >保存设置</el-button
                >
              </el-form-item>
            </el-col>
            <el-col :span="12" class="text-center">
              <!-- <div class="fz-14 cursor" @click="$refs.file.click()">
                点击修改头像
              </div> -->
              <label for="file" class="fz-14 cursor">
                <el-avatar
                  shape="square"
                  :size="160"
                  fit="cover"
                  :src="form.photo"
                ></el-avatar>
                <p class="fz-14">点击修改头像</p>
              </label>
              <input
                hidden
                id="file"
                @click="onFileChange"
                type="file"
                ref="file"
              />
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
      @opened="onOPened"
      @closed="onDialogClose"
    >
      <div class="preview-image-wrap">
        <img class="preview-image" ref="preview-image" :src="previewImage" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          :loading="updatePhotoLoading"
          type="primary"
          @click="onUpdatePhono"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserProfile, updateUserProfile, updateUserPhoto } from "@/api/user";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
export default {
  name: "Settings",
  data() {
    return {
      form: {
        email: "",
        id: "",
        intro: "",
        mobile: "",
        name: "",
        desc: "",
        photo: ""
      },
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }]
      },
      dialogVisible: false, // 弹出框
      previewImage: "", // 预览图片
      cropper: null, // 裁切器示例,
      updatePhotoLoading: false, // 更新用户头像 loading 状态
      updateProfileLoading: false // 更新基本信息的 loading 状态
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      getUserProfile().then(res => {
        this.form = res.data.data;
      });
    },
    // 提交用户信息修改
    onSubmit() {
      this.updateProfileLoading = true;
      updateUserProfile(this.from).then(res => {
        console.log(res);
        this.updateProfileLoading = false;
        if (res.data.message == "OK") {
          this.$message.success("修改成功");
        }
      });
    },
    onFileChange() {
      // 处理图片预览
      const file = this.$refs.file;
      const blobData = window.URL.createObjectURL(file.files[0]);
      this.previewImage = blobData;
      // 展示弹出层
      this.dialogVisible = true;
      // 清空选择的
      this.$refs.file.value = "";
    },
    // 裁剪图片
    onOPened() {
      const image = this.$refs["preview-image"];
      // 第1次初始化好以后，如果预览裁切的图片发生了变化，裁切器默认不会更新
      // 如果需要预览图片发生变化更新裁切器：
      //    方式一：裁切器.replace 方法
      //    方式二：销毁裁切器，重新初始化
      // 初始化裁切器
      if (this.cropper) {
        this.cropper.replace(this.previewImage);
        return;
      }
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: "none",
        aspectRatio: 1,
        cropBoxResizable: false
      });
    },
    // 关闭对话框
    onDialogClose() {
      // 销毁裁切器
      // this.cropper.destroy()
    },
    // 弹出框确定
    onUpdatePhono() {
      this.updatePhotoLoading = true;
      // 获取载切图片对象
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData();
        fd.append("photo", file);
        // 请求提交 fd
        updateUserPhoto(fd).then(res => {
          console.log(res);
          // 关闭弹窗
          this.dialogVisible = false;
          this.form.photo = window.URL.createObjectURL(file);
          this.updatePhotoLoading = false;
          // 把服务端返回的图片进行展示有点慢
          // this.form.photo = res.data.data.photo;
        });
      });
    }
  }
};
</script>

<style lang="scss">
.preview-image-wrap {
  .preview-image {
    display: block;

    /* This rule is very important, please don't ignore this */
    max-width: 100%;
    height: 320px;
  }
}
</style>
