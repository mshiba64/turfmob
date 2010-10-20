function() {
  var form = $(this);
  var fdoc = form.serializeObject();
  var widget = $(this);
  
  fdoc.created_at = new Date();
  fdoc.profile = $$("#profile").profile;
  $$(this).app.db.saveDoc(fdoc, {
    success : function() {
      form[0].reset();
      widget.trigger("Messages");
    }
  });
  return false;
};
