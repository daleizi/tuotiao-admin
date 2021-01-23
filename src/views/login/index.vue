<template>
  <div class="login-container">
    <el-form ref="ruleForm" class="login-form" :model="user" :rules="rules">
      <div class="img-box">
        <img src="./logo_index.png" />
      </div>
      <el-form-item prop="mobile">
        <el-input
          v-model="user.mobile"
          prefix-icon="el-icon-mobile-phone"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="user.code"
          prefix-icon="el-icon-chat-line-square"
          placeholder="请输入验证码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree"
          >我已阅读并同意用户协议和隐私条款</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onLogin"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/user.js";
export default {
  name: "Login",
  data() {
    return {
      user: {
        mobile: "13911111111", //手机号
        code: "246810", // 验证码
        agree: false // 是否同意协议
      },
      rules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { pattern: /^\d{6}$/, message: "请输入正确的验证码", trigger: "blur" }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback();
              } else {
                callback(new Error("请勾选协议"));
              }
            },
            trigger: "change"
          }
        ]
      },
      loading: false //登录按钮状态
    };
  },
  methods: {
    // 登录
    onLogin() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          return;
        }
        this.login();
      });
    },
    // 登录请求
    login() {
      this.loading = true;
      login(this.user)
        .then(res => {
          window.localStorage.setItem("user", JSON.stringify(res.data.data));
          this.loading = false;
          this.$router.push("/");
        })
        .catch(err => {
          this.$message.error(err.message);
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("./login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form {
    background-color: #fff;
    padding: 30px 50px 50px 50px;
    border-radius: 10px;
    min-width: 300px;
    .img-box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0;
      margin-bottom: 20px;
      img {
        width: 70%;
      }
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
