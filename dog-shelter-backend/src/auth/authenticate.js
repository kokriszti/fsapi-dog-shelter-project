const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {          //itt már kell next, mert ez közbülső middleware
    const authHeader = req.headers.authorization;       //itt lesz a token

    if (authHeader) {
        //headersben ez lesz: Bearer magaatoken
        //ebből kiszedjük a tokent:
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {             //itt user az lesz, amit a login file-ban a payloadba tettem
            if(err) {
                return res.sendStatus(403);         //Forbidden, ha valaki megpróbálta kamu tokennel
            }

            req.user=user;      //beletesszük a requestbe, így megy tovább, pl role check következő middlewareben
            next()
        })
    } else {
        res.sendStatus(401)         //Unauthorized
    }
}
