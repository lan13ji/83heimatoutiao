<template>
    <el-card class="user-form">
        <bread-crumb slot="header">
            <template slot="title">账户信息</template>
        </bread-crumb>
        <el-form label-width="120px" ref="accountForm" :model="formData" :rules="accountRules">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="formData.name" class="int-txt"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input v-model="formData.info" class="int-txt"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="formData.email" class="int-txt"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input disabled v-model="formData.mobile" class="int-txt"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click="saveUser">保存信息</el-button>
            </el-form-item>
        </el-form>
        <img class="user-img" :src="formData.photo? formData.photo : defaultImg" alt="">
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      formData: {},
      accountRules: {
        name: [{
          required: true, message: '用户名不能为空'
        }, {
          min: 1, max: 7, message: '用户名长度控制在1到7个字符之间'
        }],
        email: [{
          required: true, message: '邮箱不能为空'
        }, {
          pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不正确'
        }]
      }
    }
  },
  methods: {
    saveUser () {
      this.$refs.accountForm.validate((isOK) => {
        if (isOK) {
          this.$axios({
            url: '/user/profile',
            method: 'PATCH',
            data: this.formData
          }).then(result => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
          })
        }
      })
    },
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

<style lang="less" scoped>
.user-form{
    position: relative;

   .user-img {
      width: 200px;
      height: 200px;
      position: absolute;
      left: 500px;
      top: 72px;
  }

  .int-txt {
    width: 300px;
  }
}
</style>
