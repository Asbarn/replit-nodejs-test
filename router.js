const createError  = require('http-errors');
const { request, Router } = require('express');
const MyRouter = Router();

MyRouter.get(
    '/posts',
    (req, res) => {
        const posts = [
          {
            text: 'First post',
            comments: ['nice post', 'test']
          },
          {
            text: '2nd post',
            comments: ['bad post', '123']
          },

        ];

        return res.json({
            status: 200,
            posts,
        });
    },
);

MyRouter.get(
    '/comments',
    (req, res) => {
        const comments = ['nice post', 'test', 'bad post', '123'];

        return res.json({
            status: 200,
            comments,
        });
    },
);

MyRouter.get(
    '/board',
    (req, res) => 
    res.json({
            status: 200,
            matrix: req.app.matrix,
        }),
);

MyRouter.post(
    '/board',
    (req, res) => {      
       const { xPosition, yPosition, color } = req.body;

        if (xPosition < 0 || yPosition < 0) {
            throw createError(400, 'No negative params');
        }
        req.app.matrix[xPosition][yPosition]=color;

        console.log(req.app.matrix)
        return res.json({
            status: 200,
            matrix: req.app.matrix,
        });
    },
);

module.exports = { MyRouter }
