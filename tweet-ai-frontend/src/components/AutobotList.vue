<template>
    <div>
      <h2>Autobots List</h2>
      <ul>
        <li v-for="autobot in autobots" :key="autobot.id">{{ autobot.name }}</li>
      </ul>
  
      <!-- Pagination Controls -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }}</span>
        <button @click="nextPage" :disabled="autobots.length < limit">Next</button>
      </div>
  
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        autobots: [],
        currentPage: 1,
        limit: 10, // Items per page
        error: null,
      };
    },
    mounted() {
      this.fetchAutobots();
    },
    methods: {
      async fetchAutobots() {
        try {
          const response = await axios.get(`http://localhost:3000/autobots?page=${this.currentPage}&limit=${this.limit}`);
          this.autobots = response.data;
          this.error = null; // Clear error if successful
        } catch (error) {
          this.error = 'Error fetching autobots: ' + error.message;
          console.error('Error fetching autobots:', error);
        }
      },
      nextPage() {
        this.currentPage++;
        this.fetchAutobots();
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.fetchAutobots();
        }
      },
    },
  };
  </script>
  
  <style>
  .pagination {
    margin-top: 20px;
  }
  button {
    margin: 0 5px;
  }
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  