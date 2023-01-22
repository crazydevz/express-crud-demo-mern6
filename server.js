const express = require('express');
const app = express();
const cors = require('cors');

const userRouter = require('./routes/user');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/users', userRouter);

require('dotenv').config();
require('./database/connect')();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running at port ${PORT}`);
});
