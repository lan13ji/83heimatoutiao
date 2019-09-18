<template>
  <div class="login">
    <!-- 使用elemnetUI组件 el-card -->
    <el-card class="login-card">
      <!-- 匿名插槽 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单，用el-form包裹 -->
      <!-- 数据校验 先绑定 model属性,rules规则 -->
      <el-form :model="loginForm" :rules="loginRules" ref="myForm" style="margin-top:20px">
          <!-- 每一个表单域由一个 Form-item 组件构成 -->
          <!-- form-item prop属性绑定 表单组件的 校验字段名 -->
        <el-form-item prop="mobile">
          <!-- 表单域中可以放置各种类型的表单控件，包括Input、Select、Checkbox -->
          <!-- 手机号 绑定 v-model -->
          <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input placeholder="请输入验证码" style="width:65%" v-model="loginForm.code"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>

        <!-- 同意选项 -->
        <el-form-item prop="agree">
          <el-checkbox v-model="loginForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callBack) {
      // rule当前规则
      // value当前表单项的值
      // callBack当前回调函数
      /* if (value) {
        callBack()
      } else {
        callBack(new Error('请您同意协议'))
      } */
      value ? callBack() : callBack(new Error('请您同意协议和条款'))
    }
    return {
      // 表单数据 是一个对象
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false // 是否同意协议
      },
      // 登录规则集合对象
      loginRules: {
        // 决定校验规则， key(字段名):value(对象数组)，一个对象就是一个校验规则
        mobile: [
          {
            required: true, // true 表示该字段必填，如果没有内容，就会提示消息
            message: '请输入您的手机号'
          },
          { pattern: /^1[3456789]\d{9}$/,
            message: '请输入正确的手机号'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入您的验证码'
          }, {
            pattern: /^\d{6}$/,
            message: '验证码位6位数字'
          }
        ],
        agree: [{ validator }]
      }
    }
  },
  methods: {
    login () {
      // 校验整个表单规则
      // validate 是一个方法，传入的是一个回调函数，函数中有两个参数，分别是是否校验成功/未校验成功的字段
      this.$refs.myForm.validate((isOk) => {
        if (isOk) {
          // 只有一切的校验通过之后，才会发送请求
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.loginForm
          }).then(result => {
            // 将返回的token令牌，存储到前端缓存中
            // console.log(result)
            window.localStorage.setItem('user-token', result.data.data.token)
            this.$router.push('/home')
          }).catch(() => {
            // console.log(error.message)
            this.$message({
              message: '手机号或者验证码出错',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
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
    height: 340px;
    .title {
        text-align: center;
        img {
            height: 45px;
        }
    }
  }
}
</style>
