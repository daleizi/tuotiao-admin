<template>
  <el-menu
    default-active="$route.path"
    :collapse="isCollapse"
    background-color="#2f3447"
    active-text-color="#ffd04b"
    text-color="#fff"
    router
    class="el-menu-vertical-demo"
  >
    <h3 class="text-white flex-center">管理</h3>
    <el-menu-item index="/">
      <i class="icons iconfont icon-credit-level"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="icons iconfont icon-editor"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="icons iconfont icon-pic"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="icons iconfont icon-suggest"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="icons iconfont icon-remind"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="icons iconfont icon-Customermanagement"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="icons iconfont icon-office-supplies"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "AppAside",
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: 0;
}
.el-menu-item {
  display: flex;
  align-items: center;
}
.icons {
  width: 24px;
  font-size: 18px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
