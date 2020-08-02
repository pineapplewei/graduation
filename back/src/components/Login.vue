<template>
  <div class="Login">
    <h1>专业培养方案管理系统</h1>
    <div class="formcontain">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="formcontain1"
      >
        <el-form-item label="账号" prop="number">
          <el-input type="text" v-model="ruleForm.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleForm)">登陆</el-button>
          <el-button @click="resetForm(ruleForm)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        pass: "",
        number: ""
      }
    };
  },
  methods: {
    submitForm(ruleForm) {
      this.$axios.post('http://localhost:3000/login',{
        params:{
          count: ruleForm.number,
          password: ruleForm.pass
          }
        })
        .then(res => {
          if(res.data.list.length==0){
            this.$message.error('没有此用户');
            this.$refs[ruleForm].resetFields();
          }else{
            // console.log("您可以登陆您的信息是:", res.data);
            this.$router.push({path:'/home',query:{ obj:res.data}})
            console.log(res.data)
            this.$store.state.admin.push(res.data)
            console.log('检测开始')
            console.log(this.$store.state.admin)
          }
        })
        .catch(res=> {
          console.log('登陆失败了555')
        });
    },

    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    }
  }
};

</script>
<style scoped>
.Login {
  width: 100%;
  height: 100vh;
  background-color: white;
}
h1 {
  margin-top: 100px;
  color: #dc3545;
  text-align: center;
}
.formcontain1 {
  width: 35%;
  margin: 30px;
  text-align: center;
}
.formcontain {
  display: flex;
  justify-content: center;
  margin: 50px;
}
</style>
