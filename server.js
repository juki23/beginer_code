var express = require("express");
var mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
    connectionLimit: 100, //important
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'devicemng',
    multipleStatements: true,
    debug: false
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('db connection successs');
    } else {
        console.log('db connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
    }
});


var app = express();
var bodyparser = require('body-parser');

app.use(express.static(__dirname + "/Projects"));
app.use(bodyparser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', ['*']);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Device

app.post('/api/device/getAllDevices', (req, res) => {
    let dataPage = req.body.data;
    let currentPage = dataPage.currentPage;
    let pageSize = dataPage.pageSize;
    let locationFrom = (currentPage - 1) * pageSize;
    let quantity = pageSize;
    let limit = [locationFrom, quantity];
    let sql = 'SELECT *,(SELECT COUNT(*) FROM device) AS amount FROM device ORDER BY id DESC LIMIT ?,?';
    mysqlConnection.query(sql, limit, (err, rows, fields) => {
        if (!err) {
            let data = {
                message: "success",
                data: rows
            }
            res.send(data);
        } else
            console.log(err);
    });
});

app.get('/api/device/getDevice/:id', (req, res) => {
    var query = "SELECT * FROM device WHERE id = ?";
    mysqlConnection.query(query, [req.params.id], (err, rows, fields) => {
        if (!err) {
            let data = {
                message: "success",
                data: rows
            }
            res.send(data);
        } else {
            console.log(err);
        }
    });
});

app.delete('/api/device/deleteDevice/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM device WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            let retData = {
                message: "success",
                data: rows
            };
            res.send(retData);
        } else {
            console.log(err);
            let resError = {
                message: "error",
                error: err
            };
            res.json(resError);
        }
    });
});

app.post('/api/device/insertDevice', (req, res) => {
    let dev = req.body.data;
    var sql = 'INSERT INTO device (device_name,artist) VALUES (?,?)';
    var device = [dev.device_name, dev.artist];
    mysqlConnection.query(sql, device, (err, rows, fields) => {
        if (!err) {
            let retData = {
                message: "success",
                data: rows
            };
            res.send(retData);
        } else {
            console.log(err);
            let resError = {
                message: "error",
                error: err
            };
            res.json(resError);
        }
    });
});

app.put('/api/device/updateDevice', (req, res) => {
    let dev = req.body.data;
    var sql = 'UPDATE device SET device_name =  ?, artist = ? WHERE id = ?';

    var device = [dev.device_name, dev.artist, dev.id]
    mysqlConnection.query(sql, device, (err, rows, fields) => {
        if (!err) {
            let retData = {
                message: "success",
                data: rows
            };
            res.send(retData);
        } else {
            let resError = {
                message: "error",
                error: err
            };
            res.json(resError);
        }
    });
});
// END PRODUCT
app.listen(3000, () => {
    console.log('Express Running with port 3000');
});