<template>
    <div class="coverUpload">
        <div class="coverItem" v-for="(item,index) in images" :key="index">
            <img :src="item ? item : deafultImg" alt="">
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      deafultImg: require('../../assets/img/pic_bg.png')
    }
  },
  props: ['images']
}
</script>

<style lang="less" scoped>
    .coverUpload{
        display:flex;

        .coverItem{
            margin-right:10px;
            border: 1px solid #ddd;

            img {
                display: block
            }
        }
    }
</style>
