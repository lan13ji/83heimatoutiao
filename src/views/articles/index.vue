<template>
  <div>
    <el-card>
      <bread-crumb slot="header">
        <template slot="title">
          内容列表
        </template>
      </bread-crumb>
      <el-form class="form-query" >
        <el-form-item label='文章状态：'>
          <!-- v-model来源于 el-radio中的label属性 -->
          <el-radio-group v-model="formData.status" @change="changeCondition">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表：">
          <el-select v-model="formData.channel_id" placeholder="请选择" @change="changeCondition">
            <el-option v-for="item in channels"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择：">
          <el-date-picker
            @change="changeCondition"
            v-model="formData.date"
            type="daterange"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="article-item">
      <!-- 主体内容 -->
      <div class="info-tool">共找到{{page.total}}条符合条件的内容</div>
      <div class="info" v-for="(item, index) in list" :key="index">
          <p class="avatar"><img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt=""></p>
          <div class="cont">
            <p class="title">{{item.title}}</p>
            <el-tag class="status" :type="item.status | statusType">{{item.status | statusText}}</el-tag>
            <p class="date">{{item.pubdate}}</p>
          </div>
          <p class="right">
            <span><i class="el-icon-edit">修改</i></span>
            <span><i class="el-icon-delete">删除</i></span>
          </p>
      </div>
      <el-row type="flex" justify="center">
        <el-pagination
          background
          @current-change="changePage"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          layout="prev,pager,next"
          :total="page.total">
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5,
        channe_id: null,
        date: []
      },
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      channels: [],
      list: [],
      defaultImg: require('../../assets/img/404.png')
    }
  },
  methods: {
    // 状态变化事件
    changeCondition () {
      this.page.currentPage = 1
      this.queryArticles()
    },
    // 分页事件
    changePage (newPage) {
      this.page.currentPage = newPage
      this.queryArticles()
    },
    queryArticles () {
      // 因为值改变时 formData已经是最新的值，所以可以直接用
      let params = {
        status: this.formData.status === 5 ? null : this.formData.status,
        channe_id: this.formData.channe_id,
        begin_pubdate: this.formData.date.length > 0 ? this.formData.date[0] : null,
        end_pubdate: this.formData.date.length > 1 ? this.formData.date[2] : null,
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      console.log(params)
      this.getArticles(params)
    },
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params: params
      }).then((result) => {
        this.list = result.data.results // 获取文章列表
        this.page.total = result.data.total_count
      })
    },
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then((result) => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getArticles()
    this.getChannel()
  },
  filters: {
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        case 4:
          return 'danger'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.form-query{
  margin-left: 50px;
}
.article-item{
  margin-top:10px;
  justify-content: space-between;

  .info-tool{
    padding-bottom: 15px;
    border-bottom: 1px dotted #ccc;
  }

  .info{
    display: flex;
    border-bottom: 1px solid #f2f3f5;

    .cont{
      flex: 1;
      padding: 4px 0;

      .title{
        font-size:14px;
      }

      .date{
        font-size:12px;
        color: #999
      }
    }
    .avatar {
      width: 190px;
      padding-right: 10px;

      img{
        width: 180px;
        height: 100px;
        display: block;
      }
    }
    .right {
      padding: 6px 0;
      font-size: 12px;

      span{
        padding-left: 10px;
      }
    }
  }
}
</style>
