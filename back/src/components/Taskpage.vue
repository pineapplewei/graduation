<template>
    <div class="Taskpage">
        <div class="list-top">
            <div class="fontsize">专业名称</div>
            <input type="text" size="25">
            <button>查询</button>
            
            <div class="fontsize" id="list-name">表名</div>
            <input type="text" size="25">
            <button>提交</button>
        </div>
        <h1>计算机科学与技术专业2020上半年安排表目录</h1>
        <div class="list-body">
                <ul>
                    <li v-for="item in planlist" :key="item.index">
                        <a href="#">{{item}}</a><span>/</span><a href="#">修改</a>
                        <span>/</span>
                        <a href="#">删除</a>
                    </li>
                </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name:"Taskpage",
        data(){
            return{  
                planlist:[
                    "1.课程设置及教学安排表",
                    "2.主要实验性环节教学安排表",
                    "3.课程学分学时比例表",
                    "4.教学进程表",
                    "5.培养计划基本介绍",
                ]
            }
        }
    }
</script>

<style scoped>
.Taskpage{
    width: 85%;
    background-color: tomato;
    height: 100vh;
    float: right;

}
.list-top{
    background-color: skyblue;
    margin-top: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.fontsize,button{
    font-size: 1.2rem;
}
#list-name{
    margin-left: 60px;
}
h1{
    margin: 70px 0px;
    text-align: center;
}
ul{
    list-style: none;
    padding: 0px;
    font-size: 2rem;
}
ul>li{
    text-align: center;
    margin: 20px;
}
</style>