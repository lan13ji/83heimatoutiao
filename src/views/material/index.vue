<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-item">
            <img :src="item.url" alt="">
            <div class="operate">
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">收藏素材</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: []
    }
  },
  methods: {
    handleClick (tab, event) {
      //   console.log(tab, event)
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false
        }
      }).then(result => {
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getMaterial()
  }
}

</script>

<style lang="less" scoped>
  .img-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .img-item {
      width: 180px;
      height: 180px;
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
