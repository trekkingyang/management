<template lang="html">
  <div>
    <el-dialog :visible.sync="show" @open="initData()" @close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="视频名称" required prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop = 'thumb' required>
          <el-input disabled v-model="form.thumb"></el-input>
          <el-upload
            action="/upload"
            name="avatar"
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="ID" required prop="videoId">
          <el-input v-model="form.videoId"></el-input>
        </el-form-item>
        <el-form-item label="类型" required prop="type">
          <el-select v-model="form.type" placeholder="请选类型">
            <el-option label="视频" value="video"></el-option>
            <el-option label="图片" value="image"></el-option>
            <el-option label="文章" value="article"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="APP" required prop="appName">
          <el-select v-model="form.appName" placeholder="APP" @change="getCategory()">
            <el-option v-for="item in apps"  :key="item.englishName" :label="item.chineseName" :value="item.englishName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类" required prop="category" >
          <el-select v-model="form.category" placeholder="分类">
            <el-option v-for="item in categorys" :key="item.englishName" :label="item.chineseName" :value="item.englishName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源" required prop="source">
          <el-select v-model="form.source" placeholder="分类">
            <el-option label="QQ" value="qq"></el-option>
            <el-option label="优酷" value="youku"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="onSubmit">立即创建</el-button>
          <el-button @close="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import request from '@/utils/request'
  export default{
    props: ['dialogShow','mode','detail'],
    data (){
      return {
        loading: false,
        apps: [],
        categorys: [],
        form: {
          title: '',
          thumb: '',
          type: 'video',
          appName: '',
          category: '',
          source: 'qq',
          videoId: '',
          content: ''
        },
        fileList: [],
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
      createItemShow() {
        this.$emit('handleClose')
      },
      initData() {
        if(this.mode === 'edit') {
          this.form = this.detail
        } else {
          this.form = {
            title: '',
            thumb: '',
            type: 'video',
            appName: '',
            category: '',
            source: 'qq',
            videoId: '',
            content: ''
          }
        }

        this.getApp()
        this.getCategory()
      },
      getApp() {
        request({
          url: '/app',
          method: 'get'
        }).then(res => {
          this.apps = res.data
        })
      },
      getCategory() {
        request({
          url: '/category',
          method: 'get',
          params: {appName: this.form.appName}
        }).then(res => {
          this.categorys = res.data
        })
      },
      onSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            this.mode === 'create' ? this.add() : this.update()

          } else {
            return false;
          }
        });
      },
      add() {
        request({
          url: 'detail',
          method: 'post',
          data: this.form
        }).then(res => {
          if(!res.code) {
            this.loading = false
            this.$emit('handleClose')
          } else {
            this.$message.error(res.message)
          }
        })
      },
      update() {
        this.form.id = this.form._id
        request({
          url: '/detail',
          method: 'put',
          params: this.form
        }).then(res => {
          if(!res.code) {
            this.loading = false
            this.$emit('handleClose')
          } else {
            this.$message.error(res.message)
          }
        })
      },
      upload() {
        let inputDOM = this.$refs.inputer;
        this.file = inputDOM.files[0]
        console.log("inputDOM.files[0]:"+inputDOM.files[0]);
        var formdata = new FormData();
        formdata.append('avatar',inputDOM.files[0]);
        request({
          url: '/upload',
          method: 'post',
          data: formdata
        }).then(res => {
          this.url = res.data.url
        })
      },
      handleAvatarSuccess(res, file) {
        this.form.thumb = res.url
      },
      handleRemove() {
        this.form.thumb = ''
      },
    },
    components:{

    }
  }
</script>
