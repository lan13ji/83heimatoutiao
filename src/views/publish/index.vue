<template>
    <el-card>
        <bread-crumb slot="header">
            <template slot="title">发布文章</template>
        </bread-crumb>
        <el-form label-width="125px">
            <el-form-item label="标题">
                <el-input class="article-title"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input type="textarea" :row="5" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="封面">
                <el-radio-group>
                    <el-radio label="单图"></el-radio>
                    <el-radio label="三图"></el-radio>
                    <el-radio label="无图"></el-radio>
                    <el-radio label="自动"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道" placeholder="请选择">
                <el-select>
                    <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">发表</el-button>
                <el-button>存入草稿</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: []
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((result) => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style lang="less" scoped>
.article-title{
    width: 400px;
}
</style>
