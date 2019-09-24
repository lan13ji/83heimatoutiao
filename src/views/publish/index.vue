<template>
    <el-card>
        <bread-crumb slot="header">
            <template slot="title">发布文章</template>
        </bread-crumb>
        <el-form ref="publishForm" label-width="125px" :model="formData" :rules="publisthRules">
            <el-form-item label="标题" prop="title">
                <el-input class="article-title" v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input type="textarea" v-model="formData.content" :row="5" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="封面" prop="cover.type">
                <el-radio-group v-model="formData.cover.type">
                    <el-radio label="单图"></el-radio>
                    <el-radio label="三图"></el-radio>
                    <el-radio label="无图"></el-radio>
                    <el-radio label="自动"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道" placeholder="请选择" prop="channel_id">
                <el-select>
                    <el-option v-model="formData.channel_id" v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="publish">发表</el-button>
                <el-button>存入草稿</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      // 表单数据对象
      formData: {
        title: '',
        content: '',
        channel_id: null,
        cover: {
          // 封面类型 -1：自动，0：无图，1:一张，2：三张
          type: 0,
          images: []
        }
      },
      // 发布规则
      publisthRules: {
        title: [{ required: true, message: '标题不能为空' }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '请选择频道' }]
      }
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((result) => {
        this.channels = result.data.channels
      })
    },
    publish () {
      this.$ref.publishForm.validate((isOK) => {
        if (isOK) {

        }
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
