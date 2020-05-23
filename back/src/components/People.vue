<template>
  <div class="People">
    <h1>人员管理页面</h1>
    <div class="peopleinput">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="学号">
          <el-input v-model="number"></el-input>
        </el-form-item>
        <el-form-item :data="tableData[0]">
          <template>
            <el-button type="primary" @click="find(tableData)">查询</el-button>
            <el-button type="primary"  @click="people = true">添加</el-button>
          </template>
        </el-form-item>
      </el-form>
    </div>

    <div class="contain">
      <el-table :data="tableData[0]" style="width: 70%" max-height="500">
        <el-table-column prop="id" label="序号" width="100"></el-table-column>
        <el-table-column prop="personcount" label="学号" width="250"></el-table-column>
        <el-table-column prop="personname" label="姓名" width="250"></el-table-column>
        <el-table-column prop="role" label="角色" width="90"></el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template>
            <el-button
              @click.native.prevent="delpeople(delnumber)"
              type="text"
              size="small"
            >移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="添加用户" :visible.sync="people">
      <el-form :model="form">
        <el-form-item label="用户姓名" :label-width="formLabelWidth">
          <el-input v-model="form.personname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input v-model="form.personcount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.personpassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="学生" value="学生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业id" :label-width="formLabelWidth">
          <el-input v-model="form.pmjn_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门id" :label-width="formLabelWidth">
          <el-input v-model="form.pdtm_id" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="people = false">取 消</el-button>
        <el-button type="primary" @click="submit(tableData,form,people)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      people:false,
      insert: {},
      number: "",
      delnumber:'',
      tableData: [],
      personname: '',
      personcount: '',
      personpassword: '',
      role: '',
      pmjn_id: '',
      pdtm_id: '',
      form: {
          personname: '',
          personcount: '',
          personpassword: '',
          role: '',
          pmjn_id: '',
          pdtm_id: ''
        },
      formLabelWidth: '120px'
    };
  },
  methods: {
    delpeople(delnumber){
      this.$axios
        .post("http://localhost:3000/delPerson", {
          params: {
            delnumber: this.delnumber
          }
        })
        .then(res => {
          this.$message({
              showClose: true,
              message: '恭喜你，删除成功',
              type: 'success'
          });
        })
        .catch(function(res) {
          console.log("非常抱歉调用接口失败");
        });
    },
    find(tableData) {
      this.$axios
        .post("http://localhost:3000/getPerson", {
          params: {
            count: this.number
          }
        })
        .then(res => {
          this.delnumber = res.data.list[0].id
          this.tableData.push(res.data.list);
          console.log(this.tableData);
          this.number = "";
          this.name = "";
          this.role = "";
        })
        .catch(function(res) {
          console.log("非常抱歉调用接口失败");
        });
    },
    submit(tableData,form,people){
        this.people = false
        this.personname=form.personname
        this.personcount=form.personcount
        this.personpassword=form.personpassword
        this.role=form.role
        this.pmjn_id=form.pmjn_id
        this.pdtm_id=form.pdtm_id
        this.$axios.post('http://localhost:3000/addPerson',{
            params:{
              personname: this.personname,
              personcount:this.personcount,
              personpassword:this.personpassword,
              role:this.role,
              pmjn_id:this.pmjn_id,
              pdtm_id:this.pdtm_id
              }
            })
            .then((res)=>{
              this.$message({
              showClose: true,
              message: '恭喜你，添加成功',
              type: 'success'
        });
            })
            .catch(function(res){
              console.log('非常抱歉调用接口失败')
            })             
        },

    }
}
</script>

<style scoped>
.People {
  width: 80%;
  background-color: white;
  height: 100vh;
  float: right;
}
.peopleinput {
  margin-top: 30px;
  text-align: left;
}
.contain {
  text-align: center;
}
h1 {
  text-align: left;
  line-height: 200px;
}
</style>