import 'babel-polyfill'
import validateEndpointUrl from './validateEndpointUrl'
import express from 'express'

export function validate(url) {
    return validateEndpointUrl(url)
      .then(() => ({success: true, message: "success"}),
            err => ({success: false, error: err.name, message: err.message}));
}

var app = express();
 
app.get("/api", (req, res) => {
  validate(req.query.url)
    .then(result => {
      console.log("IN THE HANDLER")
      console.log(JSON.stringify(result))
      res.json(result);
    })   
});
app.get('/', function(req,res) {
  res.sendFile(__dirname + '/public/index.html');
});
app.use(express.static('public'));

var port = process.env.PORT || 3000;
 
var server = app.listen(port, () => {
    console.log('Service started on port :' + port);
});

