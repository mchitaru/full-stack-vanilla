const express = require('express')
const cors = require('cors')
const multer = require('multer')
const upload = multer()

const mongo = require('mongodb')
const MongoClient = mongo.MongoClient

// Connection URL
const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)
let db = null

const app = express()
//establish a static path for public folder
app.use(express.static("public"))
//fix cors errors
app.use(cors())

app.get('/posts', async (req, res) => {
    const collection = db.collection('posts')
    const posts = await collection.find({}).toArray()
    res.json(posts)
  
    // res.json([
    //     {
    //         title: "First post",
    //         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porta, lorem non hendrerit lobortis, est magna vehicula enim, vel pellentesque sapien ligula a tortor. Pellentesque vitae justo nec velit sodales ullamcorper. Aliquam quis mi ac metus venenatis venenatis non et nunc. Donec convallis ut lacus sed laoreet. Aenean et sem pulvinar, pharetra quam dignissim, porttitor leo. Sed auctor tortor sit amet magna sollicitudin, quis posuere ligula ullamcorper. Pellentesque interdum lobortis lacus nec aliquam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    //         image: "images/javascript.jpg"
    //     },
    //     {
    //         title: "Second post",
    //         description: "Etiam a eros urna. Fusce euismod libero odio, sed consectetur arcu finibus ut. Quisque viverra velit nibh, ut porttitor quam luctus eu. Donec vulputate non metus quis molestie. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse ac feugiat erat, vitae dictum lectus. Proin et urna eu ex dignissim accumsan. Vivamus consectetur arcu nec arcu fringilla feugiat.",
    //         image: "images/react.png"
    //     },
    //     {
    //         title: "Third post",
    //         description: "Duis maximus felis purus. Aliquam quis luctus justo. Praesent efficitur faucibus cursus. In bibendum est at porta tristique. Nam massa mauris, volutpat at congue sed, accumsan in erat. Phasellus malesuada at ligula eu posuere. Vestibulum eleifend ornare magna. Nam ac erat arcu. In eu vestibulum erat, at hendrerit metus. Pellentesque diam sem, fermentum sed pharetra sit amet, pellentesque fringilla mi. Vestibulum at justo eu urna tincidunt tincidunt. Donec eleifend, nibh efficitur pulvinar ultrices, elit arcu interdum elit, ac imperdiet ex massa ut purus. Mauris magna nunc, tincidunt ac quam in, mattis vestibulum arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;",
    //         image: "images/software.jpg"
    //     }
    // ])
})

app.get('/posts/:id', async (req, res) => {
    const id = req.params.id
    const collection = db.collection('posts')
    const post = await collection.findOne({
        _id: new mongo.ObjectId(id)
    })
    res.json(post)
  
    // res.json(
    //     {
    //         title: "First post",
    //         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porta, lorem non hendrerit lobortis, est magna vehicula enim, vel pellentesque sapien ligula a tortor. Pellentesque vitae justo nec velit sodales ullamcorper. Aliquam quis mi ac metus venenatis venenatis non et nunc. Donec convallis ut lacus sed laoreet. Aenean et sem pulvinar, pharetra quam dignissim, porttitor leo. Sed auctor tortor sit amet magna sollicitudin, quis posuere ligula ullamcorper. Pellentesque interdum lobortis lacus nec aliquam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    //         image: "images/javascript.jpg"
    //     })
})

app.post('/posts', upload.none(), async (req, res) => {
    console.log(req.body)
    const collection = db.collection('posts')
    const post = await collection.insertOne(req.body)
    res.json(post)
})

// Database Name
const dbName = 'blog'

async function main() {
  // Use connect method to connect to the server
  await client.connect()
  console.log('Connected successfully to db server')
  db = client.db(dbName)

  app.listen(3000)  
  console.log("Server started on port 3000")

  return 'done.'
}

main()
  .then(console.log)
  .catch(console.error)
//   .finally(() => client.close())
