var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var data;
var my_database = mysql.createConnection({
     host: '*****',
     port : '****',
     user : '****',
     password: '****',
     database: '*****'
});
my_database.connect(function(err){
     if (err) throw err;
     console.log('connected');
     my_database.query('SELECT * from contacts', function(err,   result, fields){
          if (err) throw err;
          data = result;
          router.get('/', function(req, res, next) {
               res.send(JSON.stringify(data));
          });
     });
});

router.put('/put', (req, res) => {
     let usr = req.body;
     var sql = "UPDATE contacts SET Ime = ?, Prezime = ?, Email = ?, Telefon = ?, Adresa = ?, Linkedin = ?, Skype = ?, Instagram = ?,  Datum_rodjenja = ?, JMBG = ? WHERE JMBG = ?"
     my_database.query(sql, [usr.ime, usr.prezime, usr.email, usr.telefon, usr.adresa, usr.linkedin, usr.skype, usr.instagram, usr.datumRodjenja, usr.jmbg, usr.jmbg], (err, rows, fields) => {
         if (!err) {
          my_database.query('SELECT * from contacts', function(err,   result, fields){
               if (err) throw err;
               data = result;
               console.log(data);
               router.get('/', function (req,res, next) {
                    res.send(JSON.stringify(data));
               });
          });
         }
         else
          console.log(err);
     })
 });

router.post('/post', (req, res) => {
     let usr = req.body;
     var sql = "INSERT INTO contacts (Ime, Prezime, Email, Telefon, Adresa, Linkedin, Skype, Instagram, Datum_rodjenja, JMBG) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
     my_database.query(sql, [usr.ime, usr.prezime, usr.email, usr.telefon, usr.adresa, usr.linkedin, usr.skype, usr.instagram, usr.datumRodjenja, usr.jmbg], (err, rows, fields) => {
         if (!err)
          {
          my_database.query('SELECT * from contacts;', function(err,result, fields){
               if (err) throw err;
               data = result;
               console.log(data);
               router.get('/', function (req,res, next) {
                    res.send(JSON.stringify(data));
               });
          });}
         else
          console.log(err);
     })
 });

router.delete('/delete', (req, res) => {
     let usr = req.body;
     my_database.query('DELETE FROM contacts WHERE JMBG = ?', [usr.JMBG], (err, rows, fields) => {
         if (!err)
         {
           my_database.query('SELECT * from contacts;', function(err,result, fields){
                if (err) throw err;
                data = result;
                console.log(data);
                router.get('/', function (req,res, next) {
                    res.send(JSON.stringify(data));
                });
           });
          }
         else
          console.log(err);
     })
 });

module.exports = router;