const  express  = require('express');
const { MyRouter } = require('./router');
const KeepAliveAgent = require('keep-alive-agent');

const app = express();
const port = process.env.port || 5000;

let agent = new KeepAliveAgent();

app.matrix = [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, 'red', 'blue', false, false, false],
    [false, false, false, 'blue', 'red', false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false]
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((error, req, res, next) => {
  res.json({
    status: error.status || 500,
    message: error.message,
  });
});
app.use('', MyRouter);

app.get('/test', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
