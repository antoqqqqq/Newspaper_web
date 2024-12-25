// routes/guest.route.js
import express from 'express';
import data from '../data/data.js'; // Giả sử bạn đã có dữ liệu bài viết ở đây

const router = express.Router();

// Route cho trang chủ
router.get('/', (req, res) => {
    res.render('home', { articles: data.articles, categories: data.categories });
});

// Route cho một bài viết chi tiết
router.get('/article/:id', (req, res) => {
    const articleId = req.params.id;
    const article = data.articles.find(a => a.id === parseInt(articleId));

    if (!article) {
        return res.status(404).render('404', { layout: 'auth' });
    }

    res.render('article', { article });
});

// Route cho tìm kiếm bài viết
router.get('/search', (req, res) => {
    const query = req.query.q;
    const searchResults = data.articles.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.content.toLowerCase().includes(query.toLowerCase())
    );

    res.render('search', { searchResults, query });
});

export default router;
