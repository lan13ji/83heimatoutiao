<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <!-- el-table 表格 data属性是一个对象数组 -->
    <el-table :data="list">
      <!-- el-table-column 列 属性prop,键名（字段名） 属性label,表头-->
      <el-table-column width="600px" label="标题" prop="title"></el-table-column>
      <el-table-column align="center" label="评论状态" prop="comment_status"></el-table-column>
      <el-table-column align="center" label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column align="center" label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column align="center" label="操作"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    //   获取评论列表
    getComment () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'
        } // params 是路径参数 也就是 query参数
      }).then(result => {
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getComment()
  }
}

</script>

<style>

</style>
