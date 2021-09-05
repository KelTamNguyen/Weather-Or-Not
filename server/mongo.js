const mongoose = require('mongoose');
const Task = require('./models/task');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
// const name = process.argv[3]
// const number = process.argv[4]

// rename

const task = new Task({
    task: "Chill",
    completed: true
})

// task.save().then(result => {
//     console.log(`task saved`)
//     mongoose.connection.close()
// })

Task.find({}).then(result => {
    result.forEach(task => {
        console.log(task);
    })
    mongoose.connection.close()
})