const fs = require('fs');


// + Syncronously
// let data = fs.readFileSync('txt/input.txt', 'utf-8');

// let newData = `This is avocado description:\n ${data}\nLast editted on: ${new Date()}`;
// fs.writeFileSync('txt/input.txt', newData, 'utf-8');

// data = fs.readFileSync('txt/input.txt', 'utf-8');
// console.log(data);


// + Asyncronously
// function logData(err, res) {
//   console.log(`File content:\n"${res}"`);
// }

// EX 1:
// let data1 = fs.readFile('txt/input.txt', 'utf-8', logData);
// console.log('Reading file ...\n');

// EX 2.1:
// fs.readFile('txt/fileName.txt', 'utf-8', (err, res) => {
//   console.log(`Reading file content ...`);
//   fs.readFile(`txt/${res}.txt`, 'utf-8', logData);
// })

// console.log(`Reading file name ...`);

// EX 2.2
// fs.readFile('txt/fileName.txt', 'utf-8', (err1, res1) => {
//   console.log(`Reading file content ...`);
//   fs.readFile(`txt/${res1}.txt`, 'utf-8', (err2, res2) => {
//     console.log(`File content:\n"${res2}"`)
//     console.log('Updating content ...')
//     let newContent = `${res2.slice(0, res2.length - 1)}, you want to be sexy too?`;
//     fs.writeFile(`txt/${res1}.txt`, newContent, 'utf-8', err3 => {
//       if (err3) {
//         console.log(err3);
//         return;
//       } else {
//         console.log('Update successfully.');
//         console.log(`New content:\n"${newContent}"`);
//         console.log('Answering ...');
//         fs.appendFile(`txt/${res1}.txt`, '\nNo, I don\'t', 'utf-8', err4 => {
//           if (err4) {
//             console.log(err4);
//             return;
//           } else {
//             console.log('Reading file with answer...')
//             fs.readFile(`txt/${res1}.txt`, 'utf-8', logData);
//           }
//         })
//       }
//     })
//   });
// })

// console.log(`Reading file name ...`);


// + http module
const url = require('url');
const http = require('http');

const slugify = require('slugify'); 
// slugify example:
// console.log(slugify(
//   '*NGUYEN THANH TUNG*', 
//   { 
//     replacement: '_', 
//     remove: /\*/g, 
//     lower: true, 
//     strict: false 
//   }
//   ));

const replaceTemplate = require('./modules/replaceTemplate'); //? need to have "./""

// READ FILES
const fileData = fs.readFileSync('dev-data/data.json', 'utf-8');
const homeTemplate = fs.readFileSync('templates/template-home.html', 'utf-8');
const productTemplate = fs.readFileSync('templates/template-product.html', 'utf-8');
const cardTemplate = fs.readFileSync('templates/template-card.html', 'utf-8');


// SERVER
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  let productObjs = JSON.parse(fileData);
  productObjs = productObjs.map(obj => {
    return {
      ...obj,
      slug: slugify(obj.productName, { lower: true })
    }
  });

  switch (pathname) {

    //- HOME 
    case '/home':
    case '/':
      res.writeHead(200, {
        'content-type': 'text/html'
      });
      const cardsHtml = productObjs.map(obj => replaceTemplate(cardTemplate, obj));
      const homeHtml = homeTemplate.replace('{%productCards%}', cardsHtml.join(''));
      res.end(homeHtml);
      break;
    
    //- PRODUCT
    case '/product':
      res.writeHead(200, {
        'content-type': 'text/html'
      });
      const productObj = productObjs.find(obj => obj.slug === query.id);

      if (productObj) {
        const productHtml = replaceTemplate(productTemplate, productObj);
        res.end(productHtml);
      } else {
        res.end('<h2>There is no such product</h2>');
      }

      break; 
 
    //- PAGE NOT FOUND
    default:
      res.writeHead(404, { // header need to be set before we send response (res.end())
        'content': 'text/html', // make the browser expects html to come in 
        'myOwnHeader': 'this is my header'
      });
      res.end('<h1>Page not found.</h1>');
  }
});

server.listen(8000, 'localhost', () => {
  console.log('Listening from server at port 8000');
})
 

// + routing

// when we send a request the browser automatically send one more request /favicon.ico
