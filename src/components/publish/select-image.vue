<template>
  <el-tabs>
    <el-tab-pane label="素材库">
      <!-- 全部素材数据 -->
      <div class="imgs-list">
        <el-card class="imgs-item" v-for="item in list" :key="item.id">
          <img :src="item.url" alt @click="clickImg(item.url)" />
        </el-card>
      </div>
      <el-row type="flex" justify="center">
        <el-pagination
          background
          layout="prev,pager,next"
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片">
      <el-upload class="avatar-uploader" :show-file-list="false" action="" :http-request="uploadImg">
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    //  上传用户素材
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'POST',
        data
      }).then(result => {
        // 得到一个线上地址
        this.$emit('selectOne', result.data.url)
      })
    },
    clickImg (url) {
      this.$emit('selectOne', url)
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
.avatar-uploader {
  width: 178px;
  position: relative;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    font-size: 28px;
    color: #8c939d;
  }
}
.imgs-list {
  display: flex;
  flex-wrap: wrap;

  .imgs-item {
    width: 100px;
    height: 100px;
    margin: 10px;

    .el-card__body {
      padding: 0;

      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>
