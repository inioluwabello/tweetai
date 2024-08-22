// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Autobot, Post, Comment, sequelize } = require('./models');
const rateLimit = require('express-rate-limit');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require('./tasks/autobotCreation');

const app = express();
app.use(express.json());
app.use(cors());

// Rate limiter (max 5 requests per minute)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per windowMs
});

// Apply the rate limiter to all requests
// app.use(limiter);

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'TweetAI API Documentation',
    version: '1.0.0',
    description: 'API Documentation for TweetAI Service',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

// Swagger options and spec setup
const options = {
  swaggerDefinition,
  apis: ['./server.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

// Swagger UI route
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /autobots:
 *   get:
 *     summary: Retrieve a list of autobots
 *     responses:
 *       200:
 *         description: A list of autobots
 */
app.get('/autobots', limiter, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const autobots = await Autobot.findAll({ offset, limit });
    res.json(autobots);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching autobots' });
  }
});

/**
 * @swagger
 * /autobots/{autobotId}/posts:
 *   get:
 *     summary: Retrieve all posts for an autbot
 *     parameters:
 *       - in: path
 *         name: autobotId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the autobot
 *     responses:
 *       200:
 *         description: A list of posts
 */
app.get('/autobots/:autobotId/posts', limiter, async (req, res) => {
  const { autobotId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const posts = await Post.findAll({ where: { autobotId }, offset, limit });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

/**
 * @swagger
 * /posts/{postId}/comments:
 *   get:
 *     summary: Retrieve all comments for a post
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the post
 *     responses:
 *       200:
 *         description: A list of comments
 */
app.get('/posts/:postId/comments', limiter, async (req, res) => {
  const { postId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const comments = await Comment.findAll({ where: { postId }, offset, limit });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
