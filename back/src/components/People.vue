<template>
  <div class="People">
    <h1>人员管理页面</h1>
    <div class="peopleinput">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="学号">
          <el-input v-model="number"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-select v-model="options.value" placeholder="角色">
          <el-option
            v-for="item in options"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
        <el-form-item :data="tableData">
          <template>
            <el-button type="primary">查询</el-button>
            <el-button type="primary" @click="add(insert,tableData,options)">添加</el-button>
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
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
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
  data(){
    return{
      insert:{},
      labelPosition: "left",
      number:"",
      name:"",
      value:"",
      options: [
        {
          value: "管理员",
          label: "管理员"
        },
        {
          value: "学生",
          label: "学生"
        }
      ],
      tableData: []
    };
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    add(insert, tableData,options) {
      insert={}
      insert.personcount = this.number;
      insert.personname = this.name;
      insert.role = this.options.value;
      tableData[0].push(insert);
    }
  },
  created(){
    this.$axios.get('http://localhost:3000/getPersonlist')
    .then((res)=>{
      this.tableData.push(res.data.list)
    })
    .catch(function(res){
      console.log('非常抱歉调用接口失败')
    })
  }
};
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