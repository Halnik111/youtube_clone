const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://young-headland-69216.herokuapp.com',
            changeOrigin: true,
        })
    );
};