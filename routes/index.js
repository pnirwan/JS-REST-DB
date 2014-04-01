
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express', 'welcome_message':'Express-MySql CRUD'});
};