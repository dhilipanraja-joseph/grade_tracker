const squel = require('squel');
const mysql = require('mysql');
const uuid = require('uuid');

const connection = require('./connectdb');


connection.query(`create table if not exists assignments (
    id varchar(50),
    name varchar(100),
    points int,
    score int
  )`, err => {
    if(err) {
      console.log('TABLE CREATE ERROR:', err);
    }
  });


exports.getAll = function() {
  return new Promise((resolve, reject) => {
    let sql = squel.select().from('assignments').toString();

    connection.query(sql, (err, assignments) => {
      if(err) {
        reject(err);
      } else {
        resolve(assignments);
      }
    });
  });
};

exports.getOne = function(id) {
  return new Promise((resolve, reject) => {
    let sql = squel.select()
                   .from('assignments')
                   .where('id = ?', id)
                   .toString();

    connection.query(sql, (err, assignments) => {
      let assignment = assignments[0];

      if(err) {
        reject(err);
      } else {
        resolve(assignment);
      }
    });
  });
};

exports.create = function(newAssignment) {
  return new Promise((resolve, reject) => {

    let sql = squel.insert()
                   .into('assignments')
                   .setFields(newAssignment)
                   .set('id', uuid())
                   .toString();

    connection.query(sql, err => {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.delete = function(id) {
  return new Promise((resolve, reject) => {
    let sql = squel.delete()
                   .from('assignments')
                   .where('id = ?', id)
                   .toString();

    connection.query(sql, (err, result) => {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};


exports.update = function(id, updateObj) {
  return new Promise((resolve, reject) => {

    let sql = squel.update()
                   .table('assignments')
                   .setFields(updateObj)
                   .where('id = ?', id)
                   .toString();

    connection.query(sql, (err, okObject) => {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};


// exports.totals = function(id, updateObj) {
//   return new Promise((resolve, reject) => {
//
//     let sql = squel.update()
//                    .table('assignments')
//                    .setFields(updateObj)
//                    .where('id = ?', id)
//                    .toString();
//
//     connection.query(sql, (err, okObject) => {
//       if(err) {
//         reject(err);
//       } else {
//         resolve();
//       }
//     });
//   });
// };
