var mongoose = require('mongoose')

mongoose.connect('mongodb+srv://root:123@cluster0-pguup.mongodb.net/ppa?retryWrites=true&authSource=admin', { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('Failed to connect to database');
        process.exit(-1);
    }
    else {
        console.log('Connected to database');
    }
})

module.exports = mongoose;