<template>
  <div>
    <h2>Total Autobots Created: {{ autobotCount }}</h2>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      autobotCount: 0,
      error: null,
    };
  },
  mounted() {
    this.fetchAutobotCount();
    // Refresh the count every 5 seconds
    setInterval(this.fetchAutobotCount, 5000);
  },
  methods: {
    async fetchAutobotCount() {
      try {
        const response = await axios.get('http://localhost:3000/autobots');
        this.autobotCount = response.data.length;
        this.error = null; // Clear error if successful
      } catch (error) {
        this.error = 'Error fetching autobot count: ' + error.message;
        console.error('Error fetching autobot count:', error);
      }
    },
  },
};
</script>

<style>
.error {
  color: red;
  margin-top: 10px;
}
</style>
