<template>

  <el-container>
    <el-main>
      <el-row>
        <el-button @click="dialogShow = true" type="primary" style="float:right">添加</el-button>
      </el-row>
      <el-table :data="list" style="text-align: left">
        <el-table-column prop="title" label="名称">

        </el-table-column>
        <el-table-column prop="thumb" label="图片">

        </el-table-column>
        <el-table-column prop="category" label="类型">

        </el-table-column>
        <el-table-column prop="source" label="来源">

        </el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="editItem(scope.row)">编辑</el-button>
            <el-button size="mini" @click="deleteItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialogShow">
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
          <el-form-item label="分类" required prop="category">
            <el-select v-model="form.category" placeholder="分类">
              <el-option label="基础" value="basics"></el-option>
              <el-option label="专项" value="special"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="来源" required prop="source">
            <el-select v-model="form.source" placeholder="分类">
              <el-option label="QQ" value="qq"></el-option>
              <el-option label="优酷" value="youku"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      form: {
        title: '',
        thumb: '',
        type: 'video',
        category: '',
        source: 'qq',
        videoId: ''
      },
      dialogShow: false,
      list: [],
      fileList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          axios.post('/add',this.form).then(res => {
            this.dialogShow = false
            this.getList()
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getList() {
      axios.get('/getList').then(res => {
        this.list = res.data.data
      })
    },
    deleteItem(item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/delete/'+item.id).then(res => {
          this.$message.success('删除成功')
          this.getList()
        })
      })

    },
    add() {
      axios.post('/add',this.form).then(res => {

        !res.code ? this.getList() : this.$message.error(res.message)

      })
    },
    upload() {
      let inputDOM = this.$refs.inputer;
      this.file = inputDOM.files[0]
      console.log("inputDOM.files[0]:"+inputDOM.files[0]);
      var formdata = new FormData();
      formdata.append('avatar',inputDOM.files[0]);
      axios.post('/upload',formdata,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res=>{
        this.url = res.data.url
      })

    },
    handleAvatarSuccess(res, file) {
      this.form.thumb = res.url
    },
    handleRemove() {
      this.form.thumb = ''
    },
    editItem(row) {
      this.form = row
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
</style>
