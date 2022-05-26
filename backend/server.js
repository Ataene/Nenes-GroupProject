const express = require("express");
const mongoose = require("mongoose");
let dbConfig = require("./db");
const app = express();

const PORT = process.env.PORT || 3020;

app.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`);
})


// Connecting MongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db).then(() => {
console.log('Database successfully connected!')
},
error => {
	console.log('Could not connect to database : ' + error)
}
)

