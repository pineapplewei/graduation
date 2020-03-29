<template>
  <div class="login">
    <div class="contain">
      <h1>专业培养计划管理系统</h1>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">账号：</label>
          <input type="text" class="form-control" id="exampleInputEmail1" placeholder="请输入账号" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">密码：</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="请输入密码"
          />
        </div>
        <div align="center" class="btn-con">
          <a class="btn btn-danger changecolor">登陆</a>
        </div>
        <p style="text-align: right;color: gray; ">魏攀</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {};
  }
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 100vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
h1 {
  color: #dc3545;
  text-align: center;
}
.form-group {
  color: #dc3545;
}
.contain {
  width: 600px;
  height: 600px;
}
.btn-con {
  margin-top: 60px;
}
.form-group {
  margin: 50px;
}
.changecolor{
  width: 400px;
}
</style>
