function(e, params) {
  var form = $(this);
  var fdoc = form.serializeObject();
  var widget = $(this);
  
  var db = $.couch.db("turfmob");
  db.openDoc(fdoc._id, {
	  success : function(userDoc) {
			var message = {};
			message.message = fdoc.message;
			message.nickname = $$("#profile").profile.nickname;
			message.gravatar_url = $$("#profile").profile.gravatar_url;
			var messages = userDoc["messages"];
			if (!messages) messages = new Array();
			messages.push(message);
			userDoc["messages"] = messages;

      db.saveDoc(userDoc, {
        success : function() {
			    form[0].reset();
          widget.trigger("itemReady", [userDoc]);
        }
      });
    }
  });
  return false;
};
