const jwt = require('jsonwebtoken');

exports.checkLogin = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
        res.status(401).send({
            message : 'Unauthorized'
        });
    }
    else {
        try {
            await jwt.verify(token, 'test');
            next();
        } catch (e) {
            res.status(401).send({
                message: e.message
            });
        }
        next();
    }
   
}

exports.isLogin = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        next();
    }
    try {
        await jwt.verify(token, 'test');
        res.status(400).send({
            message: 'Bad request'
        });
    } catch (e) {
        next();
    }
}