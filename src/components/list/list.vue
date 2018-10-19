<template>

  <el-container>
    <el-main>
      <el-row>
        <el-button @click="createAppShow = true" type="primary" style="float:right">创建APP</el-button>
        <el-button @click="createCategoryShow = true" type="primary" style="float:right">添加APP分类</el-button>
        <el-button @click="createItemShow = true" type="primary" style="float:right">添加详情</el-button>
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
    </el-main>
    <create-item :dialogShow="createItemShow" @handleClose="handleClose('item')" :mode="detailMode" :detail="detail"></create-item>
    <create-category :dialogShow="createCategoryShow" @handleClose="handleClose('category')"></create-category>
    <create-app :dialogShow="createAppShow" @handleClose="handleClose('app')"></create-app>
  </el-container>
</template>

<script>
  import axios from 'axios'
  import request from '@/utils/request'
  import createItem from './createItem.vue'
  import createCategory from './createCategory.vue'
  import createApp from './createApp.vue'
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
      createItemShow: false,
      createCategoryShow: false,
      createAppShow: false,
      list: [],
      detailMode: 'create',
      detail: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      request({
        url: '/listAll',
        method: 'get'
      }).then(res => {
        this.list = res.data
      })
    },
    deleteItem(item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/detail',
          method: 'delete',
          data: {id: item.id}
        }).then(res => {
          this.getList()
        })
      })
    },
    editItem(row) {
      this.detailMode = 'edit'
      this.detail = row
      this.createItemShow = true
    },
    handleClose(type) {
      switch (type) {
        case 'item': this.createItemShow = false;break;
        case 'category': this.createCategoryShow = false;break;
        case 'createAppShow': this.createAppShow = false;break;
      }
    }
  },
  components: {
    createApp,createItem,createCategory
  }
}
</script>

