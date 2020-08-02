<template>
    <div class="First">
        <div class="name">Hello!</div>
        <div class="info">追求源于热爱</div>
        <div class="foot"><p>Maybe I fall or maybe I drown again and pain again</p></div> 
    </div>
</template>

<script>
    export default {
        data(){
            return{
                fileList:[]
            }
        },
        
        methods:{
        }
    }
</script>

<style scoped>
.First{
    width: 80%;
    background-color: white;
    height: 100vh;
    float: right;
}
.name{
    position: absolute;
    top: 20%;
    left: 20%;
    font-size: 13rem;
}
.info{
    position: absolute;
    top: 55%;
    left: 21%;
    font-size: 3rem;
}
.foot{
    position: absolute;
    top: 65%;
    left: 21%;
    font-weight: 600;
}
</style>