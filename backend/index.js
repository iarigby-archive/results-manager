const express = require('express')
const app = express()
const morgan = require('morgan')
const fs = require('fs')
const bodyParser = require('body-parser');
const displayFile = (req, res) => {
    // console.log('hi')
    res.status(200)
    res.send({
        "message": "hello"
    })
}

const backend = require('./kuzzle')

const run = async () => {
        await backend.kuzzle.connect();
        const newStudent = await backend.create(
        {
            id: "abcdef",
            student: "teststudent6"
        }
    )
    console.log(newStudent._id)
    const result = await backend.get(newStudent._id)
    console.log(result)
    await backend.refresh()

    
    const newRes = await backend.getAll()
    console.log('new: \n', newRes)

    // backend.kuzzle.disconnect()
}
const midtermController = require('./midterm')
const disputeController = require('./dispute')
// run()

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Content-Type', 'application/json');
    next();
  });
app.use('/midterms/:midtermId/results', midtermController)
app.use('/midterms/:midtermId/disputes', disputeController)
app.listen(3000)