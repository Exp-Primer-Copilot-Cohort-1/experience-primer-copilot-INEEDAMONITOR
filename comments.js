//Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var comments = require('./comments.json');
var _ = require('lodash');

//Use body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Create web server
app.use('/', express.static(__dirname + '/public'));

//Get all comments
app.get('/comments', function (req, res) {
    res.json(comments);
});

//Get single comment
app.get('/comments/:id', function (req, res) {
    var id = req.params.id;
    var comment = _.find(comments, {id: id});
    res.json(comment || {});
});

//Create new comment
app.post('/comments', function (req, res) {
    var comment = req.body;
    comments.push(comment);
    saveData(comments);
    res.json(comment);
});

//Update comment
app.put('/comments/:id', function (req, res) {
    var id = req.params.id;
    var comment = req.body;
    var index = _.findIndex(comments, {id: id});
    if (!comments[index]) {
        res.send();
    } else {
        var updatedComment = _.assign(comments[index], comment);
        saveData(comments);
        res.json(updatedComment);
    }
});

//Delete comment
app.delete('/comments/:id', function (req, res) {
    var id = req.params.id;
    var index = _.findIndex(comments, {id: id});
    if (!comments[index]) {
        res.send();
    } else {
        var deletedComment = comments[index];
        comments.splice(index, 1);
        saveData(comments);
        res.json(deletedComment);
    }
});

//Start server
app.listen(3000, function () {
    console.log('Server listening on', 3000);
});

//Save data
function saveData(comments) {
    var data = JSON.stringify(comments);
    fs.writeFileSync('comments.json', data);
}
