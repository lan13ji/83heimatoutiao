<template>
  <!-- 头部最外侧放置一个el-row -->
  <el-row class="layout-header" type="flex" justify="space-between" align="middle">
    <!-- 左侧 -->
    <el-col :span="9">
      <i class="el-icon-s-unfold"></i>
      <span class="title">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <!-- 右侧 -->
    <el-col :span="4">
      <img class="head-img" :src="userInfo.photo ? userInfo.photo : defaultImg" alt="">
      <!-- 下拉菜单组件 -->
      <el-dropdown trigger="click" @command="commonClick">
        <!-- 匿名插槽 -->
        <span class="el-dropdown-link drop-menu">
          {{userInfo.name}} <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <!-- 具名插槽 -->
        <el-dropdown-menu solt="dropdown">
          <!-- command属性会在触发点击时，携带给command事件的方法 -->
          <el-dropdown-item command="account">个人信息</el-dropdown-item>
          <el-dropdown-item command="git">Git地址</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        // 接收数据对象
        this.userInfo = result.data
      })
    },
    commonClick (key) {
      if (key === 'account') {
        this.$router.push('/home/account')
      } else if (key === 'git') {
        window.location.href = 'https://github.com/lan13ji/83heimatoutiao'
      } else {
        // 只能清楚本项目的所有前端缓存
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  }
}

</script>

<style lang="less" scoped>
  .layout-header {
    height: 50px;

    .el-icon-s-unfold {
      font-size: 22px;
      vertical-align: text-top;
    }

    .title {
      margin-left: 5px;
    }

    .head-img {
      width: 40px;
      height: 40px;
      margin-right: 5px;
      border-radius: 50%;
      vertical-align: middle;
    }

    .drop-menu {
      cursor: pointer;
    }
  }

</style>
