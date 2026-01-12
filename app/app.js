// TODO: Ini adalah titik masuk aplikasi, setup Express, Middleware, dan Server Listener disini
const express = require('express');
const path = require('path');
const app = express();

// Load port dari environment variable (default 3000)
const port = process.env.APP_PORT || 3000;

// Setup View Engine (EJS) untuk tampilan
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

// Middleware untuk membaca data dari form HTML (POST request)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup Static Folder (untuk CSS/JS public jika ada)
app.use(express.static(path.join(__dirname, 'public')));

// Load Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Jalankan Server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);

});