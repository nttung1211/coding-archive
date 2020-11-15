// SYNCHRONOUS
// const fs = require('fs');

// const data = fs.readFileSync(__dirname + '/txt/input.txt', { encoding: 'utf-8' });
// console.log(data);

// const input = `Nguyễn Thanh Tùng: ${data}`;
// fs.writeFileSync(__dirname + '/txt/output.txt', input, { flag: 'w' });
//=======================================================================================

// ASYNCHRONOUS
// const fs = require('fs');

// fs.readFile('./txt/input.txt', 'utf-8', (err, data) => { // if options is string it will see as encoding
//   if (err) {
//     console.log(err);
//   } else {
//     fs.writeFile('./txt/output.txt', data, { flag: 'w' }, (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('Wrote file successfully.');
//       }
//     });
//   }
// });

// console.log('Reading file...');

//================================================================================================

// CREATE FIRST WEB SERVER
// const http = require('http');

// const server = http.createServer(requestListener);

// function requestListener(req, res) {
//   res.end('Tung dep trai');
// }

// server.listen(3000, '127.0.0.1', () => {
//   console.log('Server is listening on port 3000');
// });

