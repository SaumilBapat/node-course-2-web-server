const express = require('express');
const hbs = require('hbs')
const fs = require('fs');

//Express Setup
let app = express();
app.set('view engine', 'hbs');

//Declare Middleware
app.use((req, res, next) => {
    console.log('Running log middleware');
    let log = `${new Date().toString()} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log, (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    });
    next();
});
// app.use((req, res, next) => {
//     debugger;
//     console.log('Running maintenance middleware');
//     res.render('maintenance.hbs', {
//         message: 'We\'ll be right back!',
//     });
//     next();
// });
app.use(express.static(__dirname + '/public'));

//Handlebar template functions
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    console.log('Running getCurrentYear hbs');
    return  new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    console.log('Running screamIt hbs');
    return  text.toUpperCase();
});

app.get('/', (req, res) => {
    console.log('Running root / express page');
    res.render('index.hbs', {
        pageTitle: 'Dynamic About Page',
        //currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to the Site',
    })
});

app.get('/bad', (req, res) => {
    console.log('Running error /bad express page');
   res.send({
       errorMessage: "Bad Request"
   })
});

app.get('/about', (req, res) => {
    console.log('Running about /about express page');
   res.render('about.hbs', {
       pageTitle: 'Dynamic About Page',
       //currentYear: new Date().getFullYear(),
   });
});

app.listen(3000, () => {
    console.log('The server is now running.');
});