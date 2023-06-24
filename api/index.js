const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const User = require('./models/User.js');
require('dotenv').config();

const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = '378rfgiuwben132098r9gufdf'

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

mongoose.connect(process.env.MONGO_URL);

// Get
app.get('/test', (req, res) => {
    res.json('server up');
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if(token) {
        jwt.verify(token, jwtSecret, {}, async (err, cookieData) => {
            if (err) throw err;
            const { _id, email, firstName, lastName, contactNumber } = await User.findById(cookieData.id);

            res.json({ _id, email, firstName, lastName, contactNumber });
        })
    } else {
        res.json(null)
    }
});

// Post
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
        const validatePassword = bcrypt.compareSync(password, userDoc.password);
        if(validatePassword) {
            jwt.sign({ id:userDoc._id, email:userDoc.email}, jwtSecret, {}, (err, token) => {
                if (err) throw err;

                res.cookie('token', token).json(userDoc)
            });
        } else {
            res.status(401).json({
                error: {
                    message: 'Invalid password. Please try again'
                }
            })
        }
    } else {
        res.status(404).json({
            error: {
                message: 'User not found. Please try again.'
            }
        });
    }
});


app.listen(4000);