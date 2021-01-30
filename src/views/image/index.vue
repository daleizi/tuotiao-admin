<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 start -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑 end -->
      </div>
      <!-- 图片列表 -->
      <image-list></image-list>
    </el-card>
  </div>
</template>

<script>
import ImageList from "@/components/image-list";
export default {
  name: "ImageIndex",
  components: {
    ImageList
  }
};
</script>
<style lang="scss" scope></style>
