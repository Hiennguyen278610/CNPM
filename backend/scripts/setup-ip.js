const fs = require('fs');
const os = require('os');

/**
 * Lấy địa chỉ IPv4 nội bộ của máy chủ
 * @returns {string} Địa chỉ IPv4
 */
function getLocalIPv4() {
  const nets = os.networkInterfaces();
  
  // Ưu tiên tìm Wi-Fi adapter trước
  if (nets['Wi-Fi']) {
    for (const net of nets['Wi-Fi']) {
      if (net.family === 'IPv4' && !net.internal) {
        console.log('Sử dụng địa chỉ IPv4 từ Wi-Fi adapter');
        return net.address;
      }
    }
  }
  
  // Nếu không tìm thấy Wi-Fi, tìm các adapter khác
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      // Chỉ lấy địa chỉ IPv4 không phải loopback và thuộc mạng nội bộ
      if (net.family === 'IPv4' && !net.internal) {
        if (net.address.startsWith('192.168.') || 
            net.address.startsWith('10.') || 
            net.address.startsWith('172.')) {
          console.log(`Sử dụng địa chỉ IPv4 từ adapter: ${name}`);
          return net.address;
        }
      }
    }
  }
  return 'localhost';
}

// Lấy địa chỉ IPv4 nội bộ
const ipv4 = getLocalIPv4();
console.log(`Đã phát hiện địa chỉ IPv4 nội bộ: ${ipv4}`);

// try {
//   // Cập nhật file .env.local với địa chỉ IP mới cho backend
//   const envContent = `IP_ADDRESS=${ipv4}\nPORT=3001\nCORS_ORIGINS=http://${ipv4}:3000,http://localhost:3000\n`;
//   fs.writeFileSync('d:\\Workspace\\cnpmProject\\backend\\.env.local', envContent, { flag: 'w' });
//   console.log('Đã cập nhật file .env.local cho backend với địa chỉ IP hiện tại');
// } catch (error) {
//   console.error('Lỗi khi cập nhật file .env.local:', error);
// }
