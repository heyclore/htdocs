const express = require('express');
const EjsLayout = require('express-ejs-layouts');
const quotesRoutes = require('./routes/quotesRoutes');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');

app.listen(3000);

app.use(express.static('public'));
app.use(EjsLayout);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set('layout', './templates/layout');


app.use(quotesRoutes);
