const express = require('express');
const router = express.Router();
const editorController = require('../controllers/editorController');

// Lấy danh sách bài viết chờ duyệt
router.get('/articles', editorController.getPendingArticles);

// Duyệt bài viết
router.put('/articles/:id/approve', editorController.approveArticle);

// Từ chối bài viết
router.put('/articles/:id/reject', editorController.rejectArticle);

module.exports = router;
