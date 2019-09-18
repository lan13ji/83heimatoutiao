<template>
  <div class="login">
    <!-- 使用elemnetUI组件 -->
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单，用el-form包裹 -->
      <el-form>
          <!-- 每一个表单域用el-form-item包裹 -->
        <el-form-item>
            <!--  -->
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
            <!-- 验证码 -->
          <el-input style="width:65%"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <!-- 同意选项 -->
          <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
            <!-- 登录按钮 -->
          <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
/* 如果要在组件样式中写less, 就要给一个lang属性 lang='less'
 如果加了scoped属性 name该style就会只对当前组件有效*/
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../../assets/img/login_bg.jpg");
  background-size: cover;
  .login-card {
    width: 440px;
    height: 330px;
    .title {
        text-align: center;
        img {
            height: 45px;
        }
    }
  }
}
</style>
