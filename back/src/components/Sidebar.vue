<template>
  <div class="Sidebar">
    <ul>
      <h2>{{this.name}}</h2>
      <el-row>
        <div align="center">
          <el-button type="danger" size="mini" @click="Cancellation()">注销</el-button>
        </div>
      </el-row>

      <el-row class="tac">
        <el-col :span="24">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item
              index="2"
              v-for="item in this.selecet.list"
              :key="item.index"
              @click="choice(item)"
            >
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      name:this.$route.query.obj.list[0].personname,
      role:this.$route.query.obj.list[0].role,
      selecet:{},
      manageList: [
        {
          title:"首页",
          path:"Home"
        },
        {
          title:"人员管理",
          path:"Peoplemanage"
        },
        {
          title:"专业管理",
          path:"Managemajor"
        },
        {
          title:"培养方案",
          path:"Plandesign"
        },
        {
          title:"大纲列表",
          path:"Outlinelist"
        }
      ],
      student:[
        {
          title:"首页",
          path:"Home"
        },
        {
          title:"培养方案",
          path:"Plandesign"
        }
      ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    choice(item){
    this.$router.push({
    path: `/${item.path}`,
        })
    },
    Cancellation(){
      this.$router.push({
        path:`/`
      })
    },
  },
  created(){
    if(this.role == '管理员'){
      this.selecet.list=this.manageList
      console.log(this.selecet.list[0])
    }else{
      this.selecet.list=this.student
      console.log(this.selecet.list[0])      
    }
  }
  }
</script>

<style scoped>
h2 {
  text-align: center;
  color: #409eff;
}
li {
  list-style: none;
  font-size: 1.3rem;
  line-height: 2.5rem;
  margin: 30px 5px;
  text-align: center;
}
ul {
  padding: 0px;
  height: 600px;
}
.Sidebar {
  width: 20%;
  background-color: white;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
}
</style>