<template>
  <!-- separator 是分隔符 -->
  <el-breadcrumb separator=">">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
      <a href="/">
        <!-- 定义一个插槽 -->
        <slot name="title"></slot>
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {}
</script>

<style>
</style>
