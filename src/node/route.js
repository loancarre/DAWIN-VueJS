let express = require('express');
let router = express();
let multer  = require('multer');
let storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
    destination: function (req, file, cb) {
        cb(null, 'dist/img/')
    },
})
let upload = multer({ dest: 'dist/img/', storage: storage });

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});


router.get('/movies', (req, res) =>{
        res.send(req.app.get('movies'))
    }
);


router.post('/movie/edit', (req, res) =>{
    let movies = req.app.get('movies');
    let movie = req.body;
    let index = movies.findIndex(item => item.id === movie.id);
    if(movies[index] = movie){
        res.send('success');
    }
    else {
        res.send('error');
    }
});

router.post('/movie/add', (req, res) =>{
        let movies = req.app.get('movies');
        if(movies.push(req.body)){
            res.send('success');
        }
        else {
            res.send('error');
        }
    }
);

router.delete('/movie/remove', (req, res) =>{
        let movies = req.app.get('movies');
        let movie = req.body;
        let index = movies.findIndex(item => item.id === movie.id);
        if(movies.splice(index, 1)){
            res.send('success');
        }
        else {
            res.send('error');
        }
    }
);


router.post('/movie/upload', upload.single('file'), function (req, res, next) {
    let file = req.file;
    res.send({ 'message' : 'success', 'path' : file.path});
})
module.exports = router;