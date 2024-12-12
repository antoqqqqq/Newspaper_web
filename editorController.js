const Article = require('../models/Article');

// Lấy danh sách bài viết chờ duyệt
exports.getPendingArticles = async (req, res) => {
    try {
        const articles = await Article.findAll({ where: { status: 'Draft' } });
        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Duyệt bài viết
exports.approveArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findByPk(id);
        article.status = 'Approved';
        article.publish_date = new Date();
        await article.save();
        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Từ chối bài viết
exports.rejectArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;
        const article = await Article.findByPk(id);
        article.status = 'Rejected';
        article.rejection_reason = reason;
        await article.save();
        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
