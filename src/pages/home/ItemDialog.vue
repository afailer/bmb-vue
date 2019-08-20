<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    width="30%"
  >
    <el-form ref="form" :model="form" labelWidth="59px" labelPosition="left">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="标题图">
        <el-input v-model="form.icon"></el-input>
      </el-form-item>
      <el-form-item label="类别">
        <el-input v-model="form.content_type"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import { addContent,patchContent } from '../../utils/api'
  export default {
    name: 'itemDialog',
    data (){
      return {
        isAdd: false,
        dialogVisible: false,
        form: {},
        title: ''
      }
    },
    methods: {
      showAdd(){
        this.dialogVisible = true
        this.isAdd = true
        this.title = '添加商品'
        this.form = {
          icon: '',
          title: '',
          content_type: ''
        }
      },
      showUpdate(rowData){
        this.dialogVisible = true
        this.isAdd = false
        this.title = '修改商品'
        this.form = window.deepclone(rowData)
      },
      addFormData () {
        this.$refs.form.validate((valid) => {
          if (valid){
            addContent(this.form).then(res => {
              if (res.data.code === 0 ){
                this.$message.success(res.data.msg || "成功添加" )
              }else {
                this.$message.error(res.data.msg)
              }
              this.dialogVisible = false
              this.form = {}
              this.$emit('finish')
            })
          }else {
            return false
          }
        });
      },
      updateFormData(){
        this.$refs.form.validate((valid) => {
          if(valid){
            patchContent(this.form).then(res => {
              if(res.data.code === 0){
                this.$message.success(res.data.msg || "修改成功" )
              }else {
                this.$message.error(res.data.msg || '修改失败')
              }
              this.dialogVisible = false
              this.form = {}
              this.$emit('finish')
            })
          }
        })
      },
      handleSubmit(){
        if(this.isAdd){
          this.addFormData();
        }else{
          this.updateFormData();
        }
      }
    }
  }
</script>
