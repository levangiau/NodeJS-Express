//chen một HTML vào 
var express = require('express');
var router = express.Router();
//khai báo path cho 
var path = require('path');
//tạo đường dẫn đi đên
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'home.html')); //tạo đường dẫn đi đến views => index.html(file mong muốn được đọc)
});


module.exports = router;