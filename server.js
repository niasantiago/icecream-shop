const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient 
const ObjectId = require('mongodb').ObjectId

var db, collection;

const url = "mongodb+srv://niagsantiago:Michelle1977*@cluster0.ajuzlq4.mongodb.net/?retryWrites=true&w=majority";
const dbName = "demo";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => { 
  let iceCream = ['Vanilla', 'Chocolate', 'Strawberry', 'Oreo', 'Coffee', 'Mint ChocolateChip']
  let toppings = ['Caramel', 'Rainbow Sprinkles', 'Hot Fudge', 'Whipped Cream', 'Peanuts', 'Walnuts', 'Cherries', 'Oreos', 'Bananas']
  db.collection('shop').find().toArray((err,orders)=> {
  res.render('index.ejs', {
   toppings, iceCream, orders
  })
})
})


app.post('/submit', (req, res) => {
  const iceCream = req.body.iceCream
  const toppings = req.body.toppings 
  db.collection('shop').insertOne({iceCream, toppings, paid:false}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/payForOrder', (req, res) => {
  console.log(req.body, "thisIsTheBody")
  db.collection('shop')
  .findOneAndUpdate({_id: ObjectId(req.body.id)}, {
    $set: {
      paid: true 
    }
  }, {
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
}) 

// app.put('/messages/thumbDown', (req, res) => { 
//   db.collection('messages')
//   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
//     $set: {
//       thumbDown:req.body.thumbDown + 1  
//     }
//   }, {
//     sort: {_id: -1}, 
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })


app.delete('/clearAll', (req, res) => {
  db.collection('shop').deleteMany({}, (err, result) => {
    if (err) return res.send(500, err)
  })
})






// const express = require('express')
// const app = express()
// const bodyParser = require('body-parser')
// const MongoClient = require('mongodb').MongoClient

// var db, collection;

// const url = "mongodb+srv://niagsantiago:Michelle1977*@cluster0.ajuzlq4.mongodb.net/?retryWrites=true&w=majority";
// const dbName = "demo";

// app.listen(3000, () => {
//     MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
//         if(error) {
//             throw error;
//         }
//         db = client.db(dbName);
//         console.log("Connected to `" + dbName + "`!");
//     });
// });

// app.set('view engine', 'ejs')
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())
// app.use(express.static('public'))

// app.get('/', (req, res) => {
//   db.collection('messages').find().toArray((err, result) => {
//     if (err) return console.log(err)
//     res.render('index.ejs', {messages: result})
//   })
// })

// app.post('/messages', (req, res) => {
//   db.collection('messages').insertOne({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
//     if (err) return console.log(err)
//     console.log('saved to database')
//     res.redirect('/')
//   })
// })

// app.put('/messages', (req, res) => {
//   db.collection('messages')
//   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
//     $set: {
//       thumbUp:req.body.thumbUp + 1
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// }) 

// app.put('/messages/thumbDown', (req, res) => { 
//   db.collection('messages')
//   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
//     $set: {
//       thumbDown:req.body.thumbDown + 1  
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })


// app.delete('/messages', (req, res) => {
//   db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
//     if (err) return res.send(500, err)
//     res.send('Message deleted!')
//   })
// })
