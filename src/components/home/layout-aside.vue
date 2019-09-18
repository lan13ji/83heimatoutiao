<template>
  <div class="layout-aside">
      <div class="home-logo">
          <img src="../../assets/img/logo_admin.png" alt="">
      </div>
      <el-menu class="el-menu-vertical-demo layout-menu" background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#ffd04b">
        <el-menu-item index="0">
            <!-- 图标 -->
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <!-- 内容管理 二级菜单 el-submenu -->
        <el-submenu index="1">
            <!-- el-submenu 插槽 title 一级显示内容 -->
            <template slot="title">
                <i class="el-icon-document"></i>
                <span>内容管理</span>
            </template>
            <el-menu-item index="1-1">发布文章</el-menu-item>
            <el-menu-item index="1-2">内容列表</el-menu-item>
            <el-menu-item index="1-3">评论列表</el-menu-item>
            <el-menu-item index="1-4">素材管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
            <!-- el-submenu 插槽 title 一级显示内容 -->
            <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>粉丝管理</span>
            </template>
            <el-menu-item index="2-1">图文数据</el-menu-item>
            <el-menu-item index="2-2">粉丝概况</el-menu-item>
            <el-menu-item index="2-3">粉丝画像</el-menu-item>
            <el-menu-item index="2-4">粉丝列表</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">
            <i class="el-icon-s-tools"></i>
            <span slot="title">账户信息</span>
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scope>
.layout-aside{
    width: 200px;
    height: 100vh;
    background-color: #323745;
    .home-logo {
        padding: 15px 0;
        background-color:#2e2f32;
        text-align: center;
        img {
            height: 30px;
        }
    }
    .layout-menu{
        border-right: none
    }
}
</style>
