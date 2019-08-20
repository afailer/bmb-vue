<template>

  <div class="header">


    <div class="home">


      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px">

        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model.number="ruleForm.phone_num"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dologin">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>
<script>
  import { login } from '../../utils/api'
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号码不能为空'));
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        }
        const isPhone = /^1(3|4|5|6|7|8|9)\d{9}$/.test(value)
        console.log(isPhone)
        if (!isPhone) {
          return callback(new Error('手机号码有误，请重填'));
        } else {
          callback();
        }


      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if (value.length <= 4){
          callback(new Error('密码位数不能小于四位'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '123123',
          checkPass: '123123',
          phone_num: '18601302047'
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          phone_num: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      dologin() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            login(this.ruleForm).then(res => {
              debugger
              if(res.data.code === 0){
                this.$message.success(res.data.msg || '登录成功')
                localStorage.setItem('token', res.data.data)
                this.$router.push({
                  path: '/home'
                })
              }else{
                this.$message.error(res.data.msg)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
  .header {
    display: flex;
    justify-content: center;
  }
  .home {
    width: 40%;
    background-color: #cacaca;
    padding: 30px 50px 10px 30px;
    margin-top: 18%;
  }
</style>
