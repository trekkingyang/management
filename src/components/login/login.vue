<template>
  <div>
    <el-form :model="userForm" status-icon  ref="userForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="email" prop="email">
        <el-input type="text" v-model="userForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="name" prop="name">
        <el-input type="text" v-model="userForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
        <el-button @click="resetForm('userForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import {
    setToken,
    getToken
  } from '@/utils/auth'
  export default {
    data() {
      return {
        userForm: {
          email: '',
          password: '',
          name: ''
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          request({
            url: '/sign',
            method: 'post',
            data: this.userForm
          }).then(res => {
            if(!res.code) {
              setToken(res.data)
              location.href = location.host + '/list'
            } else {
              this.$message.error(res.data.message)
            }

          })
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>

</style>
