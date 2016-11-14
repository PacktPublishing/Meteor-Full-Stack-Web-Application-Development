conn = DDP.connect("http://localhost:3000");
URLs = new Mongo.Collection("urls",conn);
conn.subscribe("urls");

function checkSecType(idx,doc){
  if (!doc.src || doc.secType)
    return;
  if (doc.src.toLowerCase().startsWith('https'))
    doc.secType = 'panel-success';
  else
    doc.secType = 'panel-danger';
  URLs.update(idx,doc);
}

URLs.find().observeChanges({
  added:checkSecType,
  changed:checkSecType
});