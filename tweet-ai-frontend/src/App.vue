<template>
  <div id="app">
    <header>
      <h1>TweetAI Dashboard</h1>
    </header>
    <AutobotCount />
    <AutobotList />
  </div>
</template>

<script>
import AutobotCount from './components/AutobotCount.vue';
import AutobotList from './components/AutobotList.vue'

export default {
  components: {
    AutobotCount,
    AutobotList,
  },
};
</script>

<style>
/* Basic styles for the app */
header {
  background-color: #42b983;
  padding: 20px;
  text-align: center;
  color: white;
}
</style>
