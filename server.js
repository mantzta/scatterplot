const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

/**
 * @param {number} summand
 * @return {number}
 */
function getX(summand) {
 return Math.round((Math.random() * 10) + (summand*10));
}

/**
 * @param {number} summand
 * @return {number}
 */
function getY() {
  return Math.round(Math.random() * 100);
 }

app.use(express.static(path.join(__dirname, 'client/public')));

app.get('/data', function(req, res) {
  const data = {};

  for (let i = 1; i <= 3; i++) {
    data[`dataset${i}`] = [];

    for (let j = 0; j < 10; j++) {
      const datum = { x: getX(j), y: getY() };
      data[`dataset${i}`].push(datum);
    }
  }

  res.json(data);
});

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
});

app.listen(port, () => {
  console.log(`app is listening on ${port}`);
})