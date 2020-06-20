const express = require('express');
const app = express();
const port = 3000
const fs = require('fs')

app.get('/read-file', (req, res, next) => {

    fs.readFile('./sample.txt', 'utf8', (error, result) => {
        if (error) {
            res.json({
                status: false,
                message: "Failed  to read file",
                error
            })
        }
        else {
            res.json({
                status: true,
                message: "Successfully get file content",
                entity: result
            })
        }
    });

});

app.listen(port, () => console.log(`server listening to port : ${port}`));