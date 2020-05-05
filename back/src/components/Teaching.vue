<template>
  <div class="Teaching">
    <h1>教学大纲管理页面</h1>
    <div class="Plan">
      <div class="Plan_top">
        <el-form :model="formInline" label-width="250px">
          <el-form-item label="专业名称" label-width="100px">
            <el-input type="text" v-model="formInline.majorname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label-width="200px">
            <el-button type="primary" @click="find(formInline)">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>您查询到的专业名称是：{{majorname}}</div>
      <div class="Plan_contain">
        <el-table :data="this.tableData[0].list" style="width: 40%">
          <el-table-column type="index" :index="indexMethod" width="100"></el-table-column>
          <el-table-column prop="outname" label="课程名称" width="300"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <input type="file" id="files" />
              <a href="./assets/logo.png" download="./assets/logo.png">下载</a>
              <el-button type="text">查看</el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData,form)"
                type="text"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog title="添加课程" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="课程类别" :label-width="formLabelWidth">
            <el-select v-model="form.value" placeholder="请选择活动区域">
              <el-option label="公共基础必修课" value="公共基础必修课"></el-option>
              <el-option label="专业基础必修课" value="专业基础必修课"></el-option>
              <el-option label="专业基础选修课" value="专业基础选修课"></el-option>
              <el-option label="专业必修课" value="专业必修课"></el-option>
              <el-option label="专业选修课" value="专业选修课"></el-option>
              <el-option label="方向必修课" value="方向必修课"></el-option>
              <el-option label="方向选修课" value="方向选修课"></el-option>
              <el-option label="专业拓展环节" value="专业拓展环节"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程编码" :label-width="formLabelWidth">
            <el-input v-model="form.sourse_encoding" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="课程名称" :label-width="formLabelWidth">
            <el-input v-model="form.sourse_title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学期" :label-width="formLabelWidth">
            <el-input v-model="form.semester" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学分" :label-width="formLabelWidth">
            <el-input v-model="form.credit" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="总学时" :label-width="formLabelWidth">
            <el-input v-model="form.totalhours" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="授课" :label-width="formLabelWidth">
            <el-input v-model="form.teaching" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="实验" :label-width="formLabelWidth">
            <el-input v-model="form.experiment" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="实践" :label-width="formLabelWidth">
            <el-input v-model="form.practice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="考试" :label-width="formLabelWidth">
            <el-input v-model="form.examination" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="考查" :label-width="formLabelWidth">
            <el-input v-model="form.investigate" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="查看课程" :visible.sync="dialogVisible" width="70%">
        <ul>
          <li v-for="item in form.classlist" :key="item.value">{{item.name}}</li>
        </ul>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        majorname: "计算机科学与技术"
      },
      flag: false,
      dialogVisible: false,
      dialogFormVisible: false,
      majorname: "",
      form: {
        value: "专业基础必修课",
        sourse_encoding: "1",
        sourse_title: "大学英语1",
        semester: "1",
        credit: "4",
        totalhours: "48",
        teaching: "36",
        experiment: "0",
        practice: "12",
        examination: "0",
        investigate: "0",
        classlist: [
          { name: "公共基础必修课" },
          { name: "专业基础必修课" },
          { name: "专业基础选修课" },
          { name: "专业必修课" },
          { name: "专业选修课" },
          { name: "方向必修课" },
          { name: "方向选修课" },
          { name: "专业拓展环节" }
        ]
      },
      formLabelWidth: "120px",
      tableData: []
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    deleteRow(index, rows, form) {
      rows.splice(index, 1);
      console.log(form);
    },
    find(formInline) {}
  },
  created() {
    if (this.$store.state.admin[0].list[0].role == "学生") {
      this.flag = true;
    }
    this.$axios
      .get("http://localhost:3000/getoutlinelist")
      .then(res => {
        console.log(res.data);
        this.tableData.push(res.data);
        console.log(this.tableData[0].list);
        this.majorname = this.formInline.majorname;
      })
      .catch(function(res) {
        console.log("非常抱歉调用接口失败");
      });

    // this.$axios
    //   .get("http://localhost:3000/getoutlinelist")
    //   .then((res) => {
    //     console.log(res.data);
    //     // this.tableData.push(res.data);
    //     // console.log(this.tableData);
    //     // this.majorname = this.tableData[0].majorlist[0].majorname;
    //   })

    //   .catch(function(res) {
    //     console.log("请求大纲失败");
    //   });
  }
};
</script>

<style scoped>
.Teaching {
  width: 80%;
  background-color: white;
  height: 100vh;
  float: right;
}
.Plan_top {
  width: 100%;
  display: flex;
  justify-content: left;
  text-align: center;
  margin-top: 30px;
}
.fontsize {
  text-align: center;
  font-size: 1.5rem;
  line-height: 2.5rem;
}
h1 {
  text-align: left;
  line-height: 200px;
}
</style>