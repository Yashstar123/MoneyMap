require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Transaction = require('./models/transaction.js');
const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

const port = 4000;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

app.get('/api/test', (req, res) => {
    res.json('test ok');
});

app.post('/api/transaction', async (req, res) => {
    const { price, name, description, datetime } = req.body;
    try {
        const transaction = await Transaction.create({ price, name, description, datetime });
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create transaction' });
    }
});

app.get('/api/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

app.listen(port, () => {
    console.log(`Yes I am listening on port ${port}`);
});
