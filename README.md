# tomatch.me

FRONTEND ứng dụng trắc nghiệm tính cách DISC và trắc nghiệm tâm lý BECK

## Bắt đầu

Những hướng dẫn này sẽ giúp bạn cài đặt và chạy dự án ReactJS của bạn trên máy local.

### Yêu cầu hệ thống

Hãy ưu tiên phiên bản mới nhất

-   Node.js (>=16.7.0)
-   npm (>=6.0.0) hoặc yarn (>=1.22.0)
-   Docker (phiên bản mới nhất)

### Cài đặt

#### 1. Clone repository

Tải mã nguồn về máy:

```bash
git clone https://gitlab.com/smart-human-resource/tomatch.me.git
cd tomatch.me-front
```

### 2. Cài đặt các phụ thuộc

Sử dụng lệnh:

```bash
npm install
```

hoặc

```bash
yarn install
```

### 3. Cài đặt file .env

Tạo file .env ở thư mục gốc của dự án và thêm các biến môi trường cần thiết như bên dưới:

```bash
REACT_APP_API_URL=http://localhost:8000/api
```

## Chạy dự án trên local

Để chạy dự án trên môi trường local, sử dụng lệnh:

Sử dụng npm:

```bash
npm start
```

Hoặc sử dụng yarn:

```bash
yarn start
```

Mở http://localhost:3000 để xem trong trình duyệt.
