# Ứng dụng web quản lý nhà hàng, gồm:
    Frontend (Next.js): Giao diện khách hàng và nhân viên.
    Backend (NestJS): API xử lý logic, quản lý đơn hàng, người dùng, menu và QR code.

# I. Setup dự án
## 1. Clone repository
## 2. Cài đặt dependencies
### 2.1. Frontend
```bash 
    cd frontend
```
```bash
    npm install
```
```bash
    npm run dev
```
### Nếu thành công sẽ có thông báo:
    > frontend@0.1.0 dev
    > next dev
    
    ▲ Next.js 15.2.4
    - Local:        http://localhost:1234
      - Network:      http://xxx.xxx.xx.x:1234
    
    ✓ Starting...
    ✓ Ready in 2s


### 2.2. Backend
```bash
cd ../backend
```
```bash
    npm install
```
```bash
    npm run dev
```
### Nếu thành công sẽ có thông báo
    [Nest] xxxx - 01:00:00 10/04/2030 LOG [NestFactory] Starting Nest application...
    [Nest] xxxx - 01:00:00 10/04/2030 LOG [InstanceLoader] AppModule dependencies initialized +7ms
    [Nest] xxxx - 01:00:00 10/04/2030 LOG [RoutesResolver] AppController {/}: +20ms
    [Nest] xxxx - 01:00:00 10/04/2030 LOG [RouterExplorer] Mapped {/, GET} route +2ms
    [Nest] xxxx - 01:00:00 10/04/2030 LOG [NestApplication] Nest application successfully started +2ms

## 3. Setup Docker:
Link huớng dẫn trên youtube: https://www.youtube.com/watch?v=WDEdRmTCSs8&ab_channel=ProgrammingKnowledge 
### 3.1. Tải docker (Chỉ tải file, cấm open)
Link: https://docs.docker.com/desktop/setup/install/windows-install/

### 3.2. Tạo tài khoản docker (Có thể để sau):
Link: https://www.docker.com/

### 3.3 Kiểm tra ảo hóa trên máy:
    Ấn nút windows, gõ "Turn Windows features on or off", 
    tìm đến "Windows Subsystem for Linux" và "Virtual Machine Platform", tích chọn.
    Sau đó ấn OK và khởi động lại máy.

### 3.4. Kiểm tra và neo phiên bản wsl:
    Vào cmd, powershell hoặc terminal, gõ lệnh: wsl --status 
    Nếu hiện ra Default Version: 2 thì không cần làm gì thêm.
    Nếu hiện ra Default Version: 1 thì gõ lệnh sau: wsl --set-default-version 2

### 3.5. Cài đặt docker:
    Vào cái thư mục lưu cái file tải về, ấn chuột phải vào file docker-desktop-installer.exe và chọn "Run as administrator".
    Sau đó ấn "OK" và "Install" để cài đặt.
    Sau khi cài xong, ấn "Close" và khởi động lại máy.

### 3.6. Kiểm tra môi trường ảo:
    Tổ hợp phím Ctrl + Shift + Esc để mở Task Manager.
    Performance > CPU: Thấy "Virtualization: Enabled" là được.

### 3.7. Setup .env:
    Trong thư mục backend, tạo file .env và copy nội dung từ file .env.example vào.
    Sau đó chỉnh sửa các thông số trong file .env theo chú thích.

### 3.8. Chạy docker:
    Dưới terminal, gõ lệnh sau:
```bash
    cd backend # Nếu đang ở root
```
```bash
    docker compose -p dbname-mongodb-4rn up -d
```
    Lưu ý: dbname là tên tùy ý, ví dụ: "hyan-mongodb-4rn"

### 3.9. Kiểm tra docker:
    Vào trình duyệt, gõ địa chỉ sau:
link: http://localhost:27017
    
    Nếu thấy thấy có dòng chữ “If you like you are trying to 
    access MongoDB over HTTP on the native driver port” là thành công

# II. Quy trình làm việc 
## 1. Tạo nhánh mới
    git checkout -b <tên nhánh riêng>
## 2. Commit code
    git add .
    git commit -m "<nội dung commit>"
## 3. Push code lên nhánh mới
    git push origin <tên nhánh riêng>
## 4. Sau khi push lên nhánh riêng xong
    git checkout main
    git merge <tên nhánh mới> # Nếu có thay đổi hoặc cập nhật bên nhánh riêng thì merge vô
## 5. Kiểm tra sự khác nhau giữa nhánh chính và nhánh riêng
    git diff main <tên nhánh riêng>
## 6. Nếu không có gì khác nhau đẩy lên nhánh chính
    git push origin main
## 7. Checkout qua nhánh riêng
    git checkout <tên nhánh riêng>
    Lúc này muốn chỉnh sửa gì thì chỉnh sửa

# Lưu ý:
    Mỗi lần ae pull code về thì phải cd vào frontend và backend dưới terminal và gõ lệnh sau:
```bash
npm i
```
    Để cập nhật các thay đổi trong package.json nếu có. Trường hợp không có thì vẫn nên chạy thử kiểm tra cho an toàn :))))

# III. Cấu trúc dự án
    Root/
    ├── .gitignore 
    ├── README.md                           # Bắt buộc đọc trước khi làm
    │
    ├── asset/                              # Ảnh và tài liệu
    │   ├── diagram/                        # Các diagram
    │   ├── png/
    │   └── svg/
    │
    ├── backend/                            # Thư mục backend
    │   ├── src/                            # viết code backend
    │   ├── test/
    │   ├── .env.example
    │   ├── .env
    │   ├── docker-compose.yml
    │   └── package.json
    │
    ├── frontend/                           # Thư mục frontend
    │   ├── public/
    │   ├── src/                            # Viết code frontend
    │   └── package.json
    │
    └── report/
        ├── report.tex                      # (File báo cáo)
        └── references.bib                  # (Tài liệu tham khảo) 