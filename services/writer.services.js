const Article = require('../models/article'); // Giả sử bạn có mô hình Article

// Lấy danh sách bài viết của phóng viên
const getArticles = async (writerId) => {
    try {
        return await Article.find({ writerId });
    } catch (error) {
        throw new Error('Không thể lấy bài viết');
    }
};

// Tạo bài viết mới
const createArticle = async (articleData) => {
    try {
        const article = new Article(articleData);
        return await article.save();
    } catch (error) {
        throw new Error('Không thể tạo bài viết');
    }
};

// Cập nhật bài viết
const updateArticle = async (articleId, updatedData) => {
    try {
        return await Article.findByIdAndUpdate(articleId, updatedData, { new: true });
    } catch (error) {
        throw new Error('Không thể cập nhật bài viết');
    }
};

// Xóa bài viết
const deleteArticle = async (articleId) => {
    try {
        return await Article.findByIdAndDelete(articleId);
    } catch (error) {
        throw new Error('Không thể xóa bài viết');
    }
};

// Xem chi tiết bài viết
const getArticleDetails = async (articleId) => {
    try {
        return await Article.findById(articleId);
    } catch (error) {
        throw new Error('Không thể lấy chi tiết bài viết');
    }
};

module.exports = {
    getArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticleDetails
};
