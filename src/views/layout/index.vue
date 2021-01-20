<template>
  <el-container class="layout-container">
    <el-aside :style="{ width: isCollapse ? '64px' : '200px' }">
      <app-aside class="aside-menu" :isCollapse="isCollapse"></app-aside>
    </el-aside>
    <el-container>
      <el-header>
        <div class="flex-center">
          <i
            @click="isCollapse = !isCollapse"
            v-if="isCollapse"
            class="el-icon-s-unfold icon-font"
          ></i>
          <i
            @click="isCollapse = !isCollapse"
            v-else
            class="el-icon-s-fold icon-font"
          ></i>
          <span class="ml-10">卡卡网络有限公司</span>
        </div>
        <div class="flex-center">
          <el-avatar :size="28" :src="users.photo" class="mr-5"></el-avatar>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ users.name }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus"
                >退出</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from "./components/aside";
import { getUserProfile } from "@/api/user";
export default {
  name: "layout",
  components: {
    AppAside
  },
  created() {
    // 获取用户基本信息
    this.loadUserProfile();
  },
  data() {
    return {
      isCollapse: false,
      users: {}
    };
  },
  methods: {
    // 获取用户基本信息
    loadUserProfile() {
      let token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDI2MDA1MzksInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.-RZnOE9NzrKiANbq1I5qKZO_1eqDMxy_twjoFWTQOPU";
      getUserProfile(token)
        .then(res => {
          console.log(res);
          this.users = res.data.data;
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style lang="scss" scoped>
.layout-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.el-aside {
  background-color: #2f3447;
}
.el-header {
  height: 54px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title-aside {
  display: flex;
  justify-content: center;
  color: #fff;
}

.icon-font {
  font-size: 24px;
  cursor: pointer;
}
.aside-menu {
  height: 100%;
}
.el-main {
  background-color: #f5f5f5;
}
</style>
