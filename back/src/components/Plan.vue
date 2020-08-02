<template>
  <div class="Plan">
    <h1>培养方案管理页面</h1>
    
    <div class="Plan_top">
      <div class="fontsize">专业名称</div>
      <input type="text" size="35" v-model="majorname" />
      <input type="text" size="35" v-model="yeartime" placeholder="请输入年" />
      <el-button type="primary" @click="find(majorname,classlist,yeartime)">查询</el-button>
      <el-button type="primary" @click="dialogplan = true" :disabled="flag">添加方案</el-button>
    </div>

    <div class="Plan_contain">
      <el-table
        :data="item.list"
        style="width: 100% ; text-aligh:center"
        v-for="item in classlist"
        :key="item.index"
      >
        <el-table-column prop="classcategory" label="课程类别名称" width="130"></el-table-column>
        <el-table-column prop="sourse_encouding" label="课程编码" width="80"></el-table-column>
        <el-table-column prop="classname" label="课程名称" width="120"></el-table-column>
        <el-table-column prop="semesernumber" label="学期" width="50"></el-table-column>
        <el-table-column prop="credit" label="学分" width="50"></el-table-column>
        <el-table-column prop="totalhours" label="总学时" width="70"></el-table-column>
        <el-table-column prop="teaching" label="教授" width="50"></el-table-column>
        <el-table-column prop="experiment" label="实验" width="50"></el-table-column>
        <el-table-column prop="practice" label="实践" width="50"></el-table-column>
        <el-table-column prop="examination" label="考试" width="50"></el-table-column>
        <el-table-column prop="Investigate" label="考查" width="50"></el-table-column>
        <el-table-column prop="majorname" label="专业" width="150"></el-table-column>
        <el-table-column prop="yeartime" label="时间" width="80"></el-table-column>
        <el-table-column prop="outline" label="教学大纲" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="downloadoutline(scope.row)">查看大纲</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="del(scope.row)" :disabled="flag">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="aimsome">
        <a href="https://sjxy.snut.edu.cn/2014jsj.pdf" target="_blank">素质教育选修课</a>
      </div>
    </div>

    <el-dialog title="教学安排表-添加" :visible.sync="dialogplan">
      <el-form :model="form">
        <el-form-item label="课程类别" :label-width="formLabelWidth">
          <el-select v-model="form.classcategory" placeholder="请选择活动区域">
            <el-option label="公共基础必修课" value="公共基础必修课"></el-option>
            <el-option label="专业基础必修课" value="专业基础必修课"></el-option>
            <el-option label="专业基础选修课" value="专业基础选修课"></el-option>
            <el-option label="专业必修课" value="专业必修课"></el-option>
            <el-option label="专业选修课" value="专业选修课"></el-option>
            <el-option label="方向必修课" value="方向必修课"></el-option>
            <el-option label="方向选修课" value="方向选修课"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程编码" :label-width="formLabelWidth">
          <el-input v-model="form.sourse_encouding" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input v-model="form.classname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学分" :label-width="formLabelWidth">
          <el-input v-model="form.credit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学期" :label-width="formLabelWidth">
          <el-select v-model="form.semesernumber" placeholder="请选择学期">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
            <el-option label="6" value="6"></el-option>
            <el-option label="7" value="7"></el-option>
            <el-option label="8" value="8"></el-option>
          </el-select>
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
        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-input v-model="form.yeartime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专业id" :label-width="formLabelWidth">
          <el-input v-model="form.pmjn_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学期id" :label-width="formLabelWidth">
          <el-input v-model="form.psn_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程类别id" :label-width="formLabelWidth">
          <el-input v-model="form.pccn_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="http://localhost:3000/upoutline"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="function (res,file) { return handleBannerSuccess(res,file)}"
          :file-list="fileList"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogplan = false">取 消</el-button>
        <el-button type="primary" @click="submitplan(form,imgurl)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      outline:"",
      imgurl:"",
      upnumber: "",
      fileList: [],
      flag: false,
      formLabelWidth: "120px",
      dialogplan: false,
      majorname: "计算机科学与技术",
      classcategory: "",
      sourse_encouding: "",
      classname: "",
      semesernumber: "",
      credit: "",
      totalhours: "",
      teaching: "",
      experiment: "",
      practice: "",
      examination: "",
      investigate: "",
      yeartime: "2020",
      pmjn_id:"",
      psn_id:"",
      pccn_id:"",
      classlist: [
        { name: "第一学期", list: [] },
        { name: "第二学期", list: [] },
        { name: "第三学期", list: [] },
        { name: "第四学期", list: [] },
        { name: "第五学期", list: [] },
        { name: "第六学期", list: [] },
        { name: "第七学期", list: [] },
        { name: "第八学期", list: [] }
      ],
      form: {
        majorname: "计算机科学与技术",
        classcategory: "公共基础必修课",
        sourse_encouding: "10001",
        classname: "大学英语1",
        semesernumber: "1",
        credit: "4",
        totalhours: "48",
        teaching: "36",
        experiment: "0",
        practice: "12",
        examination: "0",
        investigate: "0",
        yeartime: "2020",
        pmjn_id:"2",
        psn_id:"2",
        pccn_id:"2"
      },
      receiveobj: {},
      tableData: []
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    find(majorname, classlist, yeartime) {
      this.$axios
        .post("http://localhost:3000/getplan", {
          params: {
            name: this.majorname,
            time: this.yeartime
          }
        })
        .then(res => {
          for (let i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].semesernumber == 1) {
              this.classlist[0].list.push(res.data.list[i]);
            }
            if (res.data.list[i].semesernumber == 2) {
              this.classlist[1].list.push(res.data.list[i]);
            }
            if (res.data.list[i].semesernumber == 3) {
              this.classlist[2].list.push(res.data.list[i]);
            }
            if (res.data.list[i].semesernumber == 4) {
              this.classlist[3].list.push(res.data.list[i]);
            }
            if (res.data.list[i].semesernumber == 5) {
              this.classlist[4].list.push(res.data.list[i]);
            }
            if (res.data.list[i].semesernumber == 6) {
              this.classlist[5].list.push(res.data.list[i]);
            }
            if (res.data.list[i].semesernumber == 7) {
              this.classlist[6].list.push(res.data.list[i]);
            }
            if (res.data.list[i].semesernumber == 8) {
              this.classlist[7].list.push(res.data.list[i]);
            }
          }
        })
        .catch((res)=> {
          console.log('查询失败了，也许可能需要等一会才能看到结果')
          this.$message.error('未查询到该计划');
        });
    },
    submitplan(form,imgurl) {
      //手动提交上传请求
        this.$refs.upload.submit();
        this.dialogplan = false,
        //将输出框中的值传回给双向绑定数据
        this.majorname = form.majorname,
        this.classcategory = form.classcategory,
        this.sourse_encouding = form.sourse_encouding,
        this.classname = form.classname,
        this.semesernumber = form.semesernumber,
        this.credit = form.credit,
        this.totalhours = form.totalhours,
        this.teaching = form.teaching,
        this.experiment = form.experiment,
        this.practice = form.practice,
        this.examination = form.examination,
        this.investigate = form.investigate,
        this.yeartime = form.yeartime,
        this.pmjn_id=form.pmjn_id,
        this.psn_id=form.psn_id,
        this.pccn_id=form.pccn_id,
        this.$axios
          .post("http://localhost:3000/addplan", {
            params: {
              majorname: this.majorname,
              classcategory: this.classcategory,
              sourse_encouding: this.sourse_encouding,
              classname: this.classname,
              semesernumber: this.semesernumber,
              credit: this.credit,
              totalhours: this.totalhours,
              teaching: this.teaching,
              experiment: this.experiment,
              practice: this.practice,
              examination: this.examination,
              investigate: this.investigate,
              yeartime: this.yeartime,
              outline:this.imgurl,
              pmjn_id:this.pmjn_id,
              psn_id:this.psn_id,
              pccn_id:this.pccn_id,
            }
          })
          .then(res => {
            this.$message({
              showClose: true,
              message: '恭喜你，添加培养计划成功',
              type: 'success'
        });
          })
          .catch(function(res) {
            this.$message({
              showClose: true,
              message: '添加失败！',
              type: 'error'
        });
          });
    },
    del(delobj) {
      let delnumber = delobj.sourse_encouding;
      console.log(delnumber);
      this.$axios
        .post("http://localhost:3000/delplan", {
          params: {
            delnumber: delnumber
          }
        })
        .then(res => {
          this.$message({
            showClose: true,
            message: "恭喜你，删除成功",
            type: "success"
          });
        })
        .catch(function(res) {
          this.$message({
              showClose: true,
              message: '删除失败',
              type: 'error'
        });
        });
    },
    downloadoutline(delobj) {
      let outline = delobj.outline;
      this.outline = outline
      window.open(this.outline)

    },
    handleBannerSuccess(res,file){
      console.log('这是回调函数'+res,file)
      console.log(file.response.list)
      this.imgurl = file.response.list
    }
  },
  //不刷新会导致无法正确运行，获取正确的结果
  created(){
    console.log(this.$store.state.admin[0].list[0].role)
    if(this.$store.state.admin[0].list[0].role == '学生'){
      this.flag = true
    }
  }
};
</script>

<style scoped>
.Plan {
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
.Plan_contain {
  text-align: center;
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
.aimsome {
  text-align: left;
  font-size: 1.5rem;
  margin-left: 110px;
}
</style>