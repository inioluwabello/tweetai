const axios = require('axios');
const db = require('../models');
const schedule = require('node-schedule');

// Function to create Autobots and their posts
async function createAutobots() {
  try {
    const autobots = [];

    for (let i = 0; i < 500; i++) {
      // Fetch a new Autobot from jsonplaceholder.typicode.com
      const { data: autobot } = await axios.get('https://jsonplaceholder.typicode.com/users/' + (i % 10 + 1));

      // Create a new Autobot in the database
      const newAutobot = await db.Autobot.create({
        name: autobot.name,
        email: autobot.email,
        username: autobot.username
      });

      const posts = [];

      for (let j = 0; j < 10; j++) {
        // Fetch a post from jsonplaceholder.typicode.com
        const { data: post } = await axios.get('https://jsonplaceholder.typicode.com/posts/' + (j % 10 + 1));

        // Ensure the post title is unique by appending the Autobot ID
        const uniqueTitle = `${post.title} (Autobot ID: ${newAutobot.id})`;

        // Create the post for the Autobot
        const newPost = await db.Post.create({
          title: uniqueTitle,
          body: post.body,
          AutobotId: newAutobot.id
        });

        const comments = [];

        for (let k = 0; k < 10; k++) {
          // Fetch a comment from jsonplaceholder.typicode.com
          const { data: comment } = await axios.get('https://jsonplaceholder.typicode.com/comments/' + (k % 10 + 1));

          // Create a comment for the post
          const newComment = await db.Comment.create({
            body: comment.body,
            email: comment.email,
            PostId: newPost.id
          });

          comments.push(newComment);
        }

        posts.push(newPost);
      }

      autobots.push(newAutobot);
    }

    console.log('500 Autobots and their posts created successfully.');
  } catch (error) {
    console.error('Error creating Autobots:', error);
  }
}

// Schedule the task to run every hour
schedule.scheduleJob('0 * * * *', () => {
  console.log('Starting the creation of 500 Autobots...');
  createAutobots();
});

module.exports = { createAutobots };
