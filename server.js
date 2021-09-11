const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: '.env-local' });

const PORT = process.env.PORT || '3000';
const app = express();

/**
 * Midleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Routes
 */
app.get('/', (request, response) => {
  response.status(200).json({ name: 'holehuy', doing: 'coding' });
});

const userRouter = require('./routes/user');

app.use('/user', userRouter);

/**
 * Start listening
 */
app.listen(PORT, () => {
  console.log(`Listening for request on port ${PORT}`);
});
