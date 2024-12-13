const Article = require('../models/article'); // Giả sử bạn có mô hình Article

// Lấy danh sách bài viết chờ duyệt
const getPendingArticles = async () => {
    try {
        return await Article.find({ status: 'pending' });
    } catch (error) {
        throw new Error('Không thể lấy bài viết chờ duyệt');
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

// Duyệt bài viết
const approveArticle = async (articleId) => {
    try {
        return await Article.findByIdAndUpdate(articleId, { status: 'approved' }, { new: true });
    } catch (error) {
        throw new Error('Không thể duyệt bài viết');
    }
};

// Từ chối bài viết
const rejectArticle = async (articleId) => {
    try {
        return await Article.findByIdAndUpdate(articleId, { status: 'rejected' }, { new: true });
    } catch (error) {
        throw new Error('Không thể từ chối bài viết');
    }
};

module.exports = {
    getPendingArticles,
    getArticleDetails,
    approveArticle,
    rejectArticle
};
