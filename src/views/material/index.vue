<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-upload :http-request="uploadImg" :show-file-list="false" action class="toRight">
      <el-button type="primary">我太难了</el-button>
    </el-upload>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-item" v-loading="loading">
            <img :src="item.url" alt />
            <div class="operate">
              <i
                class="el-icon-star-on"
                @click="collectOrCancel(item)"
                :style="{color: item.is_collected ? '#F56C6C' : '#303133' }"
              ></i>
              <i class="el-icon-delete-solid" @click="delImg(item.id)"></i>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label=" 收藏素材" name="collect">
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-item">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
      <!-- 分页页面结构 -->
      <el-row type="flex" justify="center" style="margin: 20px 0">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="page.pageSize"
          :total="page.total"
          :current-page="page.currentPage"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      loading: true
    }
  },
  methods: {
    uploadImg (params) {
      const data = new FormData() // 声明一个新的表单
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(() => {
        this.$message({
          type: 'success',
          duration: 1500,
          message: '上传成功'
        })
        this.getMaterial()
      })
    },
    delImg (id) {
      this.$confirm('确定删除该图片吗？').then(() => {
        this.$axios({
          url: `/user/images/${id}`,
          method: 'DELETE'
        }).then(() => {
          this.$message({
            type: 'success',
            duration: 1500,
            message: '删除成功'
          })
          this.getMaterial()
        })
      })
    },
    collectOrCancel (item) {
      let mess = item.is_collected ? '取消' : ''
      this.$confirm(`您确定${mess}收藏该图片吗？`).then(() => {
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'PUT',
          data: { collect: !item.is_collected }
        }).then(() => {
          this.$message({
            type: 'success',
            duration: 1500,
            message: `已${mess}收藏`
          })
          this.getMaterial()
        })
      })
    },
    changePage (n) {
      this.page.currentPage = n
      this.getMaterial()
    },
    changeTab () {
      this.page.currentPage = 1
      this.getMaterial()
    },
    getMaterial (collect) {
      this.loading = true
      this.$axios({
        url: '/user/images',
        // this.activeName === 'collect' 相当于去找收藏的数据
        // 如果不等于collect 相等于去找全部数据
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.loading = false
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.toRight {
  position: absolute;
  right: 10px;
  margin-top: -10px;
  z-index: 1;
}

.img-list {
  display: flex;
  flex-wrap: wrap;

  .img-item {
    width: 160px;
    height: 160px;
    margin: 30px;
    position: relative;
    border-radius: 6px;

    img {
      width: 100%;
      height: 100%;
    }

    .operate {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: #f4f5f6;

      i {
        font-size: 20px;
      }
    }
  }
}
</style>
