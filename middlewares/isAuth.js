const jwt = require("jsonwebtoken")
module.exports = async function (req, res, next) {
    const authorizationCode = req.headers.authorization
    const token = authorizationCode.split(" ")[1]
    if (!authorizationCode || !authorizationCode.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "You are not authorized to access this page" });
    }
    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decodedToken
        next()
    }
    catch (ex) {
        console.log(ex)
        if (ex.name == "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token Expired" })
        }
        return res.status(400).json({ success: false, message: "Faulty token" })
    }
}
