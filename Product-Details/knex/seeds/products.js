const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const parse = require('csv-parse');
const { Transform } = require('stream');
// const data = require('../../database/generate.js')

// const transformCSV = new Transform({
//   objectMode: true,
//   transform: function(chunk, _, next) {
//     knex(products).insert(chunk).then(function() {
//       next();
//     }, next);
//   }, function (done) {
//     resolve();
//     done();
//   }
// });

const results = []

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return new Promise(function(resolve, reject) {
        fs.createReadStream('database/data.csv')
        .on('data', () => {console.time(`time to seed database:`)})
        .on('error', reject)
        .pipe(csv({separator: '\t'}))
        .on('error', reject)
        .pipe(new Transform({
          objectMode: true,
          transform: function(chunk, _, callback) {
            knex('products').insert(chunk).then(function() {
              callback();
            });
          },
          function() {
            resolve();
          }
        }))
        .on('error', reject)
        .on('finish', () => {console.timeEnd(`time to seed database:`)});
      })
    });
};

// exports.seed = function(knex, Promise) {
//   // Deletes ALL existing entries
//   return knex('products').del()
//     .then(function () {
//       // Inserts seed entries
//       return new Promise(function(resolve, reject) {
//         fs.createReadStream('database/data.csv')
//         .on('error', reject)
//         .pipe(csv())
//         .on('error', reject)
//         .pipe(new Transform({
//           objectMode: true,
//           transform: function(chunk, _, next) {
//             knex('products').insert(chunk).then(function() {
//               next();
//             }, next);
//           }, function (done) {
//             resolve();
//             done();
//           }
//         }))
//         .on('error', reject);
//       })
//     });
// };