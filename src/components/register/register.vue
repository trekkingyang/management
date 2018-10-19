<template>
  <div>
    <el-form :model="userForm" status-icon  ref="userForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="昵称" prop="name">
        <el-input type="text" v-model="userForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="email" prop="email">
        <el-input type="text" v-model="userForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password">
        <el-input type="checkPassword" v-model="userForm.checkPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
        <el-button @click="resetForm('userForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import request from '@/utils/request'
  export default{
    data (){
      return {
        userForm: {
          name: '',
          email: '',
          password: '',
          checkPassword: ''
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          delete this.userForm.checkPassword
          axios.post('http://localhost:8080/register',this.userForm).then(res => {
            console.log(res);
          })
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    components:{

    }
  }
</script>

<style>

</style>
