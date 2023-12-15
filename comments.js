// Create web server
// 1. Load modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const port = 3000;
// 2. Use modules
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 3. Create routers
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'comments.html'));
});
app.get('/comments', function(req, res) {
    fs.readFile(path.join(__dirname, 'comments.json'), function(err, data) {
        if (err) throw err;
        res.end(data);
    });
});
app.post('/comments', function(req, res) {
    var newComment = {
        name: req.body.name,
        comment: req.body.comment,
        date: Date.now()
    };
    fs.readFile(path.join(__dirname, 'comments.json'), function(err, data) {
        if (err) throw err;
        var comments = JSON.parse(data);
        comments.push(newComment);
        fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), function(err) {
            if (err) throw err;
            res.end(JSON.stringify(comments));
        });
    });
});
// 4. Start server
app.listen(port, function() {
    console.log('Server is running on port ' + port);
});