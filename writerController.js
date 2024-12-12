const Article = require('../models/Article');

// Tạo bài viết
exports.createArticle = async (req, res) => {
    try {
        const { title, summary, content, category, tags } = req.body;
        const writer_id = req.user.id; // Lấy từ token
        const article = await Article.create({ title, summary, content, category, tags, writer_id });
        res.status(201).json(article);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy danh sách bài viết
exports.getArticles = async (req, res) => {
    try {
        const writer_id = req.user.id; // Lấy từ token
        const articles = await Article.findAll({ where: { writer_id } });
        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cập nhật bài viết
exports.updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, summary, content, tags } = req.body;
        const article = await Article.findByPk(id);

        if (article.status !== 'Rejected' && article.status !== 'Draft') {
            return res.status(403).json({ message: 'Cannot update this article' });
        }

        article.title = title || article.title;
        article.summary = summary || article.summary;
        article.content = content || article.content;
        article.tags = tags || article.tags;
        await article.save();

        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
