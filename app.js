var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//cài đặt yêu cầu với cors
var cors = require('cors');
//cai dat voi yeu cau url
var url = require('url');
//tao một biến với body-parser trong trường hợp method gửi lên "POST" khác với method trên url là "GET"
const bodyParser = require('body-parser');

//
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aRouter = require('./routes/a'); //đăng kí kiểu path muốn đưa vào
var shoprouter = require('./routes/shop');
//đăng kí adb
var adb = require('./routes/adb');
const router = require('./routes/users');
var app = express();
//su dung route truc tieep


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/a', aRouter); //xác nhận sử dụng tên đã đăng kí đó
app.use('/shop', shoprouter);
app.use('/adb', adb);
//use route tu tao bằng phương thức GET
app.use('/g', (req, res, next) => {
    res.send('<form action="/ad" method="GET"><input type = "text" id = "fname" name = "name" > <input type = "submit"value = "Submit" > </form> ');
    console.log('it running');

});

app.use('/ad', (req, res, next) => {
    var a = url.parse(req.url, true).query;
    console.log(a.name);
    res.redirect('/aaa');
});
app.use('/aaa', (req, res, next) => {
    res.send('<h1>Day la trang cuoi</h1>');
});

/*Note: Nếu trường hợp phương thức gửi là "GET" thì mọi vấn đề sẽ bình thường nhưng nếu trường hợp gửi dữ liệu là "POST" thì phải
có một package thứ 3 để chuyển đổi phương thức như: body_parser,... chỉ lấy nội dung trong phạm vi thẻ body => trong trường hợp sử dụng 
nếu method "GET"=> khi đó ta dùng "app.get" để cho tương đồng với method, tương tự "POST" cũng vậy(chỉ áp dụng tại chính laptop/PC cá nhân)
nếu trên server thì sẽ có đk quản lý khác.

 */
//Phương thức gửi bằng POST
//sử dụng body-parser
app.use(bodyParser.urlencoded({
    extended: false
})); // biến đổi phương thức gọi ở body từ "POST" => "GET"

app.use('/gg', (req, res, next) => {
    res.send('<form action="/ada" method="POST"><input type = "text" id = "fname" name = "name" > <input type = "submit"value = "Submit" > </form> ');
    console.log('it running');

});

app.use('/ada', (req, res, next) => {
    console.log(req.body.name);
    res.redirect('/aaad');
});
app.use('/aaad', (req, res, next) => {
    res.send('<h1>Day la trang cuoi</h1>');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
//ex


module.exports = app;