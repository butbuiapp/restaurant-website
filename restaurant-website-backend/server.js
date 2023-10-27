const express = require('express');
const path = require('path');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const Constant = require('./helper/constant');

const port = 3001;
const app = express();

const session = require('express-session');
app.use(session({
  secret: 'your_secret_key',  // This should be a long random string
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }  // Set to true if using HTTPS
}));

// setup body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // need true for parsing JSON
// app.use(cookieparser());
app.use(cookieparser('keyforencription'));

const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

// setup static
app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));

const adminRouter = require('./routes/adminRouter');
app.use('/login', adminRouter);

const reservationRouter = require('./routes/reservationRouter');
app.use('/reservation', reservationRouter);

const menuRouter = require('./routes/menuRouter');
app.use('/menu', menuRouter);

const orderRouter = require('./routes/orderRouter');
app.use('/order', orderRouter);

app.listen(port, function () {
  console.log('Server is starting at', port);
});

app.use((req, res, next) => {
  res.send({
    [Constant.RESPONSE.SUCCESS]: false,
    [Constant.RESPONSE.ERROR]: "API is not supported"
  });
});

app.use((err, req, res, next) => {
  console.log('backend error', err);
  res.send({
    [Constant.RESPONSE.SUCCESS]: false,
    [Constant.RESPONSE.ERROR]: "Server Error"
  });
})
