var express = require('express')
  , app = express()
  , mongo = require('mongodb')
  , ObjectId = require('mongodb').ObjectID
  , fs = require('fs');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('ds033669.mongolab.com', 33669, {auto_reconnect: true});
db = new Db('placius', server, {safe: true});
   
app.listen(3000);

db.open(function(err, db) {
  
  db.authenticate('douwevdijk', 'willem901', function(err, result) {
  
  });
  
});

app.configure(function(){
  app.set('view engine', 'jade');
  app.use(express.bodyParser({ uploadDir: __dirname + '/public', keepExtensions: true }));
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.static(__dirname + '/public'));
  app.use(express.session({ secret: 'test' }));
 });
 
 app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Cache-Control');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Max-Age', 86400);
  next();
 });
 
app.post('/api/images', function (req, res) {

var path = req.files.file.path;
var filename = path.replace(/^.*[\\\/]/, '');

var obj = {filename: '/api/public/' + filename};

     db.collection('photos', function(err, collection) {
         collection.insert(obj, function(err, items) {

		  res.json(items);
			
      });
	});
});

app.get('/', function (req, res) {

	res.send('t werkt');
	
});

app.get('/api/members', function (req, res) {

db.collection('members', function(err, collection) {
        collection.find({},{about:0, places:0}).toArray(function(err, items) {
		       
			res.json(items);
        });
    })
});

app.get('/api/members/:email', function(req, res) {

  var email =  req.params.email;
	  
  db.collection('members', function(err, collection) {
         collection.find({email: email}).toArray(function(err, items) {
		       
			res.json(items);
			
        });
	});

});

app.post('/api/members/:id', function(req, res) {

  var id =  req.params.id;
  var profile = req.body;
  
  delete profile['_id'];
	  
    db.collection('members', function(err, collection) {
	
         collection.update({'_id': ObjectId(id)}, {$set: profile}, function(err, items) {
		       
			res.json(items);
			
        });
	});

});

app.get('/api/places', function (req, res) {

db.collection('places', function(err, collection) {
        collection.find({},{about:0}).toArray(function(err, items) {
		       
			res.json(items);
        });
    })
});

app.post('/api/places/update/:id', function(req, res) {

  var id =  req.params.id;
  var place = req.body;
  
  delete place['_id'];
	  
    db.collection('places', function(err, collection) {
         collection.update({'_id': ObjectId(id)}, {$set: place}, function(err, items) {
		       
			res.json(items);
			
        });
	});

});

app.post('/api/places/new', function(req, res) {

     db.collection('places', function(err, collection) {
         collection.insert(req.body, function(err, items) {
		       
			res.json(items);
			
        });
	});

});

app.get('/api/places/my/:id', function(req, res) {

  var id =  req.params.id;

    db.collection('places', function(err, collection) {
         collection.find({ friends: { $elemMatch: { id: id }}}).toArray(function(err, items) {
		       
			res.json(items);
			
        });
	});

});

app.get('/api/messageboard', function (req, res) {

db.collection('messageboard', function(err, collection) {
        collection.find({}).toArray(function(err, items) {
		       
			res.json(items);
        });
    })
});

app.post('/api/messageboard/new', function(req, res) {

      db.collection('messageboard', function(err, collection) {
         collection.insert(req.body, function(err, items) {
		       
			res.json(items);
			
        });
	});

});

app.get('/api/library', function (req, res) {

db.collection('library', function(err, collection) {
        collection.find({}).toArray(function(err, items) {
		       
			res.json(items);
        });
    })
});

app.get('/api/events', function (req, res) {

db.collection('events', function(err, collection) {
        collection.find({}).toArray(function(err, items) {
		       
			res.json(items);
        });
    })
});

app.get('/api/mail/:id', function (req, res) {

var id =  req.params.id;

db.collection('mail', function(err, collection) {
        collection.find({'mail_id': id}).toArray(function(err, items) {
		       
			res.json(items);
        });
    })
});

app.get('/api/conferences', function (req, res) {

db.collection('conferences', function(err, collection) {
        collection.find({}).toArray(function(err, items) {
		       
			res.json(items);
        });
    })
});

app.post('/api/conferences', function (req, res) {

db.collection('conferences', function(err, collection) {
        
		console.log(req.body);
		
   });

});





