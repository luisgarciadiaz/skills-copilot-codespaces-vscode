// Create web server
var express = require('express');
var router = express.Router();
var path = require('path');
var comments = require('../models/comments');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

// Get all comments
router.get('/', function(req, res) {
    comments.find({}, function(err, data) {
        if(err) {
            console.log('Error', err);
        }
        res.send(data);
    });
});

// Add a comment
router.post('/', function(req, res) {
    var addedComment = new comments({
        name: req.body.name,
        comment: req.body.comment
    });
    addedComment.save(function(err, data) {
        if(err) {
            console.log('Error', err);
        }
        res.send(data);
    });
});

// Delete a comment
router.delete('/:id', function(req, res) {
    comments.findByIdAndRemove(req.params.id, function(err, data) {
        if(err) {
            console.log('Error', err);
        }
        res.send(data);
    });
});

module.exports = router;