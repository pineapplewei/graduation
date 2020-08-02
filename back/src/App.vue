<template>
  <div id="app">
    <router-view></router-view>
    <router-view name="left"/>
    <router-view name="right"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  margin: 0px;
  padding: 0px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  height: 100%;
  background-color: white;
}
</style>
