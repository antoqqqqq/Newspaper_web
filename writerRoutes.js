const express = require('express');
const router = express.Router();
const writerController = require('../controllers/writerController');

// Tạo bài viết
router.post('/articles', writerController.createArticle);

// Lấy danh sách bài viết của phóng viên
router.get('/articles', writerController.getArticles);

// Cập nhật bài viết
router.put('/articles/:id', writerController.updateArticle);

module.exports = router;
