import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
    // const authHeader = req?.headers['authorization']
    const authHeader = req?.headers?.authorization || req?.headers?.Authorization
    if (!authHeader?.startsWith("Bearer ")) return res?.sendStatus(401)
    const token = authHeader && authHeader.split(' ')[1];
    jwt?.verify(
        token,
        process?.env?.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res?.sendStatus(403) //Forbidden (invalid token)
            req.user = decoded?.userInfo?.username
            req.roles = decoded?.userInfo?.role
            next()
        }
    )
}

export default verifyJWT;
