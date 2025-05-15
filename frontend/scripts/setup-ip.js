const fs = require('fs');
const os = require('os');
const path = require('path');

function getLocalIPv4() {
  const nets = os.networkInterfaces();
  
  if (nets['Wi-Fi']) {
    for (const net of nets['Wi-Fi']) {
      if (net.family === 'IPv4' && !net.internal) {
        console.log('Sử dụng địa chỉ IPv4 từ Wi-Fi adapter');
        return net.address;
      }
    }
  }
  return 'localhost';
}

console.log('Địa chỉ IPv4 sugoi:', getLocalIPv4());
let envPath = path.join(__dirname, '..', '.env');
let readEnv = fs.readFileSync(envPath, 'utf8');
const isExists = readEnv.match(/^NEXT_PUBLIC_IPURL=.*$/m);

if (isExists) readEnv = readEnv.replace(/^NEXT_PUBLIC_IPURL=.*$/m, `NEXT_PUBLIC_IPURL=${getLocalIPv4()}`);
else readEnv += `\nNEXT_PUBLIC_IPURL=${getLocalIPv4()}`;

fs.writeFileSync(envPath, readEnv, 'utf8');