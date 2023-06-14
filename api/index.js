const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

app.get('/test', (req, res) => {
    res.json('server up');
});

app.post('/register', (req, res) => {
    const{ firstName, lastName, contactNumber, email, password } = req.body;
    res.json({ firstName, lastName, contactNumber, email, password })
})

app.listen(4000);