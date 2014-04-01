
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
                if (typeof (req.query.limit) !== 'undefined') {
                    // if limit we gonna put limit in query
                    connection.query('SELECT * FROM ' + req.param("table_name") + ' LIMIT ' + req.query.limit, function(err, rows) {
                        res.json({data: rows});
                    });
                }
                else{
                    res.json({message: 'limit is not defined'});
                }
                if ((typeof (req.query.by) !== 'undefined') && (typeof (req.query.order) !== 'undefined')) {
                    if (typeof (req.query.limit) !== 'undefined') {
                        console.log('SELECT * FROM ' + req.param("table_name") + ' ORDER BY ' + req.query.by + ' ' + req.query.order + ' LIMIT ' + req.query.limit);
                        // if order by field name and limit comes we gonna put order by amd limit in query
                        connection.query('SELECT * FROM ' + req.param("table_name") + ' ORDER BY ' + req.query.by + ' ' + req.query.order + ' LIMIT ' + req.query.limit, function(err, rows) {
                            res.json({data: rows});
                        });
                    }
                    else{
                        res.json({message: 'either order by or limit is not defined'})
                    }
                    // if order by field name comes we gonna put order by in query
                    connection.query('SELECT * FROM ' + req.param("table_name") + ' ORDER BY ' + req.query.by + ' ' + req.query.order, function(err, rows) {
                        res.json({data: rows});
                    });
                }
                else{
                    res.json({message: 'order by is not defined'})
                }
                // if table name exists we gonna execute    
                connection.query('SELECT * FROM ' + req.param("table_name"), function(err, rows) {
                    res.json({data: rows});
                });
            }
            else{
                res.json({message: 'table is not defined'})
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
            else{
                res.json({message: 'either table name is not defined or id is not defined'})
            }
        });
    }
};
exports.get_callbylike = function(req, res) {
    if (typeof (req.param("db_name")) !== 'undefined') {
        // if requested database exists we gonna "use" that database
        connection.query('USE ' + req.param("db_name"), function(err, rows) {
            if ((typeof (req.param("table_name")) !== 'undefined')&& (typeof (req.param("column_name")) !== 'undefined')&& (typeof (req.param("value")) !== 'undefined')){
                // if table name exists we gonna execute 
                connection.query('SELECT * FROM ' + req.param("table_name") + ' WHERE ' + req.param("column_name") + ' LIKE "%'+req.param("value")+'%"' , function(err, rows) {
                    res.json({data: rows});
                });
            }
            else{
                res.json({mesaage: 'either table name is not defined or column name is not defined'})
            }
        });
    }
};
exports.insert_into = function(req, res) {
     if (typeof (req.param('db_name')) !== 'undefined' ){
        connection.query('USE ' + req.param("db_name"), function(err, rows){
            
            if ((typeof (req.param('table_name')) !== 'undefined' )){
 
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


exports.update_byid = function(req, res) {
    if (typeof (req.param('db_name')) !== 'undefined' ){
        connection.query('USE ' + req.param("db_name"), function(err, rows){
            
            if ((typeof (req.param('table_name')) !== 'undefined' ) && (typeof (req.param('id')) !== 'undefined' )){
 
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
exports.delete_byid = function(req, res) {
    if (typeof (req.param('db_name')) !== 'undefined' ){
        connection.query('USE ' + req.param("db_name"), function(err, rows){
        
        if ((typeof (req.param('table_name')) !== 'undefined' ) && (typeof (req.param('id')) !== 'undefined' ) ){
            
            connection.query('DELETE FROM ' + req.param('table_name') + ' WHERE id = '+ req.param('id'), function(err, rows) {
                    res.json({data: rows});
              });
        }
        
        
        
                
    });
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