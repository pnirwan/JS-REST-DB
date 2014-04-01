
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
            if (!err) {
                if (typeof (req.param("table_name")) !== 'undefined') {
                    if (typeof (req.query.limit) !== 'undefined') {
                        // if limit we gonna put limit in query
                        connection.query('SELECT * FROM ' + req.param("table_name") + ' LIMIT ' + req.query.limit, function(err, rows) {
                            res.json({"data": rows});
                        });
                    }

                    if ((typeof (req.query.by) !== 'undefined') && (typeof (req.query.order) !== 'undefined')) {
                        if (typeof (req.query.limit) !== 'undefined') {
                            console.log('SELECT * FROM ' + req.param("table_name") + ' ORDER BY ' + req.query.by + ' ' + req.query.order + ' LIMIT ' + req.query.limit);
                            // if order by field name and limit comes we gonna put order by amd limit in query
                            connection.query('SELECT * FROM ' + req.param("table_name") + ' ORDER BY ' + req.query.by + ' ' + req.query.order + ' LIMIT ' + req.query.limit, function(err, rows) {
                                res.json({"data": rows});
                            });
                        }

                        // if order by field name comes we gonna put order by in query
                        connection.query('SELECT * FROM ' + req.param("table_name") + ' ORDER BY ' + req.query.by + ' ' + req.query.order, function(err, rows) {
                            res.json({"data": rows});
                        });
                    }

                    // if table name exists we gonna execute    
                    connection.query('SELECT * FROM ' + req.param("table_name"), function(err, rows) {
                        res.json({"data": rows});
                    });
                }
            } else {
                res.json({"message":"Check your database name"});
            }


        });
    }
};

exports.get_callbyid = function(req, res) {
    if (typeof (req.param("db_name")) !== 'undefined') {
        // if requested database exists we gonna "use" that database
        connection.query('USE ' + req.param("db_name"), function(err, rows) {
            if(!err){
                if ((typeof (req.param("table_name")) !== 'undefined') && (typeof (req.param("id")) !== 'undefined')) {
                // if table name exists we gonna execute 
                connection.query('SELECT * FROM ' + req.param("table_name") + ' WHERE id = ' + req.param("id"), function(err, rows) {
                    res.json({"data": rows});
                });
            }else{
                res.json({"message":"Check your database name"});
            }
                
            }
            
            
        });
    }
};
exports.get_callbylike = function(req, res) {
    if (typeof (req.param("db_name")) !== 'undefined') {
        // if requested database exists we gonna "use" that database
        connection.query('USE ' + req.param("db_name"), function(err, rows) {
            if ((typeof (req.param("table_name")) !== 'undefined') && (typeof (req.param("column_name")) !== 'undefined') && (typeof (req.param("value")) !== 'undefined')) {
                // if table name exists we gonna execute 
                connection.query('SELECT * FROM ' + req.param("table_name") + ' WHERE ' + req.param("column_name") + ' LIKE "%' + req.param("value") + '%"', function(err, rows) {
                    res.json({"data": rows});
                });
            }
            else {
                res.json({mesaage: 'either table name is not defined or column name is not defined'})
            }
        });
    }
};
exports.insert_into = function(req, res) {
    if (typeof (req.param('db_name')) !== 'undefined') {
        connection.query('USE ' + req.param("db_name"), function(err, rows) {

            if ((typeof (req.param('table_name')) !== 'undefined') && (typeof (req.body) !== 'undefined')) {
                var query = 'INSERT INTO ' + req.param('table_name') + ' (';
                var count = 0;
                for (x in req.body) {
                    count++;
                }
                var cnt = 0;
                for (x in req.body) {
                    if (cnt !== count) {
                        query += x;
                    }
                    if (cnt < count - 1) {
                        query += ',';
                    }
                    cnt++;
                }
                query += ') VALUES ( ';
                var cnt = 0;
                for (x in req.body) {
                    if (cnt !== count) {
                        query += '"' + req.body[x] + '"';
                    }
                    if (cnt < count - 1) {
                        query += ',';
                    }
                    cnt++;

                }
                query += ')';
                console.log(query);
                connection.query(query, function(err, rows) {
                    if(!err){
                       res.json({'message': 'Row created successfully'}); 
                    }else{
                        console.log(err);
                        res.json({'message': 'Unknown column'}); 
                    }
                    
                });
            }
        });

    }

};


exports.update_byid = function(req, res) {
    if (typeof (req.param('db_name')) !== 'undefined') {
        connection.query('USE ' + req.param("db_name"), function(err, rows) {

            if ((typeof (req.param('table_name')) !== 'undefined') && (typeof (req.param('id')) !== 'undefined') && (typeof (req.body) !== 'undefined')) {
                var query = 'UPDATE ' + req.param('table_name') + ' SET ';
                var count = 0;
                for (x in req.body) {
                    count++;
                }
                var cnt = 0;
                for (x in req.body) {
                    if (cnt !== count) {
                        query += x + ' = ' + '"' + req.body[x] + '"';
                    }
                    if (cnt < count - 1) {
                        query += ' , ';
                    }
                    cnt++;
                }
                query += ' WHERE id = ' + req.param('id');
                connection.query(query, function(err, rows) {
                    res.json({data: rows});
                });
            }
        });
    }
};
exports.delete_byid = function(req, res) {
    if (typeof (req.param('db_name')) !== 'undefined') {
        connection.query('USE ' + req.param("db_name"), function(err, rows) {

            if ((typeof (req.param('table_name')) !== 'undefined') && (typeof (req.param('id')) !== 'undefined')) {

                connection.query('DELETE FROM ' + req.param('table_name') + ' WHERE id = ' + req.param('id'), function(err, rows) {
                    res.json({data: rows});
                });
            }
        });
    }
};
exports.create_db = function(req, res) {
    if (typeof (req.param('db_name')) !== 'undefined') {
        connection.query('CREATE DATABASE ' + req.param('db_name'), function(err, rows) {
            res.json({'message': "Database created successfully"});
        });
    }
};
exports.create_table = function(req, res) {
    if (typeof (req.param('db_name')) !== 'undefined') {
        connection.query('USE ' + req.param("db_name"), function(err, rows) {
            if(!err){
                 if ((typeof (req.param('table_name')) !== 'undefined') && (typeof (req.param('primary_key')) !== 'undefined') && (typeof (req.param('columns')) !== 'undefined')) {
                var col = JSON.parse(req.body.columns);
                var flag = false;
                for (x in col) {
                    if (x == req.param('primary_key')) {
                        flag = true;
                    }
                }
                if (!flag) {
                    res.json({'message': 'Primary key not in column name'})
                } else {
                    var query = 'CREATE TABLE ' + req.param('table_name') + ' ( '
                    for (x in col) {
                        query += x + ' ' + col[x] + ' , ';
                    }
                    query += 'PRIMARY KEY(' + req.param('primary_key') + ') )';
                    connection.query(query, function(err, rows) {
                        res.json({'message': 'Table created successfully'});
                    });
                }
            }
                
            }else{
                res.json({"message":"Check your database name"});
            }

           
            
        });
    }
};
exports.delete_db = function(req, res) {
    if (typeof (req.param('db_name')) !== 'undefined') {
        connection.query('DROP DATABASE ' + req.param('db_name'), function(err, rows) {
            res.json({'message': 'Database deleted successfully'});
        });
    }
    else {
        res.json({'message': 'No such database exists'});
    }
};
exports.delete_table = function(req, res) {
    if (typeof (req.param('db_name')) !== 'undefined') {
        connection.query('USE ' + req.param("db_name"), function(err, rows) {
            if (typeof (req.param('table_name')) !== 'undefined') {
                connection.query('DROP TABLE ' + req.param('table_name'), function(err, rows) {
                    res.json({'message': 'rows'});
                });
            }
        });
    }
};