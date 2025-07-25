const express = require('express');
const UserRoute = require('./routes/user')
const QuestionRoute = require('./routes/question');
const ResultRoute = require('./routes/results');

const app = express();
app.use(express.json());



//const cors = require('cors');
//app.use(cors());

app.use('/user', UserRoute)
app.use('/question', QuestionRoute);
app.use('/results', ResultRoute);

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
});
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
