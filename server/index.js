const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv');


const app = express();
dotenv.config({ path: 'config.env' });
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URL, () => console.log('MongoDB connected'))
const server = app.listen(process.env.PORT, () => console.log('server listening at ' + process.env.PORT));
