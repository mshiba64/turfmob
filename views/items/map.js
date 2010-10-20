function(doc) {
  if (doc.itemname) {
    emit(doc.itemname, doc);
  }
};