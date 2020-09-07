const fs = require('fs');
const path = require('path');  
const axios = require('axios');

const downloadImage = async (url, name) => {  
  const pathResolve = path.resolve(__dirname, 'pokemon', `${name}.png`);
  const writer = fs.createWriteStream(pathResolve);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  });
}

module.exports.downloadImage = downloadImage;
