<template>
    <div class="Managemajor">
        <h1>专业管理页面</h1>
        <div class="majoroperate">
            <div class="fontsize">专业名称</div>
            <input type="text" size="35">
            <button>提交</button>
        </div>
        <div class="majorlist">
            <ul>
                    <li v-for="item in majorlist" :key="item.index">
                        <a href="#">{{item}}</a>
                        <span>/</span>
                        <a href="#">删除</a>
                    </li>
                </ul>
        </div>
        
    </div>
</template>

<script>
    export default {
        name:"",
        data(){
            return{
                majorlist:[
                    "1.数学与应用数学",
                    "2.计算机科学与技术",
                    "3.信息管理",
                    "4.金融学",
                    "5.网络工程",
                    "6.市场营销",
                    "1.数学与应用数学",
                    "2.计算机科学与技术",
                    "3.信息管理",
                    "4.金融学",
                    "5.网络工程",
                    "6.市场营销",
                ]
            }
        }
    }
</script>

<style scoped>

.Managemajor{
    margin: 0px;
    padding: 0px;
    height: 100vh;
  background-color: white;
}
.majoroperate{
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
}
.majorlist{
    margin-top: 40px;
}
.fontsize{
    text-align: center;
    font-size: 1.5rem;
    line-height: 1.5rem;
}
ul{
    list-style: none;
    padding: 0px;
    font-size: 1.7rem;
    overflow-y:scroll;
    height: 500px;
}
ul>li{
    text-align: center;
    margin: 20px;
}
h1{
    text-align: center;
    line-height: 200px;
}
</style>