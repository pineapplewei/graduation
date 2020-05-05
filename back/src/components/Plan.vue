<template>
  <div class="Plan">
    <h1>培养方案管理页面</h1>
    <div class="Plan_top">
      <div class="fontsize">专业名称</div>
      <input type="text" size="35" v-model="inputmajor" />
      <el-date-picker v-model="year" type="year" placeholder="选择年"></el-date-picker>
      <el-button type="primary" @click="find(inputmajor,classlist,year)" :disabled="flag">查询</el-button>
    </div>
    <div>
      <p>您查询的专业名称为:{{inputmajor}}</p>
      <p>您查询的时间为:{{year}}</p>
    </div>
    <div class="Plan_contain">
      <el-table :data="this.tableData[0].list" style="width: 40%">
        <el-table-column type="index" :index="indexMethod" width="100"></el-table-column>
        <el-table-column prop="planname" label="名称" width="300"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="addtest(scope.$index)" type="text" size="small">添加</el-button>
            <el-button type="text" @click="dialogTeachingVisible = true">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="aimsome">
        <a href="https://sjxy.snut.edu.cn/2014jsj.pdf" target="_blank">素质教育选修课</a>
      </div>
    </div>

    <el-dialog title="教学安排表-添加" :visible.sync="dialogTeachingForm">
      <el-form :model="form">
        <el-form-item label="专业名称" :label-width="formLabelWidth">
          <el-input v-model="form.majorname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程类别" :label-width="formLabelWidth">
          <el-select v-model="form.value" placeholder="请选择活动区域">
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
        <el-button @click="dialogTeachingForm = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="submitTeaching(form,receiveobj)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="教学安排表-查看" :visible.sync="dialogTeachingVisible" width="80%">
      <div style="font-size:1.1rem;font-weight:700">专业名称：{{this.inputmajor}}</div>
      <ul>
        <li v-for="item in classlist" :key="item.index">
          {{item.name}}
          <div>
            <template>
              <el-table :data="item.list" style="width:100%">
                <el-table-column prop="value" label="课程类别" width="150"></el-table-column>
                <el-table-column prop="sourse_encoding" label="课程编码" width="150"></el-table-column>
                <el-table-column prop="sourse_title" label="课程名称" width="150"></el-table-column>
                <el-table-column prop="semester" label="学期" width="100"></el-table-column>
                <el-table-column prop="credit" label="学时" width="100"></el-table-column>
                <el-table-column prop="totalhours" label="总学时" width="100"></el-table-column>
                <el-table-column prop="teaching" label="授课" width="100"></el-table-column>
                <el-table-column prop="experiment" label="实验" width="100"></el-table-column>
                <el-table-column prop="practice" label="实践" width="100"></el-table-column>
                <el-table-column prop="examination" label="考试" width="100"></el-table-column>
                <el-table-column prop="investigate" label="考查" width="100"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, item.list)"
                      type="text"
                      size="small"
                    >移除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </li>
      </ul>
    </el-dialog>

    <el-dialog title="实践安排表-添加" :visible.sync="dialogPracticeForm">
      <el-form :model="form1">
        <el-form-item label="实践类别" :label-width="formLabelWidth">
          <el-select v-model="form1.value" placeholder="请选择实践类别">
            <el-option label="基本环节" value="基本环节"></el-option>
            <el-option label="专业环节" value="专业环节"></el-option>
            <el-option label="专业拓展环节" value="专业拓展环节"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实践序号" :label-width="formLabelWidth">
          <el-input v-model="form1.Practicenumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="实践名称" :label-width="formLabelWidth">
          <el-input v-model="form1.Practicename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="form1.contain" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地点" :label-width="formLabelWidth">
          <el-input v-model="form1.place" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学期" :label-width="formLabelWidth">
          <el-input v-model="form1.Semester" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="周期" :label-width="formLabelWidth">
          <el-input v-model="form1.cycle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学分" :label-width="formLabelWidth">
          <el-input v-model="form1.credit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="起止周数" :label-width="formLabelWidth">
          <el-input v-model="form1.startandend" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPracticeForm = false">取 消</el-button>
        <el-button type="primary" @click="dialogPracticeForm = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="学时学分比例表-添加" :visible.sync="dialogCredithoursForm">
      <el-form :model="form2">
        <el-form-item label="课程类别" :label-width="formLabelWidth">
          <el-select v-model="form2.value" placeholder="请选择课程类别">
            <el-option label="公共基础必修课" value="公共基础必修课"></el-option>
            <el-option label="素质教育选修课" value="素质教育选修课"></el-option>
            <el-option label="专业基础必修课" value="专业基础必修课"></el-option>
            <el-option label="专业基础选修课" value="专业基础选修课"></el-option>
            <el-option label="专业必修课" value="专业必修课"></el-option>
            <el-option label="专业选修课" value="专业选修课"></el-option>
            <el-option label="方向必修课" value="方向必修课"></el-option>
            <el-option label="方向选修课" value="方向选修课"></el-option>
            <el-option label="专业拓展环节" value="专业拓展环节"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学时" :label-width="formLabelWidth">
          <el-input v-model="form2.Classhour" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学时比例" :label-width="formLabelWidth">
          <el-input v-model="form2.Classhourratio" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学分" :label-width="formLabelWidth">
          <el-input v-model="form2.credit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学分比例" :label-width="formLabelWidth">
          <el-input v-model="form2.Creditscale" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCredithoursForm = false">取 消</el-button>
        <el-button type="primary" @click="dialogCredithoursForm = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="教学进程表-添加" :visible.sync="dialogTeachingprocessForm">
      <el-form :model="form3">
        <el-form-item label="课程类别" :label-width="formLabelWidth">
          <el-select v-model="form3.value1" placeholder="请选择学期">
            <el-option label="一" value="一"></el-option>
            <el-option label="二" value="二"></el-option>
            <el-option label="三" value="三"></el-option>
            <el-option label="四" value="四"></el-option>
            <el-option label="五" value="五"></el-option>
            <el-option label="六" value="六"></el-option>
            <el-option label="七" value="七"></el-option>
            <el-option label="八" value="八"></el-option>
          </el-select>

          <el-select v-model="form3.value2" placeholder="请选择任务类别">
            <el-option label="理论教学" value="理论教学"></el-option>
            <el-option label="入学教育" value="入学教育"></el-option>
            <el-option label="国防教育" value="国防教育"></el-option>
            <el-option label="专业/生产/教育实习" value="专业/生产/教育实习"></el-option>
            <el-option label="其他实习" value="其他实习"></el-option>
            <el-option label="专业调研" value="专业调研"></el-option>
            <el-option label="专业实训/技能训练" value="专业实训/技能训练"></el-option>
            <el-option label="课程设计" value="课程设计"></el-option>
            <el-option label="毕业设计/论文" value="毕业设计/论文"></el-option>
            <el-option label="思政课实践" value="思政课实践"></el-option>
            <el-option label="毕业教育" value="毕业教育"></el-option>
            <el-option label="考试" value="考试"></el-option>
            <el-option label="假期" value="假期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="周数" :label-width="formLabelWidth">
          <el-input v-model="form3.week" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="理论教学周数" :label-width="formLabelWidth">
          <el-input v-model="form3.theoreticalTeaching" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="周学时数" :label-width="formLabelWidth">
          <el-input v-model="form3.classHour" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTeachingprocessForm = false">取 消</el-button>
        <el-button type="primary" @click="dialogTeachingprocessForm = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: "2020",
      flag: false,
      inputmajor: "计算机科学与技术",
      formLabelWidth: "120px",
      dialogTeachingForm: false,
      dialogTeachingVisible: false,
      dialogPracticeForm: false,
      dialogCredithoursForm: false,
      dialogTeachingprocessForm: false,
      classlist: [
        { name: "公共基础必修课", list: [] },
        { name: "专业基础必修课", list: [] },
        { name: "专业基础选修课", list: [] },
        { name: "专业必修课", list: [] },
        { name: "专业选修课", list: [] },
        { name: "方向必修课", list: [] },
        { name: "方向选修课", list: [] },
        {
          majorname: [
            "计算机科学与技术",
            "网络工程",
            "市场营销",
            "金融学",
            "信息管理",
            "数学与应用数学"
          ]
        }
      ],
      form: {
        majorname: "计算机科学与技术",
        value: "公共基础必修课",
        sourse_encoding: "1",
        sourse_title: "大学英语1",
        semester: "1",
        credit: "4",
        totalhours: "48",
        teaching: "36",
        experiment: "0",
        practice: "12",
        examination: "0",
        investigate: "0"
      },
      receiveobj: {},
      form1: {
        value: "基本环节",
        Practicenumber: "140001",
        Practicename: "国防教育",
        contain: "军事训练。。。",
        place: "校内",
        Semester: "1",
        cycle: "2",
        credit: "2",
        startandend: "2-3"
      },
      form2: {
        value: "公共基础必修课",
        Classhour: "15",
        Classhourratio: "15.3%",
        credit: "4",
        Creditscale: "16.7%"
      },
      form3: {
        value1: "一",
        value2: "入学教育",
        week: "1",
        theoreticalTeaching: "13",
        classHour: "22.5"
      },
      tableData: []
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    findRow(index, rows) {
      rows.splice(index, 1);
    },
    addtest(index) {
      if (index == 0) {
        this.dialogTeachingForm = true;
      }
      if (index == 1) {
        this.dialogPracticeForm = true;
      }
      if (index == 2) {
        this.dialogCredithoursForm = true;
      }
      if (index == 3) {
        this.dialogTeachingprocessForm = true;
      }
    },
    submitTeaching(form, receiveobj) {
      this.dialogTeachingForm = false;
      //将输出框中的值传回给双向绑定数据
      this.majorname = form.majorname;
      this.value = form.value;
      this.sourse_encoding = form.sourse_encoding;
      this.sourse_title = form.sourse_title;
      this.semester = form.semester;
      this.credit = form.credit;
      this.totalhours = form.totalhours;
      this.teaching = form.teaching;
      this.experiment = form.experiment;
      this.practice = form.practice;
      this.examination = form.examination;
      this.investigate = form.investigate;
      receiveobj = {
        majorname: this.majorname,
        value: this.value,
        sourse_encoding: this.sourse_encoding,
        sourse_title: this.sourse_title,
        semester: this.semester,
        credit: this.credit,
        totalhours: this.totalhours,
        teaching: this.teaching,
        experiment: this.experiment,
        practice: this.practice,
        examination: this.examination,
        investigate: this.investigate
      };
      if (receiveobj.value == "公共基础必修课") {
        this.classlist[0].list.push(receiveobj);
      }
      if (receiveobj.value == "专业基础必修课") {
        this.classlist[1].list.push(receiveobj);
      }
      if (receiveobj.value == "专业基础选修课") {
        this.classlist[2].list.push(receiveobj);
      }
      if (receiveobj.value == "专业必修课") {
        this.classlist[3].list.push(receiveobj);
      }
      if (receiveobj.value == "专业选修课") {
        this.classlist[4].list.push(receiveobj);
      }
      if (receiveobj.value == "方向必修课") {
        this.classlist[5].list.push(receiveobj);
      }
      if (receiveobj.value == "方向选修课") {
        this.classlist[6].list.push(receiveobj);
      }
    },
    find(inputmajor, classlist, year) {
      var newarray = classlist.splice(7, 8);
      // console.log(newarray)
      // console.log(newarray[0].majorname)
      // console.log(newarray[0].majorname.includes(inputmajor))
      if (newarray[0].majorname.includes(inputmajor)) {
      } else {
        alert("您输入的专业不存在，请检查再次输入");
        this.flag = true;
        this.inputmajor = "";
        this.flag = false;
      }
    }
  },
  created() {
    this.$axios
      .post("http://localhost:3000/getplanlist", {
        params: {
          name: this.inputmajor,
          time: this.year
        }
      })
      .then(res => {
        console.log(res.data);
        this.tableData.push(res.data);
        console.log(this.tableData[0].list);
        // this.majorname = this.tableData[0].majorlist[0].majorname;
      })

      .catch(function(res) {
        console.log("请求计划失败");
      });
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