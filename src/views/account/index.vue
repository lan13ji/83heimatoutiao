<template>
    <el-card>
        <bread-crumb slot="header">
            <template slot="title">账户信息</template>
        </bread-crumb>
        <el-form label-width="120px">
            <el-form-item label="用户名">
                <el-input v-model="formData.name" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input v-model="formData.info" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="formData.email" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input disabled v-model="formData.mobile" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary'>保存信息</el-button>
            </el-form-item>
        </el-form>
        <img class="user-img" :src="formData.photo? formData.photo : defaultImg" alt="">
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      defaultImg: require('../../assets/img/404.png'),
      formData: {}
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style scoped>
    .user-img {
        width: 200px;
        height: 200px;
        position: absolute;
        left: 680px;
        top: 130px
    }

</style>
