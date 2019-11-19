
const express = require('express');
const cors = require('cors');

const PORT = 3001;
const app = express();

app.use(cors());

// Allows server to accept JSON
app.use(express.json());

const moviesRouter = require('./routes/movies');
app.use('/movies', moviesRouter);

app.listen(PORT, () => console.log(`Server started on: ${PORT}`));