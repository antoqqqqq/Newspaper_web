const express = require('express');
const router = express.Router();
const editorService = require('../services/editorService');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');

// Lấy danh sách bài viết chờ duyệt
router.get('/articles', verifyToken, checkRole('editor'), async (req, res) => {
    try {
        const articles = await editorService.getPendingArticles();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Xem chi tiết bài viết
router.get('/articles/:id', verifyToken, checkRole('editor'), async (req, res) => {
    try {
        const article = await editorService.getArticleDetails(req.params.id);
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Duyệt bài viết
router.post('/articles/:id/approve', verifyToken, checkRole('editor'), async (req, res) => {
    try {
        const article = await editorService.approveArticle(req.params.id);
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Từ chối bài viết
router.post('/articles/:id/reject', verifyToken, checkRole('editor'), async (req, res) => {
    try {
        const article = await editorService.rejectArticle(req.params.id);
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
