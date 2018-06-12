const bcrypt = require('bcrypt');
const Mysql = require('../../models/mysql');
// var log4js = require('log4js');
// var logger = log4js.getLogger('KEEEN-VT');
const models = require('../../../models');
var Sequelize = require('sequelize');


module.exports.getUserByUsername = function (username, callback) {
    var sql =`select name from product `;
    models.sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT, raw: true }).then(response => { debugger
        var data = response;
        // response.forEach(dataValues => {
        //     data.push({
        //         createdAt: dataValues.createdAt,
        //         description: dataValues.description,
        //         id: dataValues.id,
        //         name: dataValues.name,
        //         updatedAt: dataValues.updatedAt
        //     });
        //     // console.log(dataValues);
        // });
        debugger
        data.forEach(element => {
            console.log(element);
        });
        callback(null, data[0].password);
    })
    // var sql = `select password from user where user='` + username + `'`;
    // Mysql.query(sql, (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         callback('false', false);
    //     }
    //     callback(null, data[0].password);
    // })
}

exports.cryptPassword = function (password, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err)
            return callback(err);

        bcrypt.hash(password, salt, function (err, hash) {
            return callback(err, hash);
        });
    });
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.hash(candidatePassword, 10, function (err, hash) {
        if (err) { throw (err); }
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) {
                throw err;
            }
            callback(null, isMatch);
        })
    })
}
