import jwt from 'jsonwebtoken'
const auth = (req, res, next) => {
    const token = req.header("x-auth-token")
    if(!token)
        res.status(401).json({
            error: 'Unauthorized - Token not found'
        })

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({
            error:'Invalid Token'
        })
    }


}

export default auth;