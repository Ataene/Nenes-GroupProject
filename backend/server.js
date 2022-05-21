const express = require("express");
const app = express();

const PORT = process.env.PORT || 3020;

app.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`);
})
