const faker = require("faker");
const fs = require('fs');
const path = require('path');
const stringify = require("csv-stringify");


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

const products = [];
let count = 1;

const createMockProducts = () => {
  console.time('time to generate');
    for (var i = 1; i <= 1; i++) {
      count++
      products.push({
        _id: count,
        name: faker.commerce.productName(),
        rating: Number(faker.finance.amount(1, 5, 1)),
        reviewCount: faker.random.number({ min: 20, max: 150 }),
        itemNum: count,
        price: faker.commerce.price(50, 500),
        mainImage: `https://s3-us-west-1.amazonaws.com/hrr34-trailblazer/${faker.random.number({ min: 1, max: 100 })}-min.jpg`,
        images: populateImages(count)
      });
    }
  return products;
};

stringify(createMockProducts(), {
  // header: true,
  // columns: ['_id', 'name', 'rating', 'reviewCount', 'itemNum', 'price', 'mainImage', 'images']
}, (error, output) => {
  // return new Promise((resolve, reject) => {
    let writeStream = fs.createWriteStream(__dirname + '/data.csv');
    let j = 0

    writeStream.on('drain', function () {
      console.log('drain', j)
      console.log('count', count)
      write();
    });
    write();

    function write() {
      while (j <= 49) {
        j++
        if (!writeStream.write(output)) {
          return;
        }
      }
        writeStream.end();
        writeStream.on('finish', () => {console.timeEnd('time to generate')});
        writeStream.on('error', () => {console.error(error)});
    }
  // })
});




