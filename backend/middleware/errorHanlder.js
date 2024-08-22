
// Error handling middleware
const errorHandler = function (err, req, res, next) {
    console.log(err);
  
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    res.status(err.status || 500);
    res.send('Invalid API Request');
};

export default errorHandler