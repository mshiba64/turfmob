function(e) {

  e.preventDefault();
  var data = {};
  var widget = $(this);

  $.each($("form :input").serializeArray(), function(i, field) {
    data[field.name] = field.value;
  });

  $("form :file").each(function() {
    data[this.name] = this.value; // file inputs need special handling
  });

  if (!data.itemimage || data.itemimage.length == 0) {
    alert("Please select a file to upload.");
    return;
  }

  var db = $$(this).app.db;
  var docurl = db.uri + $.couch.encodeDocId("test");
  alert(docurl);

  $(this).ajaxSubmit({
    url:  docurl,
    beforeSubmit: showRequest,
    success: function(resp) {
			widget.trigger("ItemPost");
    }
  });
}


