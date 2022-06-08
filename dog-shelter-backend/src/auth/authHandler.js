const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const RefreshToken = require("../models/refreshToken.model")

//való életben itt model behúzás, ehelyett:
// const Users = [
//     {
//         username: 'admin',
//         password: 'admin_pw',
//         role: 'admin'
//     },
//     {
//         username: 'user',
//         password: 'user_pw',
//         role: 'user'
//     }
// ];

//való életben külön model rá, db-ben tárolás ehelyett:
//const refreshTokenList = []

//login működés:
module.exports.login = (req, res) => {    //nem kell next, mert bejelentkezéskor nem kell több middleware, amire továbbugranánk
    const {username, password} = req.body;      //object destructuring

    //password encode
    //bekérdezés db-be való életben:
    //const user = Users.find(u => u.username === username && u.password === password);

    const user = User.findOne({username: username, password: password})
        .then(user => {
            if (user) {
                const accessToken = jwt.sign({
                    username: user.username,
                    isAdmin: user.isAdmin
                }, process.env.ACCESS_TOKEN_SECRET_KEY, {
                    expiresIn: process.env.TOKEN_EXPIRY
                });

                const refreshToken = jwt.sign({
                    username: user.username,
                    isAdmin: user.isAdmin
                }, process.env.REFRESH_TOKEN_SECRET_KEY)
                //való életben db-be mentés ehelyett:
                //refreshTokenList.push(refreshToken)

                //     console.log(refreshToken)
                //     res.json({accessToken, refreshToken});
                // }

                const myRefreshToken = new RefreshToken({token: refreshToken})
                console.log(myRefreshToken)
                myRefreshToken.save()
                    .then(() => {
                        console.log("refreshtoken saved")
                        res.json({accessToken, refreshToken});
                    })
                    .catch(err => {
                        console.log(err)
                        res.send(err)
                    })
            }

            else {
                res.status(400);
                res.json("Incorrect username or password")
            }
        })


}

//refresh működés
module.exports.refresh = (req, res) => {
    const {refreshToken} = req.body

    if(!refreshToken) {
        res.sendStatus(401);
    }
    //bekérdezés db-be való életben:
    // if(!refreshTokenList.includes(refreshToken)) {
    //     res.sendStatus(403);
    // }

    RefreshToken.findOne({token: refreshToken})
        .then(refreshToken => {
            if(!refreshToken) {
                res.sendStatus(403);
            }
            jwt.verify(refreshToken.token, process.env.REFRESH_TOKEN_SECRET_KEY, (err, user) => {
                if (err) {
                    console.log("nem találta meg a db-ben")
                    res.sendStatus(403);
                }

                const accesToken = jwt.sign({
                    username: user.username,
                    isAdmin: user.isAdmin
                }, process.env.ACCESS_TOKEN_SECRET_KEY, {
                    expiresIn: process.env.TOKEN_EXPIRY
                });

                res.json({accesToken})
            })
        })


}

//logout működés
module.exports.logout = (req, res) => {
    const {refreshToken} = req.body;

    // if(!refreshTokenList.includes(refreshToken)) {
    //     res.sendStatus(403);
    // }
    // //db checkre cserélni
    // if(!refreshToken || !refreshTokenList.includes(refreshToken)) {
    //     res.sendStatus(403);    //vagy 401
    // }

    RefreshToken.findOne({token: refreshToken})
        .then(refreshToken => {
            if(!refreshToken) {
                res.sendStatus(403);
            }
            RefreshToken.findByIdAndRemove(refreshToken._id)
                .then(() => res.sendStatus(200))

        })

    // const tokenIndex = refreshTokenList.indexOf(refreshToken);
    // refreshTokenList.splice(tokenIndex, 1);
    // res.sendStatus(200)
}
