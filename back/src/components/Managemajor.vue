<template>
  <div class="Managemajor">
    <h1>专业管理页面</h1>
    <div class="majoroperate">
      <div class="fontsize">专业名称</div>
      <input type="text" size="35" v-model="name" />
      <el-button type="primary" @click.native.prevent="add()" >添加</el-button>
    </div>
    <div class="majorlist">
      <el-table :data="majorlist[0]" style="width: 60%" height="350">
        <el-table-column type="index" :index="indexMethod" width="100"></el-table-column>
        <el-table-column prop="majorname" label="名称" width="300"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      majorlist: [],
      delnumber:''
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    add(){
      this.$axios
        .post("http://localhost:3000/addmajor", {
          params: {
            name: this.name
          }
        })
        .then(res => {
          this.$message({
              showClose: true,
              message: '恭喜你，添加成功',
              type: 'success'
          });
        })
        .catch(function(res) {
          console.log("非常抱歉调用接口失败");
        });      
    },
    del(obj){
      this.$axios
        .post("http://localhost:3000/delmajor", {
          params: {
            delnumber: obj.id
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
    }
  },
  created(){
    this.$axios
        .post("http://localhost:3000/getmajor")
        .then(res => {
          this.majorlist.push(res.data.list);
          // console.log(res.data.list)
          this.name = "";
        })
        .catch((res) =>{
          this.$message.error('请求专业列表失败');
        });
  }
};
</script>

<style scoped>
.Managemajor {
  width: 80%;
  background-color: white;
  height: 100vh;
  float: right;
}
.majoroperate {
  width: 100%;
  display: flex;
  justify-content: left;
  text-align: center;
}
.majorlist {
  margin-top: 40px;
}
.fontsize {
  text-align: left;
  font-size: 1.5rem;
  line-height: 2.5rem;
}

h1 {
  text-align: left;
  line-height: 200px;
}
</style>