# Newspaper_web
 

Thành phần	Chức năng chính	Nhiệm vụ chính
Routes	Xử lý request từ client	Định tuyến yêu cầu, liên kết với services.
Services	Xử lý logic nghiệp vụ	Tương tác với cơ sở dữ liệu, API, xử lý dữ liệu.
Helpers	Xử lý các chức năng nhỏ	Cung cấp các hàm tiện ích hoặc Handlebars helpers.
Views	Hiển thị giao diện người dùng	Tạo HTML động, kết xuất dữ liệu từ server.
Public	Chứa các tài nguyên tĩnh	Lưu trữ CSS, JS, hình ảnh để tải trực tiếp lên trình duyệt.
Data	Lưu trữ dữ liệu giả lập hoặc mặc định	Dùng trong phát triển hoặc thử nghiệm giao diện.
Controllers	(Tùy chọn) Xử lý logic HTTP cụ thể	Lớp trung gian giữa routes và services.
index.js	Điểm khởi động của ứng dụng	Thiết lập server, cấu hình view engine, middleware, routes.