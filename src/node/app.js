const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rooter = require('./route.js');
const path = require('path');



var movies = [
    {
        id:1,
        title: 'Avatar',
        release:'2009-10-05',
        language : 'Américain',
        picture : './dist/img/avatar.jpg',
        score : 5,
        director : {
            firstname : 'James',
            lastname : 'Cameron',
            nationality : 'Américain',
            birthdate : '1954-08-16'
        },
        genre : 'Science fiction, Aventure'
    },
    {
        id:2,
        title: 'Tomb Raider',
        release:'2018-03-14',
        language : 'Américain',
        picture : './dist/img/tombraider.jpg',
        score:4,
        director : {
            firstname : 'Roar',
            lastname : 'Uthaug',
            nationality : 'Américain',
            birthdate : '1973-08-25'
        },
        genre : 'Aventure, Action'
    }
];
//global variable which contains movies
app.set('movies', movies);
app.use('/dist',express.static('dist'));
app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit:50000
}))

app.use(rooter);

app.get('*', (req,res) => {
    res.sendFile(
        path.resolve('.','index.html')
    )
})




app.listen(8000, () => console.log('application lancé sur http://localhost:8000'))




