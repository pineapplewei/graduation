<template>
    <div class="Yearselect">
        <ul>
            <h4>请输入学年时间</h4>
            <h5>例如:2222年上/下半年</h5>
            <input type="text">
            <button>提交</button>
            <li v-for="item in list" :key="item.index">
                <a href="#">{{item}}</a><span>/</span><a href="#">修改</a>
                <span>/</span>
                <a href="#">删除</a>
                </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:"Yearselect",
        data(){
            return{
                list:[
                    "2020上学年",
                    "2020下学年",
                    "2019上学年",
                    "2019下学年",
                    "2018上学年",
                    "2018下学年",
                    "2017上学年",
                    "2017下学年",
                    "2016上学年",
                    "2016下学年",
                    "2015上学年",
                    "2015下学年",
                    "2014上学年",
                    "2014下学年",
                    "2013上学年",
                    "2013下学年",
                    "2012上学年",
                    "2012下学年",
                    "2011上学年",
                    "2011下学年",
                ]
            }
        }
    }
</script>

<style scoped>
li{
    list-style: none;
    font-size: 1.3rem;
    line-height: 2.5rem;
    border: 3px solid skyblue;
    margin: 10px;
}
ul{
    padding: 0px;
    overflow-y:scroll;
    height: 600px;
}
.Yearselect{
    width: 15%;
    background-color: white;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
}
</style>