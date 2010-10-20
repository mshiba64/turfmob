function() {
  var md5 = $$(this).app.require("vendor/couchapp/lib/md5");
  
  // TODO this can be cleaned up with docForm?
  // it still needs the workflow to edit an existing profile
  var name = $("input[name=userCtxName]",this).val();
  var newProfile = {
    rand : Math.random().toString(), 
    nickname : $("input[name=name]",this).val(),
    email : $("input[name=email]",this).val(),
    birthday_y : $("input[name=birthday_y]",this).val(),
    birthday_m : $("input[name=birthday_m]",this).val(),
    birthday_d : $("input[name=birthday_d]",this).val(),
    sex : $("input[name=sex]",this).val(),
    meetup_location : $("input[name=meetup_location]",this).val(),
    home_address : $("input[name=home_address]",this).val(),
    alias : $("input[name=alias]",this).val()
  }, widget = $(this);

  // setup gravatar_url
  if (md5) {
    newProfile.gravatar_url = 'http://www.gravatar.com/avatar/'+md5.hex(newProfile.email || newProfile.rand)+'.jpg?s=40&d=identicon';    
  }

  // store the user profile on the user account document
  $.couch.userDb(function(db) {
    var userDocId = "org.couchdb.user:"+name;
    db.openDoc(userDocId, {
      success : function(userDoc) {
        userDoc["couch.app.profile"] = newProfile;
        db.saveDoc(userDoc, {
          success : function() {
            newProfile.name = userDoc.name;
            $$(widget).profile = newProfile;
            widget.trigger("profileReady", [newProfile]);
          }
        });
      }
    });
  });
  return false;
}