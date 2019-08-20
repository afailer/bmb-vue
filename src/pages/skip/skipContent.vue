<template>
<div>
  <div v-for="d,index in skip" style="border: 1px solid red">
    <span v-if="d.type === 1">{{ d.data }}</span>
    <img v-if="d.type === 2" :src="d.data"/>
    <audio v-if="d.type === 3" :src="d.data" controls="controls"></audio>
    <span style="margin-left: 20px">{{ d.desc }}</span>
    <el-button @click="btnChange(d,index)">编辑</el-button>
    <el-button @click="deleSkip(index)">删除</el-button>
    <i class="el-icon-upload2"  @click="uploadEl(index)" v-if="index !== 0"></i>
    <i class="el-icon-download"  @click="downloadEl(index)" v-if="index !== skip.length -1 "></i>

  </div>
</div>
</template>

<style>
  .el-icon-upload2{
    cursor: pointer;
  }
</style>

<script>
import { getContentById, patchContent } from "../../utils/api"
export default {
  data (){
    return {
      skip : []
    }
  },
  mounted() {
    this.getContent();
  },
  methods: {
    downloadEl(){

    },
    uploadEl(index){
      const temp = this.skip[index - 1]
      this.$set(this.skip, index - 1, this.skip[index])
      this.$set(this.skip, index, temp)
    },
    btnChange(d,index){
      this.$emit('editContent', d, index)
    },
    deleSkip(index){
      this.skip.splice(index, 1)
    },
    editSkip(index, info){
      this.$set(this.skip,index,info)
    },
    addItemToSkip(info){
      this.skip.push(info)
    },
    getContent(){
      getContentById(this.$route.params.id).then(res => {
        console.log(res.data)
        this.skip = JSON.parse(res.data.data.content) || [];
      })
    },
    sybmitContent(){
      const d = {
        id: this.$route.params.id,
        content: JSON.stringify(this.skip)
      };
      patchContent(d).then(res =>{
        this.$message.success(res.data.msg);
      })
    }
  }
}
</script>
