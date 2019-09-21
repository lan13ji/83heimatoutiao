<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <!-- el-table 表格 data属性是一个对象数组 -->
    <el-table :data="list">
      <!-- el-table-column 列 属性prop,键名（字段名） 属性label,表头-->
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="评论状态"
        prop="comment_status"
        :formatter="fromatter"
      ></el-table-column>
      <el-table-column width="80px" align="center" label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column width="94px" align="center" label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column width="120px" align="center" label="操作">
        <!-- 作用域插槽 接收 eletalbe-column 组件的 row/column/$index/store -->
        <template slot-scope="editScope">
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small" :style="{color : editScope.row.comment_status ? '#909399' : '#409EFF'}" @click="closeComment(editScope.row)">
            {{
            editScope.row.comment_status ? "关闭评论" : "打开评论"
            }}
          </el-button>
        </template>
      </el-table-column>
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
    },
    // 类似filter 要return才有值
    fromatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
      // retrun row['comment_status'] ? '正常' : '关闭'
    },
    closeComment (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${mess}评论？`, {
        type: 'warning'
      }).then(() => {
        this.$axios({
          url: 'comments/status',
          method: 'put',
          params: { article_id: row.id.toString() },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(() => {
          // 成功后一定会进入 then
          this.getComment()
        })
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
