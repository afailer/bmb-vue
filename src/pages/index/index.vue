<template>
  <div>
    <el-button style="background-color: darkcyan" @click="tuichu">退出登录</el-button>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
     methods: {
       tuichu() {
         localStorage.removeItem('token')
         this.$router.push('/login')
       }
     }


  }
</script>
