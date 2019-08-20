<template>
  <div>
    <div>
  <el-button
    type="primary"
    style="margin-bottom: 20px;float: left"
    @click = "showAddDialog"
  >添加</el-button>
  <add-item-dialog
    ref="itemDialog"
    @finish = "getContents"
  ></add-item-dialog>
  <div>
    <el-table
      border
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
      >
      </el-table-column>

      <el-table-column
        prop="icon"
        label="标题图"
      >
      </el-table-column>

      <el-table-column
        prop="content_type"
        label="类别"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)">删除</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleSkip(scope.row)">跳转</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>

  </div>
</template>
<script>
  import { getContent,delContent } from '../../utils/api'
  import AddItemDialog from "./ItemDialog.vue"
  export default {
    components: { AddItemDialog },
    name : 'home',
    data() {
      return {
        dialogVisible: false,
        tableData: [

        ]
      }
    },
    mounted() {
      this.getContents()
    },
    methods: {
      handleEdit(row) {
        this.$refs.itemDialog.showUpdate(row)
      },
      handleDelete(id) {
        delContent(id).then(res => {
          this.getContents();
        })
       // rows.splice(index,1)
      },
      showAddDialog() {
        this.$refs.itemDialog.showAdd();
      },
      handleSkip(row){
        const id = row.id
        this.$router.push({
          name: 'skip',
          params: {id: id}
        })
      },

      getContents () {
        getContent().then(res => {
          this.tableData = res.data.data
        })
      }
    }
  }
</script>
