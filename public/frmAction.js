$(function() {
$('[name="update_name"]').on('click',function(){
$(this).closest('form').attr('action','users/update');
});
$('[name="delete_name"]').on('click',function(){
$(this).closest('form').attr('action','users/delete');
});
  });