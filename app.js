const contactsRouter = require("./app/routes/contact.route");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});
app.use("/api/contacts", contactsRouter);
module.exports = app;
const ApiError = require("./app/api-error");

app.use("/api/contacts", contactsRouter);

// Xử lý khi không tìm thấy đường dẫn
app.use((req, res, next) => {
  // Đoạn mã tại đây sẽ chạy khi không có route nào khớp với yêu cầu.
  // Gọi next() để chuyển sang middleware xử lý lỗi
  return next(new ApiError(404, "Resource not found"));
});

// Định nghĩa middleware xử lý lỗi ở cuối cùng, sau các app.use() và các route
app.use((error, req, res) => {
  // Middleware xử lý lỗi tập trung.
  // Trong đoạn mã xử lý của các route, gọi next(error) sẽ chuyển sang middleware xử lý lỗi này
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});


