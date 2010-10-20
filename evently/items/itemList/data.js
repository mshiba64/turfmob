function(data) {
  // $.log(data)
  var p;
  return {
    items : data.rows.map(function(r) {
      p = (r.value && r.value.profile) || {};
      p._id = r.value && r.value._id;
      p.itemname = r.value && r.value.itemname;
      p.price = r.value && r.value.price;
      return p;
    })
  }
};