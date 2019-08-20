<template>
  <div>
    <el-button style="background-color: darkcyan;float: left"
               @click="addText">添加文本</el-button>
    <el-button style="background-color: white" @click="baocun">保存</el-button>
    <skip-dialog ref="skipDialog" @addDialog="addTextarea"
                 @addTextare="bjTextarea"></skip-dialog>
    <skip-content
      @editContent = "showEditDialog"
      ref="skipContent"
    >
    </skip-content>
  </div>
</template>

<script>
  import { patchContent } from  '../../utils/api'
  import skipDialog from './skipDialog.vue'
  import skipContent from './skipContent.vue'
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {
      ElButton,
      skipDialog,
      skipContent
    },
    methods: {
      addText () {
        this.$refs.skipDialog.showAdd()
      },
      showEditDialog(d,index){
        this.$refs.skipDialog.showEdit(d,index)
      },
      bjTextarea(index,type,addicon,desc){
        const info = {
          type: type,
          data: addicon,
          desc: desc
        };

        this.$refs.skipContent.editSkip(index, info)
      },
      addTextarea (type,addicon,desc){
        const info = {
          type: type,
          data: addicon,
          desc: desc
        }
        this.$refs.skipContent.addItemToSkip(info)
      },
      baocun (){
        this.$refs.skipContent.sybmitContent()
      }
    }
  }
</script>

