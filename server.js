const express = require('express');
const app = express();
const bodyParser    = require('body-parser');
const request       = require('request');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded( { extended: true} ));

app.get('/', function (req, res) {
  //res.send('Hello Hasnain!')
  res.render('index', {weather: null, error: null });
});

app.post('/', function(req, res) {
    
    //console.log(req.body.city);
    let city  = req.body.city;
    let apikey  = '#################################';
    let url     = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apikey}`;
    request(url, (err, response, body) => {
      if (err){
        console.log(err);
        res.render('index', {weather: null, error: err });
      }
      else {
        let weather = JSON.parse(body);
        if(weather.main === undefined){
          res.render('index', { weather: null, error: 'An error occoured while fetching the Tempreture for this city. Please try again with correct name.' });
        }
        else {
          let weatherText = `The Tempreture in ${ city } is ${ weather.main.temp} degree`;
          res.render('index', { weather: weatherText, error: null });
        }
      }
    });
});

app.listen(3000, function () {
  console.log('app listening on port 3000!')
});
