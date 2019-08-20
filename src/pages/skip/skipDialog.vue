<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    width="30%"
  >
    <el-radio-group v-model="type">
      <el-radio :label=1>文本</el-radio>
      <el-radio :label=2>图片地址</el-radio>
      <el-radio :label=3>音频地址</el-radio>
    </el-radio-group>
    <el-form labelWidth="59px" labelPosition="left">
      <el-form-item label="标题">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="data">
        </el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="desc">
        </el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTarea">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import { patchContent } from '../../utils/api'
  export default {
    data (){
      return {
        type : 2,
        dialogVisible : false,
        title: '',
        data: '',
        desc: '',
        index:''
      }
    },
    methods: {
      showAdd(){
        this.dialogVisible=true;
        this.isAddShow = true
        this.type=2;
        this.data = '';
        this.desc = ''
      },
      showEdit(d,index){
        this.index = index
        this.dialogVisible= true
        this.isAddShow = false
        this.data = d.data;
        this.desc = d.desc;
        this.type = d.type
      },
      addTarea () {
        if(this.isAddShow){
          this.$emit('addDialog',this.type, this.data,this.desc)
          this.data = ''
          this.desc = ''
          this.dialogVisible = false
        }else {
          debugger
          this.$emit('addTextare',this.index,this.type, this.data,this.desc)
          this.data = ''
          this.desc = ''
          this.dialogVisible = false
        }

      }
    }
  }
</script>
