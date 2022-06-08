const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

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

//login működés:
module.exports = (req, res) => {    //nem kell next, mert bejelentkezéskor nem kell több middleware, amire továbbugranánk
    const {username, password} = req.body;      //object destructuring

    //password encode

    //órai kód tömbbel:
    //const user = Users.find(u => u.username === username && u.password === password);

    // if (user) {
    //     const accessToken = jwt.sign({
    //         username: user.username,
    //         role: user.role
    //     }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    //         expiresIn: process.env.TOKEN_EXPIRY
    //     })
    //
    //     res.json({accessToken});
    // } else {
    //     res.status(400);
    //     res.json("Incorrect username or password")
    // }

    //bekérdezés db-be való életben, jó így?:
    const user = User.findOne({username: username, password: password})
        .then(user => {
            if (user) {
                const accessToken = jwt.sign({
                    username: user.username,
                    isAdmin: user.isAdmin
                }, process.env.ACCESS_TOKEN_SECRET_KEY, {
                    expiresIn: process.env.TOKEN_EXPIRY
                })

                res.json({accessToken});
            } else {
                res.status(400);
                res.json("Incorrect username or password")
            }
        })


}
