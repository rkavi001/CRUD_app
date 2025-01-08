const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(cors({
  origin: ["crud-app-frontend-vert.vercel.app"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.options("*", cors());

// URL-encoded password for MongoDB connection string
const dbPassword = '%23Rkavi470%23';  // Your encoded password
const dbUser = 'rkaviarasan442';  // Your MongoDB username
const dbCluster = 'cluster0.djugb.mongodb.net';  // Your MongoDB Atlas cluster
const dbName = 'your_db_name';  // Your MongoDB database name

// MongoDB connection string
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
 
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.get('/getUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.put('/updateUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate({ _id: id }, {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  })
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete(id)
    .then(() => res.json({ message: 'User Deleted Successfully' }))
    .catch((err) => res.json(err));
});

app.post('/createUser', (req, res) => {
  UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.listen(3001, () => {
  console.log('server is running');
});
