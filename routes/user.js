
/*
 * GET users listing.
 */
var config = require('./../config.js');
var mysql = require('mysql');

connection = mysql.createConnection(config.dbconfig);
//connection.query('USE express');

exports.get_call = function(req, res) {
    if (typeof (req.param("db_name")) !== 'undefined') {
        // if requested database exists we gonna "use" that database
        connection.query('USE ' + req.param("db_name"), function(err, rows) {
            if (typeof (req.param("table_name")) !== 'undefined') {
                
                if (typeof (req.query.limit) !== 'undefined'){
                    // if limit we gonna put limit in query
                    connection.query('SELECT * FROM ' + req.param("table_name") + ' LIMIT '+ req.query.limit, function(err, rows) {
                    res.json({data: rows});
                });
                    
                }
                
                // if table name exists we gonna execute    
                connection.query('SELECT * FROM ' + req.param("table_name"), function(err, rows) {
                    res.json({data: rows});
                });
            }
        });
    }
};

exports.get_callbyid = function(req, res) {
    if (typeof (req.param("db_name")) !== 'undefined') {
        // if requested database exists we gonna "use" that database
        connection.query('USE ' + req.param("db_name"), function(err, rows) {
            if ((typeof (req.param("table_name")) !== 'undefined')&& (typeof (req.param("id")) !== 'undefined') ){
                // if table name exists we gonna execute 
                
                connection.query('SELECT * FROM ' + req.param("table_name") + ' WHERE id = ' + req.param("id") , function(err, rows) {
                    res.json({data: rows});
                });
            }
        });
    }
};
exports.get_callbyfield_name = function(req, res) {
    if (typeof (req.param("db_name")) !== 'undefined') {
        // if requested database exists we gonna "use" that database
        connection.query('USE ' + req.param("db_name"), function(err, rows) {
            if ((typeof (req.param("table_name")) !== 'undefined')&& (typeof (req.param("column_name")) !== 'undefined')&& (typeof (req.param("value")) !== 'undefined')){
                // if table name exists we gonna execute 
                
                connection.query('SELECT * FROM ' + req.param("table_name") + ' WHERE ' + req.param("column_name") + ' LIKE "%'+req.param("value")+'%"' , function(err, rows) {
                    res.json({data: rows});
                });
            }
        });
    }
};
exports.get_callbylimit = function(req, res) {
        console.log("deep");
    if (typeof (req.param("db_name")) !== 'undefined') {
    
        // if requested database exists we gonna "use" that database
        connection.query('USE ' + req.param("db_name"), function(err, rows) {
            if ((typeof (req.param("table_name")) !== 'undefined')&& (typeof (req.query("limit")) !== 'undefined')){
                // if table name exists we gonna execute 
                console.log('SELECT * FROM ' + req.param("table_name") + '?limit=' + req.query("limit"));
                connection.query('SELECT * FROM ' + req.param("table_name") + '?limit=' + req.query("limit") , function(err, rows) {
                    res.json({data: rows});
                });
            }
        });
    }
};
exports.add_user = function(req, res) {
    if (req.param("user") !== '') {
        connection.query("INSERT INTO users (user_name) VALUES ('" + req.param("user") + "')");
    }
    res.redirect('/users');

};
exports.delete_user = function(req, res) {
    // connection.query("DELETE FROM users WHERE user_name='"+req.param("user")+"'");
    console.log(req.query.delete_name);
    res.redirect('/users');
};

exports.update = function(req, res) {
    if (typeof (req.query) !== 'undefined' && typeof (req.query.update_name) !== 'undefined' && req.query.update_name !== '') {
        console.log(req.query.user_name);
        connection.query("UPDATE users SET user_name='" + req.query.user_name + "' WHERE id='" + req.query.update_name + "'");
        res.redirect('/users');
    }
};
exports.delete = function(req, res) {
    if (typeof (req.query) !== 'undefined' && typeof (req.query.delete_name) !== 'undefined' && req.query.delete_name !== '') {
        connection.query("DELETE FROM users WHERE id='" + req.query.delete_name + "'");
        res.redirect('/users');
    }
};
exports.create_db = function(req, res){
    if (typeof (req.param('db_name')) !== 'undefined' ){
        console.log('CREATE DATABASE ' + req.param('db_name'));
        connection.query('CREATE DATABASE ' + req.param('db_name'), function(err, rows) {
                    res.json({data: "Database created"});
                });
    }
};
exports.create_table = function(req, res){
    if (typeof (req.param('db_name')) !== 'undefined' ){
        connection.query('USE ' + req.param("db_name"), function(err, rows){
            
            if ((typeof (req.param('table_name')) !== 'undefined' ) && (typeof (req.param('primary_key')) !== 'undefined' ) && (typeof (req.param('column')) !== 'undefined' ) ){
 
        var columns = eval(req.param('column'));
        console.log(columns);
       // if(req.param('primary_key') in req.param('column') ){
            
            var query = 'CREATE TABLE ' + req.param('table_name') +' ('+req.param('primary_key')+' int, ' ;
            for(x in column){
                query += column[x] + ' varchar(100), ';
            }
            query += ' PRIMARY KEY ('+ req.param('primary_key') + ' ) )';
            
            
       // }
        
    }
            
            
            
            
        });
        
    }
    
    
    
};