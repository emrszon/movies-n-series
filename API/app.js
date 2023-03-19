const express = require('express');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');

require('dotenv/config'); 

const homeRoutes = require('./routes/home')
const authRoutes = require('./routes/auth')
const privateRoutes = require('./routes/privateRoutes')


app.use(cors());
app.use(express.json());

app.use('/api', homeRoutes);
app.use('/api/private', privateRoutes);
app.use('/', authRoutes);

mongoose.connect(process.env.DB_URL, () => {
    console.log('Connected to Database')
})

app.listen(process.env.PORT, () => {
    console.log(`Application listening at http://localhost:${process.env.PORT}/`)
})