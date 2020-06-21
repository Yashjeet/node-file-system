const express = require('express');
const app = express();
const port = 3000
const fs = require('fs')
const fileUpload = require('express-fileupload');

app.use(fileUpload())

app.get('/read-file', (req, res, next) => {


});

app.post('/upload-file', (req, res, next) => {

    const dir = __dirname + '/upload';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    const file = req.files.file;
    fs.writeFile(`./upload/${file.name}`, file.data, 'utf8', (error, writeResult) => {
        if (error) {
            res.send({
                status: false,
                message: 'File upload failed'
            })
        }
        else {
            fs.readFile(`./upload/${file.name}`, 'utf8', (readFileError, result) => {
                if (readFileError) {
                    res.send({
                        status: false,
                        message: 'File read failed'
                    })
                }
                res.json({
                    status: true,
                    message: "File upload successfully!",
                    entity: result
                })
            })
        }
    })
});

app.listen(port, () => console.log(`server listening to port : ${port}`));