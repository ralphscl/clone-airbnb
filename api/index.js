const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
const User = require('./models/User.js');
require('dotenv').config();

const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('server up');
});

app.post('/register', async (req, res) => {
    const{ firstName, lastName, contactNumber, email, password } = req.body;

    try {
        const userDoc = await User.create({
            firstName,
            lastName,
            contactNumber,
            email,
            password:bcrypt.hashSync(password, bcryptSalt)
        });
    
        res.json({ userDoc })
    } catch (e) {
        res.status(422).json()
    }
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const userDoc = await User.findOne({ email });
    if(userDoc) {
        res.json('found');
    } else {
        res.json('not found');
    }
});

app.listen(4000);