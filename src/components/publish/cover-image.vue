<template>
  <div class="coverUpload">
    <div class="coverItem" v-for="(item,index) in images" :key="index">
      <img :src="item ? item : deafultImg" alt @click="openLayer(index)" />
    </div>
    <!-- 弹层组件 -->
    <el-dialog :visible="dialogVisible" @close="dialogVisible=false">
      <select-image @selectOne="receiveImg"></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      deafultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      selectIndex: -1
    }
  },
  methods: {
    openLayer (index) {
      this.dialogVisible = true
      this.selectIndex = index // 将当前点击的图片索引值传给data中的一个值
    },
    receiveImg (url) {
      this.$emit('selectImg', url, this.selectIndex)
      this.dialogVisible = false
    }
  },
  props: ['images']
}
</script>

<style lang="less" scoped>
.coverUpload {
  display: flex;

  .coverItem {
    width: 220px;
    margin-right: 10px;
    border: 1px solid #ddd;

    img {
      width: 100%;
      display: block;
    }
  }
}
</style>
