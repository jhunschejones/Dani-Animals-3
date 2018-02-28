var express = require('express');
var router = express.Router();

/* GET animals listing. */
router.get('/animallist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
    res.json(docs);
  })
});

// POST to addAminal

router.post('/addanimal', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});

// DELETE to deleteanimal
router.delete('/deleteanimal/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  var animalToDelete = req.params.id;
  collection.remove({'_id' : animalToDelete }, function(err) {
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
  });
});


module.exports = router;
