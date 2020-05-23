<template>
  <div class="Outlinelist">
    <h1>教学大纲列表页面</h1>
    <el-table :data="this.tableData[0]" style="width: 100%">
      <el-table-column
        prop="sourse_encouding"
        label="课程编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="classname"
        label="课程名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="outline"
        label="教学大纲"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="medium" type="danger" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      delnumber:""
    };
  },
  methods: {
    del(delobj) {
        this.delnumber=delobj.sourse_encouding
      this.$axios
        .post("http://localhost:3000/deloutline",{
          params: {
            delnumber: this.delnumber
          }
        })
        .then(res => {
          this.tableData.push(res.data.list);
          this.$message({
              showClose: true,
              message: '恭喜你，删除教学大纲成功',
              type: 'success'
          });
        })
        .catch(function(res) {
          console.log("非常抱歉调用接口失败");
        });
    }
  },
  created(){
      this.$axios
        .get("http://localhost:3000/outlinelist")
        .then(res => {
          this.tableData.push(res.data.list);
        })
        .catch(function(res) {
          console.log("非常抱歉调用接口失败");
        });
  }
};
</script>

<style scoped>
.Outlinelist {
  height: 100vh;
  width: 80%;
  text-align: center;
  float: left;
}
h1{
    text-align: left;
  line-height: 200px;
}
</style>