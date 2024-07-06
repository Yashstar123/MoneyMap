require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Transaction = require('./models/transaction.js');
const app = express();

app.use(cors());
app.use(express.json());//Middleware to parse JSON
const port = 4000;
app.get('/api/test', (req, res) => {
    res.json('test ok');
})


app.post('/api/transaction', async (req, res) => {
    console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL);

    const {price,name,description,datetime} = req.body;
    const transaction = await Transaction.create({price,name,description,datetime})
    res.json(transaction);
})

app.get('/api/transactions',async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
});

app.listen(port, (req, res) => {
    console.log(`Yes I am listening on port ${port}`);
});