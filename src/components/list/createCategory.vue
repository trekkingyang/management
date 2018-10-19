<template lang="html">
  <el-dialog :visible.sync="show" @open="initData()" @close="handleClose">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="中文名称" required prop="chineseName">
        <el-input v-model="form.chineseName"></el-input>
      </el-form-item>
      <el-form-item label="英文名称" required prop="englishName">
        <el-input v-model="form.englishName"></el-input>
      </el-form-item>
      <el-form-item label="描述" required prop="desc">
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="APP" required prop="appName">
        <el-select v-model="form.appName" placeholder="APP" @change="getCategory()">
          <el-option v-for="item in apps"  :key="item.englishName" :label="item.chineseName" :value="item.englishName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @close="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import request from '@/utils/request'
  export default{
    props: ['dialogShow'],
    data (){
      return {
        form: {
          chineseName: '',
          englishName: '',
          desc: '',
          appName: ''
        },
        apps: [],
        show: false
      }
    },
    watch: {
      dialogShow(curVal,oldVal) {
        this.show = curVal
      }
    },
    methods: {
      handleClose() {
        this.$emit('handleClose')
      },
      initData () {
        this.form = {
          chineseName: '',
          englishName: '',
          desc: '',
          appName: ''
        }
        request({
          url: '/app',
          method: 'get'
        }).then(res => {
          this.apps = res.data
        })
      },
      onSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.add()
          } else {
            return false;
          }
        });
      },
      add() {
        request({
          url: '/category',
          method: 'post',
          data: this.form
        }).then(res => {
          if(!res.code) {
            this.$message.success('success')
            this.handleClose()
          } else {
            this.$message.error(res.message)
          }
        })
      },
    }
  }
</script>
