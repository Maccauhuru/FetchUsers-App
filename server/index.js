const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const axios = require('axios');
const PORT = 4000 || process.env.PORT;


const app = express();
const origin = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://fetchusersapp.netlify.com';

//Enable our middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin }));

app.get('/', async (req, res) => {
  const count = req.query.count || 30;
  const users = await axios.get(`https://randomuser.me/api?results=${count}`);
  res.json({
    data: users.data.results
  })
});

app.listen(PORT, () => {
  console.log(`listening on port : ${PORT}`)
});