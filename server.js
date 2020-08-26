const express = require('express');
const connectDB = require('./config/db');


const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(express.json({extended: false}));

app.listen( PORT, ()=> {
  console.log(`Server start on PORT ${PORT}`);
});

app.get('/', (req, res) => {
  res.json({msg: 'Welcome to the Contact Keeper API...'});
});

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
