<template lang="html">
  <el-dialog :visible.sync="show" @close="handleClose">
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
          desc: ''
        },
        show: false
      }
    },
    watch: {
      dialogShow(cur,old) {
        this.show = cur
      }
    },
    methods: {
      handleClose() {
        this.$emit('handleClose')
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
          url: '/app',
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
    },
    components:{

    }
  }
</script>

<style>

</style>
