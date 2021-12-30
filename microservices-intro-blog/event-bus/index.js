import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());

app.post('/events/', (req, res) => {
  const event = req.body;

  //   Posts
  axios.post('http://localhost:4000/events', event).catch((err) => {
    console.log(err.message);
  });
  //   Comments
  axios.post('http://localhost:4001/events', event).catch((err) => {
    console.log(err.message);
  });
  //   Query
  axios.post('http://localhost:4002/events', event).catch((err) => {
    console.log(err.message);
  });
  //   Moderation
  axios.post('http://localhost:4003/events', event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
