# Note project:

## 1. Cấu trúc thư mục cấp 2 tổng quát:

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

### 1. Cấp root:

    - .gitignore: File này dùng để chỉ định các file hoặc thư mục mà Git sẽ bỏ qua khi commit.
    - README.md: File này chứa thông tin về dự án, hướng dẫn cài đặt và sử dụng.
    - notemap.md: File này chứa các ghi chú và hướng dẫn cho dự án.
    - asset/: Thư mục này chứa các tài liệu, hình ảnh và diagram liên quan đến dự án.
    - backend/: Thư mục này chứa mã nguồn của backend.
    - frontend/: Thư mục này chứa mã nguồn của frontend.
    - report/: Thư mục này chứa báo cáo và tài liệu tham khảo.

### 2. Cấp backend:

    - src/: Thư mục này chứa mã nguồn của backend.
    - test/: Thư mục này chứa phần kiểm thử cho mã nguồn backend.
    - .env.example: File mẫu cho biến môi trường.
    - .env: File chứa các biến môi trường phục vụ trong backend.
    - docker-compose.yml: File cấu hình Docker Compose để chạy ứng dụng trong container.
    - package.json: File cấu hình cho Node.js, chứa thông tin về các gói phụ thuộc và script.

### 3. Cấp frontend:

    - public/: Thư mục này chứa các file tĩnh như HTML, CSS và hình ảnh.
    - src/: Thư mục này chứa mã nguồn của frontend.
    - package.json: File cấu hình cho Node.js, chứa thông tin về các gói phụ thuộc và script.

### 4. Cấp report:

    - report.tex: File báo cáo được viết bằng LaTeX.
    - references.bib: File chứa tài liệu tham khảo được định dạng BibTeX.

## 2. Cấu trúc thư mục cấp 3 của từng thư mục con cấp 2:

### 1. Cấp backend:

#### a. Cấp src:

    - modules/: Thư mục này chứa các module của ứng dụng. Gồm 11 lớp đối tượng ứng với 11 module trong drawIO.
    - app.controller.ts: File này chứa controller của ứng dụng.
    - app.module.ts: File này chứa module chính của ứng dụng. (đã import các module từ thư mục modules vào)
    - app.service.ts: File này chứa service chính của ứng dụng.
    - main.ts: File này là điểm vào của ứng dụng. (dùng app.useGlobalPipes(new ValidationPipe({whitelist : true}) để kiểm tra dữ liệu đầu vào, dùng app.setGlobalPrefix('') để định nghĩa prefix cho các route)
    - Utils/: Thư mục này chứa các tiện ích và helper functions.
#### b. Cấp test:

    - jest-e2e.json: File này chứa cấu hình cho Jest để chạy các bài kiểm thử end-to-end.
    - app.e2e-spec.ts: File này chứa các bài kiểm thử end-to-end cho ứng dụng.

# Experiment và linh tinh muốn nhớ:

## 1. Test api trên: web.postman.co

link postman: https://web.postman.co

link hướng dẫn youtube: https://youtu.be/v1nu5xKFEl8?si=krxucYxDhCP9bPP1&t=92

## 2. Ý nghĩa về class.name trong các modules

    - Ví dụ với accounts: trong account.schema.ts có định nghĩa một trường là username
    - Trong account.service.ts có dòng: "@InjectModel(Account.name) private accountModel: Model<Account>"
    - Ở đây Account.name không phải là một trường dữ liệu trong schema. Đây là một thuộc tính tĩnh có sẵn trong mọi class của JavaScript/TypeScript.
    - Account.name sẽ trả về chuỗi "Account". Khi dùng InjectModel(Account.name), ta đang yêu cầu NestJS cung cấp một mô hình (model) MongoDB có tên "Account".

## 3. Import và const khi nào ? 

    - import: Dùng để nhập các module, class, hoặc thư viện từ các file khác vào file hiện tại.
    - const: Dùng để khai báo biến hằng số trong file hiện tại. Biến này có thể là một giá trị đơn giản hoặc một đối tượng phức tạp.
    - Nên dùng import khi cần sử dụng một module hoặc class từ một file khác. Nên dùng const khi cần định nghĩa một biến hằng số trong file hiện tại.
    Ví dụ: trong Util có helper.ts có dòng const bcrypt = require('bcrypt'); thì nên dùng import bcrypt from 'bcrypt'; để import bcrypt từ thư viện bcrypt.

## 4. Chú thích DT và TS trên npm
    - DT: Data Type, nếu các package có DT thì phải cày thêm ts @types/package_name
    - TS: TypeScript, nếu các package có TS thì không cần cày thêm @types/package_name
    - Mục đích cày các datatype là để có thể sử dụng các package đó trong TypeScript mà không bị lỗi kiểu dữ liệu và được ide gợi ý code :))).

## 5. saltRounds trong bcrypt
    - saltRounds không phải là salt trực tiếp, mà là số vòng lặp (rounds) mà thuật toán bcrypt sẽ thực hiện.
    - Ví dụ: const saltRounds = 10; thì bcrypt sẽ thực hiện 2^10 = 1024 vòng lặp để tạo ra salt. :))), số càng lớn thì độ phức tạp cao.

## 6. Về cú pháp kiểm tra mail trong accout.service.ts của module account 
    - Dùng !!account khi bạn cần kết quả boolean để kiểm tra sự tồn tại của account.
    - Dùng return account khi bạn muốn trả về giá trị thực tế của account để sử dụng trong các logic khác.

## 7. Muốn thằng BadRequestException() nhận dạng được một biến thì ? 
    - BadRequestException() là một lớp trong NestJS dùng để xử lý các lỗi liên quan đến yêu cầu không hợp lệ.
    - Để thằng này nhận dạng được một biến, thì phải dùng dấu `` chứ đéo phải dấu ''. Đcm :)))).
    - Ví dụ: throw new BadRequestException(`Email ${email} already exists`); thì nó sẽ nhận dạng được biến email.
    - Còn nếu dùng throw new BadRequestException('Email ${email} already exists'); thì nó sẽ dell hiểu.
