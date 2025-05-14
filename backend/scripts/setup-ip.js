const fs = require('fs');
const os = require('os');
const path = require('path');

function getLocalIPv4() {
  const nets = os.networkInterfaces();
  if (nets['Wi-Fi']) {
    for (const net of nets['Wi-Fi']) {
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return 'localhost';
}

console.log('Địa chỉ IPv4:', getLocalIPv4());
let envPath = path.join(__dirname, '..', '.env');
let readEnv = fs.readFileSync(envPath, 'utf8');
const isExists = readEnv.match(/^IPURLBE=.*$/m);

if (isExists) readEnv = readEnv.replace(/^IPURLBE=.*$/m, `IPURLBE=${getLocalIPv4()}`);
else readEnv += `\nIPURLBE=${getLocalIPv4()}`; 

fs.writeFileSync(envPath, readEnv, 'utf8');