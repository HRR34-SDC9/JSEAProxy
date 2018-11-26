const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { Transform } = require('stream');

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


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return new Promise(function(resolve, reject) {
        fs.createReadStream('database/data.csv')
        .on('error', reject)
        .pipe(csv())
        .on('error', reject)
        .pipe(new Transform({
          objectMode: true,
          transform: function(chunk, _, callback) {
            knex('products').insert(chunk).then(function() {
              callback();
            });
          }
        }))
        .on('finish', () => {console.log('file generation complete')})
        .on('error', reject);
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