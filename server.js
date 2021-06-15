const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    server.use(
        '/api/nhk',
        createProxyMiddleware({
            target: 'https://www.nhkso.or.jp/concert',
            pathRewrite: {'^/api/nhk' : ''},
            changeOrigin: true
        })
    );


    server.use(
        '/api/yomiuri',
        createProxyMiddleware({
            target: 'https://yomikyo.or.jp/concert',
            pathRewrite: {'^/api/yomiuri' : ''},
            changeOrigin: true
        })
    );

    server.use(
        '/api/tms',
        createProxyMiddleware({
            target: 'https://www.tmso.or.jp/j/concert',
            pathRewrite: {'^/api/tms' : ''},
            changeOrigin: true
        })
    );

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})