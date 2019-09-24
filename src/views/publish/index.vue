<template>
    <el-card>
        <bread-crumb slot="header">
            <template slot="title">发布文章</template>
        </bread-crumb>
        <el-form ref="publishForm" label-width="125px" :model="formData" :rules="publisthRules">
            <el-form-item label="标题" prop="title">
                <el-input class="article-title" v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content" style="height:360px">
                <quill-editor v-model="formData.content" style="height:260px"></quill-editor>
            </el-form-item>
            <el-form-item label="封面" prop="cover">
                <el-radio-group v-model="formData.cover.type" @change="changeType">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道" placeholder="请选择" prop="channel_id">
                <el-select v-model="formData.channel_id">
                    <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="publish(false)">发表</el-button>
                <el-button @click="publish(true)">存入草稿</el-button>
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
        title: [{
          required: true, message: '标题不能为空'
        }, {
          min: 5, max: 30, message: '标题长度控制在5-30个字符之间'
        }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '请选择频道' }]
      }
    }
  },
  methods: {
    changeType () {
      let key = this.formData.cover.type
      switch (key) {
        case 1:
          // images 长度 1
          this.formData.cover.images = ['']
          break
        case 3 :
          this.formData.cover.images = ['', '', '']
          break
        default:
          this.formData.cover.images = []
          break
      }
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((result) => {
        this.channels = result.data.channels
      })
    },
    // 根据文章id获取文章详情
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then((result) => {
        this.formData = result.data
      })
    },
    publish (draft) {
      this.$refs.publishForm.validate((isOK) => {
        if (isOK) {
          let { articleId } = this.$route.params
          this.$axios({
            url: articleId ? `/articles/${articleId}` : `/articles`,
            method: articleId ? 'PUT' : 'POST',
            params: { draft },
            data: this.formData
          }).then((result) => {
            this.$router.push('/home/articles')
          })
          /* if (articleId) {
            this.$axios({
              url: `/articles/${articleId}`,
              method: 'PUT',
              params: { draft }, // draft true 为草稿：false为正式内容
              data: this.formData
            }).then((result) => {
              this.$router.push('/home/articles')
            })
          } else {
            this.$axios({
              url: '/articles',
              method: 'POST',
              params: { draft }, // draft true 为草稿：false为正式内容
              data: this.formData

            }).then(() => {
            // 发布成功,回到内容列表
              this.$router.push('/home/articles')
            })
          } */
        }
      })
    }
  },
  created () {
    this.getChannels()
    // 有articleId就是编辑 没有就是新增
    // let articleId = this.$route.params.articleId
    let { articleId } = this.$route.params
    articleId && this.getArticleById(articleId)
  }
}
</script>

<style lang="less" scoped>
.article-title{
    width: 400px;
}
</style>
