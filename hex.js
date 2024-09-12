const fs = require('fs');
const crypto = require('crypto');
const path = require('path');


const sha3_256 = (file) => {
  const data = fs.readFileSync(file);
  const hash = crypto.createHash('sha3-256');
  hash.update(data);
  return hash.digest('hex');
};

const dirPath = './task2';
const email = 'mirjalolziyadullayev@outlook.com'.toLowerCase();

const files = fs.readdirSync(dirPath).filter(file => fs.statSync(path.join(dirPath, file)).isFile());

if (files.length !== 256) {
  console.error('Error: Expected 256 files');
  process.exit(1);
}
const hashes = files.map(file => sha3_256(path.join(dirPath, file))).sort();

const concatenated = hashes.join('') + email;

const finalHash = crypto.createHash('sha3-256').update(concatenated).digest('hex');

console.log(finalHash);
