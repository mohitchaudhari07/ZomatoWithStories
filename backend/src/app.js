const express  = require('express');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());    
// Middleware to parse JSON bodies
app.use(express.json());

app.get('/' , (req, res) =>{
    res.send('Hello World!');
})

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);



module.exports = app;