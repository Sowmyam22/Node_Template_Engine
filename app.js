const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

// const db = require('./util/database');
const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// connect to database and fetch the data from products table using mysql2

// db.execute('SELECT * FROM products')
// .then(result => {
//     console.log(result);
// }).catch(err => {
//     console.log(err);
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize.sync()
    .then(result => {
        app.listen(3000);

    })
    .catch(err => {
        console.log(err);
    })

