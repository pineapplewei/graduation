<template>
  <div class="Managemajor">
    <h1>专业管理页面</h1>
    <div class="majoroperate">
      <div class="fontsize">专业名称</div>
      <input type="text" size="35" v-model="name"/>
      <el-button type="primary" @click.native.prevent="find(majorlist)">查询</el-button>
      <el-button type="primary" @click.native.prevent="add(majorname,majorlist)">添加</el-button>
    </div>
    <div class="majorlist">
      <el-table :data="majorlist[0].list" style="width: 40%">
        <el-table-column type="index" :index="indexMethod" width="100"></el-table-column>
        <el-table-column prop="majorname" label="名称" width="300"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, majorlist)"
              type="text"
              size="small"
            >移除</el-button>
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
      majorlist: []
    };
  },
    methods: {
    indexMethod(index) {
      return index + 1;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    add(majorname,majorlist){
      var majorname={}
      majorname.name=this.name
      majorlist.push(majorname)
    },
    },
    created(){
      this.$axios.get('http://localhost:3000/')
    .then((res)=>{
      this.majorlist.push(res.data)
      console.log(this.majorlist)
    })
    .catch(function(res){
      console.log('非常抱歉调用接口失败')
    })
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