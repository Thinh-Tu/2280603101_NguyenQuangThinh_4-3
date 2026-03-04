# CRUD API Documentation

## Tổng Quan
Ứng dụng cung cấp các API CRUD cho quản lý Vai trò (Role) và Người dùng (User).

---

## Cài Đặt

### Yêu Cầu
- Node.js (v14+)
- npm hoặc yarn

### Cài Đặt Dependencies
```bash
npm install express
```

### Chạy Server
```bash
node server.js
```

Server sẽ chạy tại `http://localhost:3000`

---

## Cấu Trúc Dự Án

```
.
├── data.js              # Dữ liệu Role và User
├── roleService.js       # CRUD logic cho Role
├── userService.js       # CRUD logic cho User
├── routes.js            # API routes
├── server.js            # Express server
├── requests.http        # REST Client requests
└── API_DOCUMENTATION.md # Tài liệu này
```

---

## API Endpoints

### ROLE ENDPOINTS

#### 1. Lấy Tất Cả Vai Trò
```
GET /api/roles
```

**Response (200):**
```json
{
  "message": "Lấy danh sách vai trò thành công",
  "data": [
    {
      "id": "r1",
      "name": "Quản trị viên",
      "description": "Toàn quyền quản lý hệ thống",
      "creationAt": "2026-03-04T08:00:00.000Z",
      "updatedAt": "2026-03-04T08:00:00.000Z"
    }
  ]
}
```

---

#### 2. Lấy Vai Trò Theo ID
```
GET /api/roles/:id
```

**Parameters:**
- `id` (string): ID của vai trò (e.g., r1, r2, r3)

**Response (200):**
```json
{
  "message": "Lấy vai trò thành công",
  "data": {
    "id": "r1",
    "name": "Quản trị viên",
    "description": "Toàn quyền quản lý hệ thống",
    "creationAt": "2026-03-04T08:00:00.000Z",
    "updatedAt": "2026-03-04T08:00:00.000Z"
  }
}
```

**Response (404):**
```json
{
  "message": "Vai trò không tồn tại"
}
```

---

#### 3. Tạo Vai Trò Mới
```
POST /api/roles
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Nhân viên",
  "description": "Tài khoản nhân viên"
}
```

**Response (201):**
```json
{
  "message": "Tạo vai trò thành công",
  "data": {
    "id": "r4",
    "name": "Nhân viên",
    "description": "Tài khoản nhân viên",
    "creationAt": "2026-03-04T10:00:00.000Z",
    "updatedAt": "2026-03-04T10:00:00.000Z"
  }
}
```

**Response (400):**
```json
{
  "message": "Tên vai trò không được để trống"
}
```

---

#### 4. Cập Nhật Vai Trò
```
PUT /api/roles/:id
Content-Type: application/json
```

**Parameters:**
- `id` (string): ID của vai trò

**Request Body:**
```json
{
  "name": "Quản trị viên hệ thống",
  "description": "Toàn quyền quản lý hệ thống"
}
```

**Response (200):**
```json
{
  "message": "Cập nhật vai trò thành công",
  "data": {
    "id": "r1",
    "name": "Quản trị viên hệ thống",
    "description": "Toàn quyền quản lý hệ thống",
    "creationAt": "2026-03-04T08:00:00.000Z",
    "updatedAt": "2026-03-04T10:00:00.000Z"
  }
}
```

---

#### 5. Xóa Vai Trò
```
DELETE /api/roles/:id
```

**Parameters:**
- `id` (string): ID của vai trò

**Response (200):**
```json
{
  "message": "Xóa vai trò thành công",
  "data": {
    "id": "r3",
    "name": "Người dùng",
    "description": "Tài khoản người dùng thông thường",
    "creationAt": "2026-03-04T08:00:00.000Z",
    "updatedAt": "2026-03-04T08:00:00.000Z"
  }
}
```

---

### USER ENDPOINTS

#### 1. Lấy Tất Cả Người Dùng
```
GET /api/users
```

**Response (200):**
```json
{
  "message": "Lấy danh sách người dùng thành công",
  "data": [
    {
      "username": "nguyenvana",
      "password": "123456",
      "email": "vana@gmail.com",
      "fullName": "Nguyễn Văn A",
      "avatarUrl": "https://i.sstatic.net/l60Hf.png",
      "status": true,
      "loginCount": 15,
      "role": {
        "id": "r1",
        "name": "Quản trị viên",
        "description": "Toàn quyền quản lý hệ thống"
      },
      "creationAt": "2026-03-04T08:10:00.000Z",
      "updatedAt": "2026-03-04T08:10:00.000Z"
    }
  ]
}
```

---

#### 2. Lấy Người Dùng Theo Username
```
GET /api/users/:username
```

**Parameters:**
- `username` (string): Tên đăng nhập của người dùng

**Response (200):**
```json
{
  "message": "Lấy người dùng thành công",
  "data": {
    "username": "nguyenvana",
    "password": "123456",
    "email": "vana@gmail.com",
    "fullName": "Nguyễn Văn A",
    "avatarUrl": "https://i.sstatic.net/l60Hf.png",
    "status": true,
    "loginCount": 15,
    "role": {
      "id": "r1",
      "name": "Quản trị viên",
      "description": "Toàn quyền quản lý hệ thống"
    },
    "creationAt": "2026-03-04T08:10:00.000Z",
    "updatedAt": "2026-03-04T08:10:00.000Z"
  }
}
```

**Response (404):**
```json
{
  "message": "Người dùng không tồn tại"
}
```

---

#### 3. Tạo Người Dùng Mới
```
POST /api/users
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "testuser",
  "password": "password123",
  "email": "testuser@gmail.com",
  "fullName": "Test User",
  "avatarUrl": "https://i.sstatic.net/l60Hf.png",
  "status": true,
  "role": {
    "id": "r3"
  }
}
```

**Response (201):**
```json
{
  "message": "Tạo người dùng thành công",
  "data": {
    "username": "testuser",
    "password": "password123",
    "email": "testuser@gmail.com",
    "fullName": "Test User",
    "avatarUrl": "https://i.sstatic.net/l60Hf.png",
    "status": true,
    "loginCount": 0,
    "role": {
      "id": "r3",
      "name": "Người dùng",
      "description": "Tài khoản người dùng thông thường"
    },
    "creationAt": "2026-03-04T10:00:00.000Z",
    "updatedAt": "2026-03-04T10:00:00.000Z"
  }
}
```

**Response (400):**
```json
{
  "message": "Username, password, và email không được để trống"
}
```

Or:
```json
{
  "message": "Username đã tồn tại"
}
```

Or:
```json
{
  "message": "Email đã tồn tại"
}
```

---

#### 4. Cập Nhật Thông Tin Người Dùng
```
PUT /api/users/:username
Content-Type: application/json
```

**Parameters:**
- `username` (string): Tên đăng nhập

**Request Body (có thể cập nhật từng trường):**
```json
{
  "email": "vana.updated@gmail.com",
  "fullName": "Nguyễn Văn A Updated",
  "status": true,
  "password": "newpassword123",
  "avatarUrl": "https://new-avatar.png",
  "role": {
    "id": "r2"
  }
}
```

**Response (200):**
```json
{
  "message": "Cập nhật người dùng thành công",
  "data": {
    "username": "nguyenvana",
    "password": "newpassword123",
    "email": "vana.updated@gmail.com",
    "fullName": "Nguyễn Văn A Updated",
    "avatarUrl": "https://new-avatar.png",
    "status": true,
    "loginCount": 15,
    "role": {
      "id": "r2",
      "name": "Biên tập viên",
      "description": "Quản lý nội dung và dữ liệu"
    },
    "creationAt": "2026-03-04T08:10:00.000Z",
    "updatedAt": "2026-03-04T10:00:00.000Z"
  }
}
```

---

#### 5. Tăng Login Count
```
PATCH /api/users/:username/login-count
```

**Parameters:**
- `username` (string): Tên đăng nhập

**Response (200):**
```json
{
  "message": "Tăng login count thành công",
  "data": {
    "username": "nguyenvana",
    "password": "123456",
    "email": "vana@gmail.com",
    "fullName": "Nguyễn Văn A",
    "avatarUrl": "https://i.sstatic.net/l60Hf.png",
    "status": true,
    "loginCount": 16,
    "role": {
      "id": "r1",
      "name": "Quản trị viên",
      "description": "Toàn quyền quản lý hệ thống"
    },
    "creationAt": "2026-03-04T08:10:00.000Z",
    "updatedAt": "2026-03-04T10:00:00.000Z"
  }
}
```

---

#### 6. Xóa Người Dùng
```
DELETE /api/users/:username
```

**Parameters:**
- `username` (string): Tên đăng nhập

**Response (200):**
```json
{
  "message": "Xóa người dùng thành công",
  "data": {
    "username": "testuser",
    "password": "password123",
    "email": "testuser@gmail.com",
    "fullName": "Test User",
    "avatarUrl": "https://i.sstatic.net/l60Hf.png",
    "status": true,
    "loginCount": 0,
    "role": {
      "id": "r3",
      "name": "Người dùng",
      "description": "Tài khoản người dùng thông thường"
    },
    "creationAt": "2026-03-04T10:00:00.000Z",
    "updatedAt": "2026-03-04T10:00:00.000Z"
  }
}
```

---

## Cách Sử Dụng REST Client Extension

### Cài Đặt Extension
1. Cài đặt "REST Client" extension trong VS Code (bởi Huachao Mao)
2. Mở file `requests.http` trong VS Code
3. Nhấn "Send Request" ở trên mỗi request hoặc sử dụng tổ hợp phím Ctrl+Alt+R

### Chạy Request từ File
- Mỗi request được tách biệt bởi `###`
- Nhấn "Send Request" hoặc sử dụng phím tắt để chạy từng request
- Kết quả sẽ hiển thị trong tab "Response"

---

## Ví Dụ Sử Dụng

### Ví Dụ 1: Tạo Một Vai Trò Mới
```bash
curl -X POST http://localhost:3000/api/roles \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Quản lý dự án",
    "description": "Quản lý dự án và nhân viên"
  }'
```

### Ví Dụ 2: Tạo Người Dùng Với Vai Trò Biên Tập Viên
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "editor1",
    "password": "secure_pass",
    "email": "editor1@example.com",
    "fullName": "Editor One",
    "role": {"id": "r2"}
  }'
```

### Ví Dụ 3: Cập Nhật Thông Tin Người Dùng
```bash
curl -X PUT http://localhost:3000/api/users/nguyenvana \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Nguyễn Văn A - Updated",
    "status": true
  }'
```

### Ví Dụ 4: Tăng Số Lần Đăng Nhập
```bash
curl -X PATCH http://localhost:3000/api/users/nguyenvana/login-count
```

---

## Kiểm Tra Lỗi

### Lỗi 400: Bad Request
- Username hoặc email không được để trống
- Username hoặc email đã tồn tại
- Tên vai trò không được để trống

### Lỗi 404: Not Found
- Vai trò hoặc người dùng không tồn tại

### Lỗi 500: Internal Server Error
- Lỗi server (kiểm tra console)

---

## Dữ Liệu Mặc Định

### Vai Trò
- **r1**: Quản trị viên - Toàn quyền quản lý hệ thống
- **r2**: Biên tập viên - Quản lý nội dung và dữ liệu
- **r3**: Người dùng - Tài khoản người dùng thông thường

### Người Dùng (10 người dùng mặc định)
1. **nguyenvana** (Admin)
2. **tranthib** (Editor)
3. **levanc** (User)
4. **phamthid** (User - Deactivated)
5. **hoanganh** (User)
6. **dangminh** (Editor)
7. **phamkhoa** (User)
8. **truonglinh** (User - Deactivated)
9. **doquang** (Editor)
10. **ngocanh** (Admin)

---

## Ghi Chú

- Dữ liệu được lưu trong bộ nhớ, sẽ mất khi server khởi động lại
- Để lưu dữ liệu vĩnh viễn, kết nối với cơ sở dữ liệu (MongoDB, PostgreSQL, MySQL, etc.)
- Password được lưu dưới dạng plaintext, trong thực tế nên hash password

---

**Created: 2026-03-04**
**Author: Nguyễn Quang Thịnh**
