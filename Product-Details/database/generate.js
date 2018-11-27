const faker = require("faker");
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');
const stringify = require("csv-stringify");
const generate = require("csv-generate");

  const capitalizeFirst = str => {
    let capitalized = str[0].toUpperCase();
    for (let i = 1; i < str.length; i++) {
      if (str[i - 1] === " ") {
        capitalized += str[i].toUpperCase();
      } else {
        capitalized += str[i];
      }
    }
    return capitalized;
  };

  const randomNum = () => Math.floor(Math.random() * Math.floor(100));

  const populateImages = index => {
    const images = [
      {
        image: `https://s3-us-west-1.amazonaws.com/hrr34-trailblazer/${index}-min.jpg`,
        color: capitalizeFirst(faker.commerce.color())
      }
    ];
    let numOfImages;

    for (let i = 4; i > 0; i -= 1) {
      if (index % i === 0) {
        numOfImages = i - 1;
        break;
      }
    }
    for (let i = 1; i <= numOfImages; i++) {
      images.push({
        image: `https://s3-us-west-1.amazonaws.com/hrr34-trailblazer/${randomNum()}-min.jpg`,
        color: capitalizeFirst(faker.commerce.color())
      });
    }
    return images;
  };

  // const products = [];

  /*
  When the read method is called on a readable stream, the implementation can push partial data to the queue. For example, we can push one product at a time, starting with the header, and incrementing that on every push. The read method will continue to fire, and we’ll push more products. We need to stop this cycle somewhere, and that’s why an if statement to push null when the count is equal to the endCount.
  */

  let count = 1;
  let endCount = 10000001;
  let divisor = 1000000;

  const writeStream = fs.createWriteStream(__dirname + '/data.csv');

  const incomingData = new Readable({
    // objectMode: true,

    read() {
      if (count === 1) {
        console.time(`time to generate these rows`);
        this.push('_id\tname\trating\treviewCount\titemNum\tprice\tmainImage\timages\n');
      }

      this.push(`${count}\t${faker.commerce.productName()}\t${faker.finance.amount(1, 5, 1)}\t${faker.random.number({min: 20, max: 150})}\t${count}\t${faker.commerce.price(50, 500)}\thttps://s3-us-west-1.amazonaws.com/hrr34-trailblazer/${faker.random.number({ min: 1, max: 100 })}-min.jpg\t${JSON.stringify(populateImages(count))}\n`);

      count++
      if (count === endCount) {
        this.push(null)
      }
      if (count % divisor === 0) {
        console.log(`${count} rows have been created`);
        console.timeEnd(`time to generate these rows`);
        console.time(`time to generate these rows`);
      }
    }
  });

  incomingData.pipe(writeStream).on('finish', () => {console.log('file generation complete')}).on('error', () => {console.error(error)});

  // const createMockProducts = () => {
  //   console.time('time to generate');
  //     for (var i = 1; i <= 5; i++) {
  //       count++
  //       products.push({
  //         _id: count,
  //         name: faker.commerce.productName(),
  //         rating: Number(faker.finance.amount(1, 5, 1)),
  //         reviewCount: faker.random.number({ min: 20, max: 150 }),
  //         itemNum: count,
  //         price: faker.commerce.price(50, 500),
  //         mainImage: `https://s3-us-west-1.amazonaws.com/hrr34-trailblazer/${faker.random.number({ min: 1, max: 100 })}-min.jpg`,
  //         images: populateImages(i)
  //       });
  //     }
  //   return products;
  // };

// stringify(createMockProducts(), {
//   header: true,
//   columns: ['_id', 'name', 'rating', 'reviewCount', 'itemNum', 'price', 'mainImage', 'images']
// }, (error, output) => {
//   // return new Promise((resolve, reject) => {
//     let writeStream = fs.createWriteStream(__dirname + '/data.csv');
//     let j = 0

//     writeStream.once('drain', function () {
//       console.log('drain', j)
//       console.log('count', count)
//       write();
//     });
//     write();

//     function write() {
//       while (j < 1) {
//         j++
//         if (!writeStream.write(output)) {
//           return;
//         }
//       }
//         writeStream.end();
//         writeStream.on('finish', () => {console.timeEnd('time to generate')});
//         writeStream.on('error', () => {console.error(error)});
//     }
//   // })
// });

module.exports = incomingData
