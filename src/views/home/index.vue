<template>
  <!-- 先定义一个大容器 -->
  <el-container>
    <!-- 先放置一个左侧 -->
    <el-aside style="width:200px;background-color: #323745;">
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧大容器 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <layout-heade></layout-heade>
      </el-header>
      <!-- 中部区域 -->
      <el-main style="padding:0">
        <!-- 二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}

</script>

<style>

</style>
