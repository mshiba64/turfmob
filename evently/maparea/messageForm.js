function(e, params) {
	var widget = $(this);

	// load the item from the user doc
	var db = $.couch.db("turfmob");
	var itemDocId = params.id;

	db.openDoc(itemDocId, {
		success : function(itemDoc) {
			widget.trigger("itemReady", [itemDoc]);
		}
	});
}
