const express = require('express');
const router = express.Router();
const writerService = require('../services/writerService');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');

// Lấy danh sách bài viết của phóng viên
router.get('/articles', verifyToken, checkRole('writer'), async (req, res) => {
    try {
        const articles = await writerService.getArticles(req.user.id); // Giả sử bạn lưu id của phóng viên trong token
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Tạo bài viết mới
router.post('/articles', verifyToken, checkRole('writer'), async (req, res) => {
    try {
        const article = await writerService.createArticle(req.body);
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Cập nhật bài viết
router.put('/articles/:id', verifyToken, checkRole('writer'), async (req, res) => {
    try {
        const article = await writerService.updateArticle(req.params.id, req.body);
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Xóa bài viết
router.delete('/articles/:id', verifyToken, checkRole('writer'), async (req, res) => {
    try {
        await writerService.deleteArticle(req.params.id);
        res.status(200).json({ message: 'Bài viết đã được xóa' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Xem chi tiết bài viết
router.get('/articles/:id', verifyToken, checkRole('writer'), async (req, res) => {
    try {
        const article = await writerService.getArticleDetails(req.params.id);
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
