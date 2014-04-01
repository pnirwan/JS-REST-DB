
/**
 * Module dependencies.
 */
var routes = require('./config.js');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
app.get('/', routes.index);  // Route for home page
app.get('/:db_name/:table_name', user.get_call);// Route for users list and delete user
app.get('/:db_name/:table_name/:id', user.get_callbyid);
app.get('/:db_name/:table_name/:column_name/:value', user.get_callbylike);

app.post('/:db_name/table', user.create_table);
app.post('/:db_name/:table_name', user.insert_into);// Route to add user
app.post('/database', user.create_db);


app.put('/:db_name/:table_name/:id', user.update_byid);// Route to update user
app.delete('/:db_name', user.delete_db);// Route to delete user
app.delete('/:db_name/:table_name', user.delete_table);// Route to delete user
app.delete('/:db_name/:table_name/:id', user.delete_byid);// Route to delete user

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});