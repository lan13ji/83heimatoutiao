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
      <el-dropdown trigger="click">
        <!-- 匿名插槽 -->
        <span class="el-dropdown-link drop-menu">
          {{userInfo.name}} <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <!-- 具名插槽 -->
        <el-dropdown-menu solt="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>Git地址</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
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
      let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(result => {
        // 接收数据对象
        this.userInfo = result.data.data
      })
    },
    created () {
      this.getUserInfo()
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
